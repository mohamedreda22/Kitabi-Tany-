const Book = require('../models/Book');

 
const addBookReview = async (req, res) => {
    const { bookId } = req.params;  
    const { rating, reviewText } = req.body;

    try {
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
 
        book.reviews.push({
            reviewer: req.userId,  
            rating,
            reviewText,
            createdAt: new Date()
        });
 
        await book.save();

        res.status(201).json({ message: 'Review added successfully', reviews: book.reviews });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

 
const viewBookReviews = async (req, res) => {
    const { bookId } = req.params;

    try {
  
        const book = await Book.findById(bookId).populate('reviews.reviewer', 'username profilePicture');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ reviews: book.reviews });
    } catch (error) {
        console.error("Error viewing reviews:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addBookReview,
    viewBookReviews
};
