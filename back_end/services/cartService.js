const Cart = require('../models/Cart');
const Book = require('../models/Book');

const getCartByUserId = async (userId) => {
    let cart = await Cart.findOne({ buyer: userId }).populate('items.book');
    if (!cart) {
        cart = new Cart({
            buyer: userId,
            items: [],
            totalPrice: 0
        });
        await cart.save();
    }
    return cart;
};

const addToCart = async (userId, bookId) => {
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');

    let cart = await Cart.findOne({ buyer: userId });
    if (!cart) {
        cart = new Cart({
            buyer: userId,
            items: [],
            totalPrice: 0,
        });
    }

    const bookInCart = cart.items.find((item) => item.book.toString() === bookId);
    if (bookInCart) throw new Error('Book already in cart');

    cart.items.push({ book: bookId });
    cart.totalPrice += book.price;

    return await cart.save();
};

const removeFromCart = async (userId, bookId) => {
    const cart = await Cart.findOne({ buyer: userId });
    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
    if (itemIndex === -1) throw new Error('Book not found in cart');

    const removedBook = await Book.findById(bookId);
    cart.items.splice(itemIndex, 1);
    cart.totalPrice -= (removedBook?.price || 0);

    return await cart.save();
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ buyer: userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = [];
    cart.totalPrice = 0;
    return await cart.save();
};

const updateCartItem = async (userId, bookId, quantity) => {
    const cart = await Cart.findOne({ buyer: userId });
    if (!cart) throw new Error('Cart not found');

    const item = cart.items.find(item => item.book.toString() === bookId);
    if (!item) throw new Error('Book not found in cart');

    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');

    cart.totalPrice += book.price * (quantity - item.quantity);
    item.quantity = quantity;

    return await cart.save();
};

module.exports = {
    getCartByUserId,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem,
};
