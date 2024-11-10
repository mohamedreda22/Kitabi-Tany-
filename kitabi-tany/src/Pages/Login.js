import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import "../assets/css/Auth.css"
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            setSuccess(data.message);
            setError(null);
            localStorage.setItem('token', data.token); // Store token in localStorage
        } catch (err) {
            setError(err.message || 'فشل تسجيل الدخول');
            setSuccess(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-header">تسجيل الدخول</h2>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                required
            />
            <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="كلمة المرور"
                required
            />
            <button type="submit" className="auth-btn">تسجيل الدخول</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <Link to="/register" className='routerLink'>إنشاء حساب</Link>
        </form>
    );
};

export default Login;
