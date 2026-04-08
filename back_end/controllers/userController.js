const userService = require('../services/userService');
const { hashPassword } = require('../middleware/hashing');
const mongoose = require('mongoose');

const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await hashPassword(password);
        const profilePicFilename = req.file ? req.file.filename : 'default-test-image.jpg';

        await userService.createUser({
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture: profilePicFilename,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: 'Invalid User ID' });
    try {
        const user = await userService.findUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: 'Invalid User ID' });
    try {
        const updateData = {
            username: req.body.username,
            role: req.body.role,
        };
        if (req.body.password) updateData.password = await hashPassword(req.body.password);
        if (req.file) updateData.profilePicture = req.file.filename;

        const updatedUser = await userService.updateUserById(userId, updateData);
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: 'Invalid User ID' });
    try {
        const user = await userService.findUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.deleteOne();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    register,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    logout,
};
