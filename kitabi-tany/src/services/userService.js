import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';

// Centralized error handling function
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error("API Error:", message);
    throw new Error(message);
};

// Register User API
export const registerUser = async (registrationData) => {
    try {
        const formData = new FormData();
        for (const key in registrationData) {
            formData.append(key, registrationData[key]);
        }
        const response = await axiosInstance.post('/users/register', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get User by ID
export const getUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Update User
export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axiosInstance.put(`/users/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/users/login', userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Fetch all users
export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// logout clear all the cookies and redirect to route '/'
export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('userRole');
    Cookies.remove('profilePic');
    window.location.href = '/';
};
