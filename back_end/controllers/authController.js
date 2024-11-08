const User = require('../models/User');
const authService = require('../services/authService')
const hashing = require('../middleware/hashing')

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
