const cartService = require('../services/cartService');

const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCartByUserId(req.userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    const { bookId } = req.body;
    try {
        const cart = await cartService.addToCart(req.userId, bookId);
        res.status(201).json(cart);
    } catch (error) {
        res.status(error.message === 'Book not found' ? 404 : 400).json({ message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    const { bookId } = req.body;
    try {
        const cart = await cartService.removeFromCart(req.userId, bookId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.message === 'Cart not found' || error.message === 'Book not found in cart' ? 404 : 400).json({ message: error.message });
    }
};

const checkout = async (req, res) => {
    try {
        await cartService.clearCart(req.userId);
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    const { bookId, quantity } = req.body;
    try {
        const cart = await cartService.updateCartItem(req.userId, bookId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.message === 'Cart not found' || error.message === 'Book not found in cart' ? 404 : 400).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    checkout,
    updateCartItem,
};
