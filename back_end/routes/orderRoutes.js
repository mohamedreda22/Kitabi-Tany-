const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/isAuth');

// Buyer routes
router.post('/placeOrder', isAuth, orderController.placeOrder);
router.get('/myOrders', isAuth, orderController.getBuyerOrders);

// Seller routes
router.get('/sellerOrders', isAuth, orderController.getSellerOrders);
router.put('/:orderId', isAuth, orderController.updateOrderStatus);

module.exports = router;
