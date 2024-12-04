const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const User = require('../models/User');
const { createNotification } = require('../controllers/notificationController');

// Place an Order and Notify Seller
const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ buyer: req.userId }).populate('items.book');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const totalPrice = cart.items.reduce((sum, item) => sum + item.book.price, 0);
        const sellerId = cart.items[0].book.seller;

        const order = new Order({
            buyer: req.userId,
            seller: sellerId,
            books: cart.items.map(item => ({ book: item.book._id })),
            totalAmount: cart.items.length,
            totalPrice,
            status: 'pending',
        });

        await order.save();

        // Clear the cart after placing the order
        cart.items = [];
        await cart.save();

        // Update each book's `sold` status to true
        for (let item of order.books) {
            await Book.findByIdAndUpdate(item.book, { sold: true });
        }

        const buyer = await User.findById(req.userId);
        const message = `New order from ${buyer.username}`;

        // Notify the seller
        await createNotification(sellerId, message);

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const order = await Order.findById(orderId)
    .populate('buyer', 'username')  // Populating the buyer's username
    .populate('books.book', 'title price');  // Populating each book's title and price

        // const orders = await Order.find().populate('buyer', 'username').populate('books.book', 'title');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getBuyerOrders = async (req, res) => {
    try {
        const order = await Order.findById(orderId)
    .populate('buyer', 'username')  // Populating the buyer's username
    .populate('books.book', 'title price');  // Populating each book's title and price

        // const orders = await Order.find({ buyer: req.userId }).populate('books.book');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving buyer orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSellerOrders = async (req, res) => {
    try {
        // Populate both the buyer information and full details of each book in the order
        const orders = await Order.find({ seller: req.userId })
            .populate('buyer', 'username profilePicture')  // Populate buyer's username and profile picture
            .populate({
                path: 'books.book',
                select: 'title author price condition coverPhoto',  // Select fields to include in book details
            });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this seller' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error retrieving seller orders:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId).populate('buyer', 'username').populate('books.book');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("Error retrieving order by ID:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Confirm Order and Notify Buyer
const confirmOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId).populate('buyer', 'username');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'completed';
        await order.save();

        // Notify
        const message = 'Your order has been confirmed';
        await createNotification(order.buyer._id, message);

        res.status(200).json({ message: 'Order confirmed successfully', order });
    } catch (error) {
        console.error("Error confirming order:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Cancel Order and Notify Buyer
const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId).populate('buyer', 'username');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'cancelled';
        await order.save();

        // Notify
        const message = 'Your order has been cancelled';
        await createNotification(order.buyer._id, message);

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Return Order and Notify Buyer
const returnOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId).populate('buyer', 'username');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'returned';
        await order.save();

        // Notify
        const message = 'Your order has been returned';
        await createNotification(order.buyer._id, message);

        res.status(200).json({ message: 'Order returned successfully', order });
    } catch (error) {
        console.error("Error returning order:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Order Status and Notify Buyer
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'completed', 'shipped', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await Order.findById(orderId).populate('buyer', 'username');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        // Notify
        const message = `Your order status has been updated to: ${status}`;
        await createNotification(order.buyer._id, message);

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: 'Server error' });
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
