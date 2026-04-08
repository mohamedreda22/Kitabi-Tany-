const Book = require('../models/Book');

const addReview = async (bookId, userId, rating, reviewText) => {
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');

    book.reviews.push({
        reviewer: userId,
        rating,
        reviewText,
        createdAt: new Date()
    });

    return await book.save();
};

const getBookReviews = async (bookId) => {
    const book = await Book.findById(bookId).populate('reviews.reviewer', 'username profilePicture');
    if (!book) throw new Error('Book not found');
    return book.reviews;
};

module.exports = {
    addReview,
    getBookReviews
};
