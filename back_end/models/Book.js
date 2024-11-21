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
        enum: ['جديد', 'مثل الجديد', 'جيد', 'مقبول'],
        required: true
    },
    coverPhoto: String,
    category: {
        type: String,
        enum: [
            "روايات", 
            "علمية", 
            "تاريخية", 
            "سيرة ذاتية", 
            "رومانسية", 
            "غموض", 
            "خيال", 
            "أطفال", 
            "غير روائية", 
            "مغامرات", 
            "علم النفس"
          ],
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [{
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        reviewText: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    sold: { type: Boolean, default: false },  // New field to indicate if the book is sold
    createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema, 'Book');
module.exports = Book;
