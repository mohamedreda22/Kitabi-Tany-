import { BrowserRouter as AppRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Cookies from 'js-cookie';

import PrivateRoute from "./PrivateRoute";
import HomePage from "../Pages/Home/HomePage";
import Home from "../Pages/Home/Home";
import Layout from "../Component/Shared/Layout";

const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const Profile = lazy(() => import("../Pages/Profile"));
const BookDetail = lazy(() => import("../Pages/BookDetail"));
const AdminDashboard = lazy(() => import("../Pages/AdminDashboard"));
const Orders = lazy(() => import("../Pages/Orders"));
const AddBook = lazy(() => import("../Pages/AddBook"));

const Router = () => {
    const AdminRoute = ({ children }) => {
        const userRole = Cookies.get('userRole');
        return userRole === 'admin' ? children : <Navigate to="/home" />;
    };

    return (
        <AppRouter>
            <Suspense fallback={<div className="spinner"></div>}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                        <Route path="/orders" element={<AdminRoute><Orders/></AdminRoute>} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/book/:bookId" element={<BookDetail />} />
                    </Routes>
                </Layout>
            </Suspense>
        </AppRouter>
    );
}

export default Router;
