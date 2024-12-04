import axios from "axios";
import Cookies from "js-cookie"; // For token management

// Base API URL
const BASE_URL = "http://localhost:5000/api";

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include token in every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token"); // Get the token from cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
        }
        return config;
    },
    (error) => Promise.reject(error) // Handle request errors
);

// Add a response interceptor to handle common responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            console.error("Unauthorized! Redirecting to login.");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
