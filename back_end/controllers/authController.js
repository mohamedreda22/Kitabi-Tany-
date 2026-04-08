const userService = require('../services/userService');
const hashing = require('../middleware/hashing');
const sendEmail = require("../util/sendEmail");
const emailBody = require("../util/emailBody");

exports.register = async (req, res) => {
    const { username, email, password, role, profilePicture } = req.body;
    try {
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
        }

        const hashedPassword = await hashing.hashPassword(password);
        const newUser = await userService.createUser({
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture,
        });

        res.status(201).json({ message: 'تم التسجيل بنجاح', user: newUser });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'فشل في التسجيل' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user || !(await userService.comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        const token = userService.generateToken({ id: user._id }, process.env.SECRET_KEY);
        const refreshToken = userService.generateToken({ id: user._id }, process.env.REFRESH_SECRET_KEY, '1y');

        await userService.updateUserById(user._id, { refreshToken });

        res.status(200).json({
            token,
            refreshToken,
            userRole: user.role,
            userId: user._id,
            user: { username: user.username, profilePicture: user.profilePicture, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "عذراً، لم يتم العثور على حساب بهذا البريد الإلكتروني." });
        }

        const token = userService.generateToken({ userId: user._id }, process.env.PASSWORD_RESET_SECRET_KEY, '5m');
        const emailOptions = {
            mailTo: user.email,
            subject: "إعادة تعيين كلمة السر",
            emailBody: emailBody(token, user.username)
        };

        await sendEmail(emailOptions);
        res.status(200).json({ message: "تم إرسال بريد إلكتروني يحتوي على تعليمات إعادة تعيين كلمة المرور." });
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء إرسال البريد الإلكتروني." });
    }
};

exports.resetPassword = async (req, res) => {
    const { password, passwordConfirmation, token } = req.body;

    if (password !== passwordConfirmation) {
        return res.status(400).json({ message: "كلمات المرور غير متطابقة" });
    }

    try {
        const decoded = userService.verifyToken(token, process.env.PASSWORD_RESET_SECRET_KEY);
        const user = await userService.findUserById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
        }

        const tokenCreatedAt = new Date(decoded.iat * 1000);
        if (user.password_updatedAt && tokenCreatedAt < user.password_updatedAt) {
            return res.status(400).json({ message: "انتهت صلاحية هذا الرابط" });
        }

        const hashedPassword = await hashing.hashPassword(password);
        await userService.updateUserById(decoded.userId, { password: hashedPassword, password_updatedAt: Date.now() });

        return res.status(200).json({ message: "تم إعادة تعيين كلمة المرور بنجاح" });
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ message: "رابط غير صالح" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "انتهت صلاحية الرابط" });
        } else {
            return res.status(500).json({ message: "حدث خطأ غير متوقع" });
        }
    }
};
