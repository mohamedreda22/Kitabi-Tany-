const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const isAuth = require('../middleware/isAuth');

// Protected routes
router.get('/', isAuth, cartController.getCart);
router.post('/add', isAuth, cartController.addToCart);
router.post('/remove', isAuth, cartController.removeFromCart);
router.post('/checkout', isAuth, cartController.checkout);
router.put('/update', isAuth, cartController.updateCartItem);


module.exports = router;
