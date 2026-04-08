const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const findUserById = async (id) => {
    return await User.findById(id);
};

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const updateUserById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const findAllUsers = async () => {
    return await User.find();
};

const comparePassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword);
};

const generateToken = (payload, secret, expiresIn = '1d') => {
    return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    updateUserById,
    findAllUsers,
    comparePassword,
    generateToken,
    verifyToken,
};
