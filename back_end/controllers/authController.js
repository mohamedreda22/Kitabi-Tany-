const User = require('../models/User');
const authService = require('../services/authService')
const hashing = require('../middleware/hashing')
const sendEmail = require("../util/sendEmail")
const emailBody = require("../util/emailBody")
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await hashing.hashPassword(password);
        const newUser = new User({ username, email, password: hashedPassword, role });

        await newUser.save();
        const token = await authService.generateToken({ userId: newUser._id });
        const refreshToken = await authService.generateRefreshToken({ userId: newUser._id });
        res.status(201).json({ token, refreshToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await authService.comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = await authService.generateToken({ userId: user._id });
        const refreshToken = await authService.generateRefreshToken({ userId: user._id });
        res.status(200).json({ token, refreshToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.status(404).json({ message: "Sorry, no account was found with this email address." });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.PASSWORD_RESET_SECRET_KEY, { expiresIn: "5m" });

    const emailOptions = {
        mailTo: user.email,
        subject: "أعادة تعين كبمة السر",
        emailBody: emailBody(token, user.username)
    };

    try {
        await sendEmail(emailOptions);
        res.status(200).json({ message: "An email with password reset instructions has been sent. Please check your email." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while sending the email. Please try again later." });
    }
};


exports.resetPassword = async (req, res) => {
    const { password, passwordConfirmation, token } = req.body;

    if (password !== passwordConfirmation) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const decoded = await jwt.verify(token, process.env.PASSWORD_RESET_SECRET_KEY);
        const user = await User.findById(decoded.userId).exec();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const tokenCreatedAt = new Date(decoded.iat * 1000);
        const isTokenUsed = user.password_updatedAt && tokenCreatedAt < user.password_updatedAt;

        if (isTokenUsed) {
            return res.status(400).json({ message: "This token has already been used" });
        }

        const hashedPassword = await hashing.hashPassword(password);

        await User.updateOne(
            { _id: decoded.userId },
            { password: hashedPassword, password_updatedAt: Date.now() }
        );

        return res.status(200).json({ message: "Password successfully reset" });

    } catch (error) {

        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Token has expired" });
        } else {
            return res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};

