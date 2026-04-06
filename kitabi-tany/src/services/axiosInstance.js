import axios from "axios";
import Cookies from "js-cookie";

// Base API URL
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_URL || "http://localhost:5000";

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
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle common responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Redirecting to login.");
            Cookies.remove('token');
            Cookies.remove('userId');
            Cookies.remove('userRole');
            Cookies.remove('profilePic');
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
