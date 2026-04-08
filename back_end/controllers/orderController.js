const orderService = require('../services/orderService');

const placeOrder = async (req, res) => {
    try {
        const order = await orderService.placeOrder(req.userId);
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(400).json({ message: error.message || 'Server error' });
    }
};

const getBuyerOrders = async (req, res) => {
    try {
        const orders = await orderService.getBuyerOrders(req.userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving buyer orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSellerOrders = async (req, res) => {
    try {
        const orders = await orderService.getSellerOrders(req.userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving seller orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error retrieving order by ID:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'completed', 'shipped', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await orderService.updateOrderStatus(orderId, status);
        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(400).json({ message: error.message || 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const confirmOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderService.updateOrderStatus(orderId, 'completed');
        res.status(200).json({ message: 'Order confirmed successfully', order });
    } catch (error) {
        console.error("Error confirming order:", error);
        res.status(400).json({ message: error.message || 'Server error' });
    }
};

const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderService.updateOrderStatus(orderId, 'cancelled');
        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(400).json({ message: error.message || 'Server error' });
    }
};

const returnOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderService.updateOrderStatus(orderId, 'returned');
        res.status(200).json({ message: 'Order returned successfully', order });
    } catch (error) {
        console.error("Error returning order:", error);
        res.status(400).json({ message: error.message || 'Server error' });
    }
};

module.exports = {
    placeOrder,
    getBuyerOrders,
    getSellerOrders,
    updateOrderStatus,
    getOrders,
    getOrderById,
    confirmOrder,
    cancelOrder,
    returnOrder,
};
