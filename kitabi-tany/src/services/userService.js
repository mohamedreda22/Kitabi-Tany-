import axios from 'axios';
// import axiosInstance from './axiosInstance';
// Set up axios instance with default base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users';
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include token in the headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Replace with your token storage method
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Centralized error handling function
const handleError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error("API Error:", message); // Log error details
    throw new Error(message);
};

// Register User API
export const registerUser = async (registrationData) => {
    try {
        const formData = new FormData();
        for (const key in registrationData) {
            formData.append(key, registrationData[key]);
        }
        const response = await axiosInstance.post('/register', formData, {
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
        const response = await axiosInstance.get(`/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Update User
export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axiosInstance.put(`/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Delete User
/* export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}; */

// Login User
export const loginUser = async (userData) => {
    try {
        console.log("Sending login request:", userData);
        const response = await axiosInstance.post('/login', userData);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error);
        handleError(error);
    }
};
/* export const loginUser = async (credentials) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
    }

    return await response.json(); // Expect userRole in the response
}; */


// Get User Profile
export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/profile');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Update User Profile
export const updateUserProfile = async (newData) => {
    try {
        const response = await axiosInstance.put('/profile', newData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Fetch all users
export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/'); // Replace with your endpoint
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/${userId}`); // Replace with your endpoint
        return response.data;
    } catch (error) {
        throw error;
    }
};

// logout clear all the cookies and redirect to route '/'
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.href = '/';
};


