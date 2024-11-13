const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/isAuth');
 
router.post('/placeOrder', isAuth, orderController.placeOrder);

router.get('/myOrders', isAuth, orderController.getUserOrders);

router.put('/:orderId', isAuth, orderController.updateOrderStatus);
module.exports = router;
