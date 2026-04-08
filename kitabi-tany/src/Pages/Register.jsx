import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
                confirmButtonColor: '#00333c',
                timer: 2000,
                showConfirmButton: false
            });
            navigate('/login');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'فشل التسجيل',
                text: err.message || 'حدث خطأ أثناء إنشاء الحساب',
                confirmButtonColor: '#ba1a1a',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto" dir="rtl">
            <div className="bg-surface-container-low p-10 rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)] border border-outline-variant/10">
                <h2 className="font-notoSerif text-3xl text-primary text-center mb-10 italic">إنشاء حساب جديد</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">اسم المستخدم</label>
                            <input
                                type="text"
                                name="username"
                                className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="اسمك الكامل"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@mail.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">نوع الحساب</label>
                        <select
                            name="role"
                            className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope appearance-none cursor-pointer"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="buyer">مشتري (أريد شراء كتب)</option>
                            <option value="seller">بائع (أريد عرض كتبي للبيع)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">صورة الملف الشخصي</label>
                        <div className="flex items-center gap-6 p-4 bg-surface-container-highest rounded-xl">
                            <div className="flex-1">
                                <input
                                    type="file"
                                    name="profilePicture"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-outline file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary file:text-on-primary hover:file:opacity-90 cursor-pointer"
                                    required
                                />
                            </div>
                            {formData.profilePicture && formData.profilePicture instanceof File && (
                                <img
                                    src={URL.createObjectURL(formData.profilePicture)}
                                    alt="profile-preview"
                                    className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-primary/20"
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold hover:opacity-90 transition-opacity mt-4 shadow-lg shadow-primary/10"
                        disabled={loading}
                    >
                        {loading ? "جارِ الإنشاء..." : "تسجيل"}
                    </button>
                    <div className="text-center mt-8">
                        <Link to="/login" className="text-sm font-bold text-secondary hover:underline underline-offset-4">لديك حساب بالفعل؟ سجل دخولك</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
