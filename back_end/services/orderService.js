const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const User = require('../models/User');
const { createNotification } = require('./notificationService');

const placeOrder = async (userId) => {
    const cart = await Cart.findOne({ buyer: userId }).populate('items.book');

    if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
    }

    const totalPrice = cart.items.reduce((sum, item) => sum + item.book.price, 0);
    const sellerId = cart.items[0].book.seller;

    const order = new Order({
        buyer: userId,
        seller: sellerId,
        books: cart.items.map(item => ({ book: item.book._id })),
        totalAmount: cart.items.length,
        totalPrice,
        status: 'pending',
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    // Update book status
    for (let item of order.books) {
        await Book.findByIdAndUpdate(item.book, { sold: true });
    }

    const buyer = await User.findById(userId);
    const message = `New order from ${buyer.username}`;
    await createNotification(sellerId, message);

    return order;
};

const getBuyerOrders = async (userId) => {
    return await Order.find({ buyer: userId }).populate('books.book');
};

const getSellerOrders = async (userId) => {
    return await Order.find({ seller: userId })
        .populate('buyer', 'username profilePicture')
        .populate({
            path: 'books.book',
            select: 'title author price condition coverPhoto',
        });
};

const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId).populate('buyer', 'username');
    if (!order) throw new Error('Order not found');

    order.status = status;
    await order.save();

    const message = `Your order status has been updated to: ${status}`;
    await createNotification(order.buyer._id, message);

    return order;
};

const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate('buyer', 'username').populate('books.book');
};

const getAllOrders = async () => {
    return await Order.find()
        .populate('buyer', 'username')
        .populate('books.book', 'title price');
};

module.exports = {
    placeOrder,
    getBuyerOrders,
    getSellerOrders,
    updateOrderStatus,
    getOrderById,
    getAllOrders,
};
