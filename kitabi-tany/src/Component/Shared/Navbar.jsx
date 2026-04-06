import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '../../services/userService';
import { IMAGE_BASE_URL } from '../../services/axiosInstance';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const userRole = Cookies.get('userRole');
    const profilePic = Cookies.get('profilePic');
    const token = Cookies.get('token');

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to={token ? "/home" : "/"}>
                    <img src="/My_Logo.jpg" alt="Kitabi Tany Logo" className="logo-img" />
                    <span className="logo-text">كتابي تاني</span>
                </Link>
            </div>
            <div className="navbar-links">
                {token ? (
                    <>
                        <Link to="/home">الرئيسية</Link>
                        {userRole === 'seller' && (
                            <Link to="/add-book">إضافة كتاب</Link>
                        )}
                        {userRole === 'admin' && (
                            <Link to="/admin-dashboard">لوحة التحكم</Link>
                        )}
                        <Link to="/profile" className="profile-link">
                            <img
                                src={profilePic ? `${IMAGE_BASE_URL}/profile_pictures/${profilePic}` : "/My_Logo.jpg"}
                                alt="Profile"
                                className="nav-profile-pic"
                            />
                        </Link>
                        <button onClick={handleLogout} className="logout-btn">تسجيل الخروج</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">تسجيل الدخول</Link>
                        <Link to="/register" className="register-btn">إنشاء حساب</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
