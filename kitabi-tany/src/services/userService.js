import axios from 'axios';

// Set up axios instance with default base URL
const API_URL = 'http://localhost:5000/api/users'; // You can replace this with a config-based URL
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}; */
// Register User API
export const registerUser = async (userData) => {
    // const response = await axios.post('http://localhost:5000/api/register', userData);
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    }
    catch (error) {
        handleError(error);
    }
}    




export const getUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(`/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axiosInstance.put(`/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginUser = async (userData) => {
    try {
        console.log("Sending login request:", userData); // Log the request data
        const response = await axiosInstance.post('/login', userData);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error); // Log the error
        handleError(error);
    }
};
//getUserProfile
export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/profile');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUserProfile = async (newData) => {

    try {
        const response = await axiosInstance.put('/profile', newData);
        return response.data;
    }
    catch (error) {
        handleError(error);
    }
}

// Centralized error handling function
const handleError = (error) => {
    const message = error.response ? error.response.data : error.message || 'An error occurred';
    throw new Error(message);
};
