const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

 
const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ buyer: req.userId }).populate('items.book');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const totalPrice = cart.items.reduce((sum, item) => sum + item.book.price, 0);
 
        const order = new Order({
            buyer: req.userId,
            books: cart.items.map(item => ({ book: item.book._id })),
            totalAmount: cart.items.length,
            totalPrice,
            status: 'pending',
        });
 
        await order.save();
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

 
const getUserOrders = async (req, res) => {
    try {
    
        const orders = await Order.find({ buyer: req.userId }).populate('books.book');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
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
 
        const order = await Order.findById(orderId);
 
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

 
        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    placeOrder,
    getUserOrders,
    updateOrderStatus
};
