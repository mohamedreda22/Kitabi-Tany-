import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import Swal from 'sweetalert2';
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
                confirmButtonColor: '#00333c',
                timer: 1500,
                showConfirmButton: false
            });

            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'seller') {
                navigate('/seller-dashboard');
            } else {
                navigate('/home');
            }
         } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'فشل تسجيل الدخول',
                text: err.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
                confirmButtonColor: '#ba1a1a',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto" dir="rtl">
            <div className="bg-surface-container-low p-10 rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)] border border-outline-variant/10">
                <h2 className="font-notoSerif text-3xl text-primary text-center mb-10 italic">تسجيل الدخول</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface placeholder-on-surface-variant/40 font-manrope"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@mail.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface placeholder-on-surface-variant/40 font-manrope"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 transition-opacity mt-4 shadow-lg shadow-primary/10"
                        disabled={loading}
                    >
                        {loading ? "جارِ التحقق..." : "دخول"}
                    </button>
                    <div className="text-center mt-8">
                        <Link to="/register" className="text-sm font-bold text-secondary hover:underline underline-offset-4">ليس لديك حساب؟ سجل الآن</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
