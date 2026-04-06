import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../assets/css/Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer',
        profilePicture: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registerUser(formData);
            Swal.fire({
                icon: 'success',
                title: 'تم التسجيل بنجاح',
                text: 'يمكنك الآن تسجيل الدخول إلى حسابك',
                confirmButtonColor: '#2e7d32',
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/login');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'فشل التسجيل',
                text: err.message || 'حدث خطأ أثناء إنشاء الحساب',
                confirmButtonColor: '#f44336',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" dir="rtl">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-header">إنشاء حساب جديد</h2>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="اسم المستخدم"
                    required
                />
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
                <div className="form-group">
                    <label>نوع الحساب</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="buyer">مشتري (أريد شراء كتب)</option>
                        <option value="seller">بائع (أريد عرض كتبي للبيع)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>صورة الملف الشخصي</label>
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                {formData.profilePicture && formData.profilePicture instanceof File && (
                    <img
                        src={URL.createObjectURL(formData.profilePicture)}
                        alt="profile-preview"
                        className="profile-preview"
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }}
                    />
                )}

                <button type="submit" className="auth-btn" disabled={loading}>
                    {loading ? "جارِ الإنشاء..." : "تسجيل"}
                </button>
                <Link to="/login" className="routerLink">لديك حساب بالفعل؟ سجل دخولك</Link>
            </form>
        </div>
    );
};

export default Register;
