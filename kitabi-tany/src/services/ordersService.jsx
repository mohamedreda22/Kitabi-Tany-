import axiosInstance from './axiosInstance';

const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error("API Error:", message);
    throw new Error(message);
};

export const getOrders = async () => {
    try {
        const response = await axiosInstance.get('/order/getOrders');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const placeOrder = async () => {
    try {
        const response = await axiosInstance.post('/order/placeOrder');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getMyOrders = async () => {
    try {
        const response = await axiosInstance.get('/order/myOrders');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/order/order/${orderId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const cancelOrder = async (orderId) => {
    try {
        const response = await axiosInstance.put(`/order/cancelOrder/${orderId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getSellerOrders = async () => {
    try {
        const response = await axiosInstance.get('/order/sellerOrders');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axiosInstance.put(`/order/${orderId}`, { status });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
