const Book = require('../models/Book');

const createBook = async (bookData) => {
    const newBook = new Book(bookData);
    return await newBook.save();
};

const getAllBooks = async () => {
    return await Book.find({ sold: false });
};

const getBookById = async (id) => {
    return await Book.findById(id);
};

const updateBook = async (id, updateData) => {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBook = async (id) => {
    return await Book.findByIdAndDelete(id);
};

const filterBooks = async (filters) => {
    const { category, condition, minPrice, maxPrice } = filters;
    const filter = {};

    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = minPrice;
        if (maxPrice) filter.price.$lte = maxPrice;
    }

    return await Book.find(filter);
};

const searchBooks = async (query) => {
    const searchCriteria = {
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } }
        ]
    };
    return await Book.find(searchCriteria);
};

const getRecentBooks = async (limit = 5) => {
    return await Book.find({}).sort({ createdAt: -1 }).limit(limit);
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
