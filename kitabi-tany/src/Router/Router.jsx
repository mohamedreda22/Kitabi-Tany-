import { BrowserRouter as AppRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import HomePage from "../Pages/Home/HomePage.js";
import AddBook from "../Pages/AddBook.js";
import PrivateRoute from "./PrivateRoute.js";
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const Home = lazy(() => import("../Pages/Home/Home"));
const Login = lazy(() => import("../Pages/Login.js"));
const Register = lazy(() => import("../Pages/Register.js"));
const Profile = lazy(() => import("../Pages/Profile.js"));
const BookDetail = lazy(() => import("../Pages/BookDetail")); // Lazy load the BookDetail component
const AdminDashboard = lazy(() => import("../Pages/AdminDashboard.js"));
const Router = () => {
    const AdminRoute = ({ children }) => {
        const userRole = Cookies.get('userRole');
        return userRole === 'admin' ? children : <Navigate to="/home" />;
    };
    return (
        <AppRouter>
            <Suspense fallback={<div className="spinner"></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/book/:bookId" element={<BookDetail />} />
                </Routes>
            </Suspense>
        </AppRouter>
    );
}

export default Router;
