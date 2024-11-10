const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ['new', 'like new', 'good', 'acceptable'],
        required: true
    },
    coverPhoto: String,
    category: {
        type: String,
        enum: ['fiction', 'science', 'history', 'biography', 'romance', 'mystery', 'fantasy', 'children', 'non-fiction', 'adventure', 'psychology'],
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema, 'Book');
module.exports = Book;