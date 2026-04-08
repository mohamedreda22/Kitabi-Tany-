const reviewService = require('../services/reviewService');

const addBookReview = async (req, res) => {
    const { bookId } = req.params;
    const { rating, reviewText } = req.body;

    try {
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }
        const book = await reviewService.addReview(bookId, req.userId, rating, reviewText);
        res.status(201).json({ message: 'Review added successfully', reviews: book.reviews });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(error.message === 'Book not found' ? 404 : 500).json({ message: error.message || 'Server error' });
    }
};

const viewBookReviews = async (req, res) => {
    const { bookId } = req.params;
    try {
        const reviews = await reviewService.getBookReviews(bookId);
        res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error viewing reviews:", error);
        res.status(error.message === 'Book not found' ? 404 : 500).json({ message: error.message || 'Server error' });
    }
};

module.exports = {
    addBookReview,
    viewBookReviews
};
