const Cart = require('../models/Cart');
const Book = require('../models/Book');
 

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

 
const addToCart = async (req, res) => {
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

module.exports = {
    getCart,
    addToCart,
    removeFromCart
};
