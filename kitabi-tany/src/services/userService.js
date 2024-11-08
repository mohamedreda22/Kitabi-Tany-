import axios from 'axios';


const API_URL = 'http://localhost:5000/api/users';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, updatedData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        console.log("Sending login request:", userData); // Log the request data
        const response = await axios.post(`${API_URL}/login`, userData, {
            headers: {
                'Content-Type': 'application/json',  // Ensure correct content type
            },
        });
        return response.data;
    } catch (error) {
        console.error("Login Error:", error); // Log the error
        throw error.response ? error.response.data : error.message;
    }
};


