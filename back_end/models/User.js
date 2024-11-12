const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
    },
    password_updatedAt: Date,
    profilePicture: String,
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
    }],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema, 'User');
module.exports = User;