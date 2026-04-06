import axiosInstance from './axiosInstance';

const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error("API Error:", message);
    throw new Error(message);
};

export const getCart = async () => {
    try {
        const response = await axiosInstance.get('/cart');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addToCart = async (bookId) => {
    try {
        const response = await axiosInstance.post('/cart/add', { bookId });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const removeFromCart = async (bookId) => {
    try {
        const response = await axiosInstance.post('/cart/remove', { bookId });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const checkout = async () => {
    try {
        const response = await axiosInstance.post('/cart/checkout');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateCartItem = async (bookId, quantity) => {
    try {
        const response = await axiosInstance.put('/cart/update', { bookId, quantity });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
