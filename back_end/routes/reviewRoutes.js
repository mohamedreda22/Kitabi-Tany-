const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const isAuth = require('../middleware/isAuth');

router.post('/:bookId', isAuth, reviewController.addBookReview);

router.get('/:bookId', reviewController.viewBookReviews);

module.exports = router;
