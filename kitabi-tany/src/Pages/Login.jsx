import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import Swal from 'sweetalert2';
import "../assets/css/Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(formData);
            Cookies.set('token', data.token, { expires: 7 });
            Cookies.set('userId', data.userId, { expires: 7 });
            const role = data.userRole || (data.user && data.user.role);
            Cookies.set('userRole', role, { expires: 7 });
            Cookies.set('profilePic', data.user && data.user.profilePicture, { expires: 7 });

            Swal.fire({
                icon: 'success',
                title: 'تم تسجيل الدخول بنجاح',
                text: 'مرحباً بك مرة أخرى!',
                confirmButtonColor: '#2e7d32',
                timer: 1500,
                showConfirmButton: false
            });

            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
         } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'فشل تسجيل الدخول',
                text: err.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
                confirmButtonColor: '#f44336',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" dir="rtl">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-header">تسجيل الدخول</h2>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="البريد الإلكتروني"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="كلمة المرور"
                        required
                    />
                </div>
                <button type="submit" className="auth-btn" disabled={loading}>
                    {loading ? "جارِ التحقق..." : "دخول"}
                </button>
                <Link to="/register" className='routerLink'>ليس لديك حساب؟ سجل الآن</Link>
            </form>
        </div>
    );
};

export default Login;
