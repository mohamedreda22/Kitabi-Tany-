const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/isAuth');

// Buyer routes
router.post('/placeOrder', isAuth, orderController.placeOrder);
router.get('/myOrders', isAuth, orderController.getBuyerOrders);
router.get('/order/:orderId', isAuth, orderController.getOrderById);
router.put('/cancelOrder/:orderId', isAuth, orderController.cancelOrder);
router.put('/returnOrder/:orderId', isAuth, orderController.returnOrder);
router.put('/confirmOrder/:orderId', isAuth, orderController.confirmOrder);
router.get('/getOrders', isAuth, orderController.getOrders);

// Seller routes
router.get('/sellerOrders', isAuth, orderController.getSellerOrders);
router.put('/:orderId', isAuth, orderController.updateOrderStatus);

module.exports = router;
