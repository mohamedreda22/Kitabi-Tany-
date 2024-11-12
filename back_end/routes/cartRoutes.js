const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const isAuth = require('../middleware/isAuth');

// Protected routes
router.get('/', isAuth, cartController.getCart);
router.post('/add', isAuth, cartController.addToCart);
router.post('/remove', isAuth, cartController.removeFromCart);

module.exports = router;
