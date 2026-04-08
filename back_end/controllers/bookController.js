const bookService = require('../services/bookService');

const createBook = async (req, res) => {
    const { title, author, price, condition, category } = req.body;

    if (!title || !author || price === undefined || !condition || !category) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Cover photo is required.' });
    }

    try {
        const bookData = {
            ...req.body,
            seller: req.userId,
            coverPhoto: req.file.filename
        };
        const savedBook = await bookService.createBook(bookData);
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBook = async (req, res) => {
    const { title, author, price, condition, category } = req.body;

    if (!(title || author || price !== undefined || condition || category)) {
        return res.status(400).json({ message: 'At least one field must be provided for an update.' });
    }

    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const deletedBook = await bookService.deleteBook(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const filterBooks = async (req, res) => {
    try {
        const books = await bookService.filterBooks(req.query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchBooks = async (req, res) => {
    try {
        const books = await bookService.searchBooks(req.query.query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecentBooks = async (req, res) => {
    try {
        const books = await bookService.getRecentBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    filterBooks,
    searchBooks,
    getRecentBooks,
};
