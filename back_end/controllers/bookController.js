const Book = require('../models/Book');


const createBook = async (req, res) => {
    const { title, author, price, condition, category } = req.body;

    if (!title || !author || price === undefined || !condition || !category) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }
    let coverPhoto = '';
    if (req.file) {
        coverPhoto = req.file.filename;
    } else {
        return res.status(400).json({ message: 'Cover photo is required.' });
    }
    try {
        const newBook = new Book({
            ...req.body,
            seller: req.userId,  // Automatically set from the token
            coverPhoto: coverPhoto
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
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
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: 'Book not found' });
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//filter by category or condition or price(min-max) or all
const filterBooks = async (req, res) => {
    const { category, condition, minPrice, maxPrice } = req.query;

    try {

        const filter = {};

        if (category) {
            filter.category = category;
        }
        if (condition) {
            filter.condition = condition;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = minPrice;
            }
            if (maxPrice) {
                filter.price.$lte = maxPrice;
            }
        }
        const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//search by title or author
const searchBooks = async (req, res) => {
    const { query } = req.query;

    try {

        const searchCriteria = {
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        };

        const books = await Book.find(searchCriteria);
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
};
