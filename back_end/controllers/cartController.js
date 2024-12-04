const Cart = require('../models/Cart');
const Book = require('../models/Book');
const mongoose = require('mongoose');

 

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ buyer: req.userId }).populate('items.book');
        if (!cart) {
            cart = new Cart({
                buyer: req.userId,
                items: [],
                totalPrice: 0
            });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 
/* const addToCart = async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        let cart = await Cart.findOne({ buyer: req.userId });
        if (!cart) {
            cart = new Cart({
                buyer: req.userId,
                items: [],
                totalPrice: 0
            });
        }
        const bookInCart = cart.items.find(item => item.book.toString() === bookId);
        if (bookInCart) {
            return res.status(400).json({ message: 'Book already in cart' });
        }
        cart.items.push({ book: bookId });
        cart.totalPrice += book.price;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; */
/* const addToCart = async (req, res) => {
    const { bookId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        let cart = await Cart.findOne({ buyer: req.userId });
        if (!cart) {
            cart = new Cart({
                buyer: req.userId,
                items: [],
                totalPrice: 0,
            });
        }

        const bookInCart = cart.items.find((item) => item.book.toString() === bookId);
        if (bookInCart) {
            return res.status(400).json({ message: 'Book already in cart' });
        }

        cart.items.push({ book: bookId, quantity: 1 });
        cart.totalPrice += book.price;

        await cart.save();
        res.status(201).json(cart); // Resource Created
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book to cart', error: error.message });
    }
}; */
const addToCart = async (req, res) => {
    const { bookId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid Book ID' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        let cart = await Cart.findOne({ buyer: req.userId });
        if (!cart) {
            cart = new Cart({
                buyer: req.userId,
                items: [],
                totalPrice: 0,
            });
        }

        const bookInCart = cart.items.find((item) => item.book.toString() === bookId);
        if (bookInCart) {
            return res.status(400).json({ message: 'Book already in cart' });
        }

        cart.items.push({ book: bookId });
        cart.totalPrice += book.price;

        await cart.save();
        res.status(201).json(cart); // Resource Created
    } catch (error) {
        console.error("Error in addToCart:", error);  // Log the error
        res.status(500).json({ message: 'Failed to add book to cart', error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    const { bookId } = req.body;

    try {
        const cart = await Cart.findOne({ buyer: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Book not found in cart' });
        }
 
        const removedBook = await Book.findById(bookId);
        cart.items.splice(itemIndex, 1);
        cart.totalPrice -= removedBook.price;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkout = async (req, res) => {
    try {
        const cart = await Cart.findOne({ buyer: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    const { bookId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ buyer: req.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.book.toString() === bookId);
        if (!item) {
            return res.status(404).json({ message: 'Book not found in cart' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        cart.totalPrice += book.price * (quantity - item.quantity);
        item.quantity = quantity;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    checkout,
    updateCartItem
};
