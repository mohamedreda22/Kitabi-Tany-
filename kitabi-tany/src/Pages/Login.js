import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import Swal from 'sweetalert2';
import "../assets/css/Auth.css";
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            localStorage.setItem('token', data.token);

            // Success alert
            Swal.fire({
                icon: 'success',
                title: 'تم تسجيل الدخول بنجاح',
                text: data.message,
                confirmButtonColor: '#4CAF50',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (err) {
            // Extract error message properly
            const errorMessage = err.response?.data?.message || 'حدث خطأ أثناء محاولة تسجيل الدخول';
            
            // Error alert
            Swal.fire({
                icon: 'error',
                title: 'فشل تسجيل الدخول',
                text: errorMessage,
                confirmButtonColor: '#d33',
            });
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
            <Link to="/register" className='routerLink'>إنشاء حساب</Link>
        </form>
    );
};

export default Login;
