import axiosInstance from './axiosInstance';

const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error("API Error:", message);
    throw new Error(message);
};

export const getRecentBooks = async () => {
    try {
        const response = await axiosInstance.get('/books/recent');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getBooksBySeller = async () => {
    try {
        const userId = Cookies.get("userId");
        const response = await getAllBooks();
        return response.filter(book => book.seller === userId || (book.seller?._id === userId));
    } catch (error) {
        handleError(error);
    }
};

export const getAllBooks = async () => {
    try {
        const response = await axiosInstance.get('/books');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getBookById = async (id) => {
    try {
        const response = await axiosInstance.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createBook = async (bookData) => {
    try {
        const formData = new FormData();
        for (const key in bookData) {
            formData.append(key, bookData[key]);
        }
        const response = await axiosInstance.post('/books', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await axiosInstance.put(`/books/${id}`, bookData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axiosInstance.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const searchBooks = async (query) => {
    try {
        const response = await axiosInstance.get(`/books/search?query=${query}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
