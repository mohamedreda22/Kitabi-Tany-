import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getUserById, updateUser, deleteUser, logout } from '../services/userService';
import { IMAGE_BASE_URL } from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profilePicture: '',
        role: '',
    });
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const userId = Cookies.get('userId');
    const token = Cookies.get('token');

    const fetchUserData = useCallback(async () => {
        try {
            const data = await getUserById(userId);
            setFormData({
                username: data.username,
                email: data.email,
                password: '',
                profilePicture: data.profilePicture,
                role: data.role,
            });
            setProfilePicturePreview(data.profilePicture);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'فشل في تحميل بيانات المستخدم.',
                confirmButtonColor: '#ba1a1a',
            });
        }
    }, [userId]);

    useEffect(() => {
        if (!userId || !token) {
            Swal.fire({
                icon: 'warning',
                title: 'غير مصرح لك بالدخول',
                text: 'الرجاء تسجيل الدخول للوصول الى هذه الصفحة',
                confirmButtonColor: '#00333c',
            }).then(() => {
                navigate('/login');
            });
        } else {
            fetchUserData();
        }
    }, [navigate, userId, token, fetchUserData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'نوع ملف غير صالح',
                    text: 'يرجى تحميل صورة بصيغة JPEG أو PNG.',
                    confirmButtonColor: '#00333c',
                });
                return;
            }
            setFormData({ ...formData, profilePicture: file });
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        for (const key in formData) {
            if (key === 'password' && !formData[key]) continue;
            formPayload.append(key, formData[key]);
        }

        try {
            await updateUser(userId, formPayload);
            Swal.fire({
                icon: 'success',
                title: 'تم بنجاح',
                text: 'تم تحديث الملف الشخصي بنجاح!',
                timer: 1500,
                showConfirmButton: false,
            });
            fetchUserData();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: error.message || 'خطأ في تحديث البيانات الرجاء المحاولة مرة اخرى',
                confirmButtonColor: '#ba1a1a',
            });
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = await Swal.fire({
            icon: 'warning',
            title: 'هل انت متأكد؟',
            text: 'ذلك سيؤدي الى حذف حسابك نهائياً',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذف الحساب',
            cancelButtonText: 'الغاء',
            confirmButtonColor: '#ba1a1a',
            cancelButtonColor: '#70787b',
        });

        if (confirmation.isConfirmed) {
            try {
                await deleteUser(userId);
                logout();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'حدث خطأ أثناء حذف الحساب، الرجاء المحاولة مرة اخرى',
                    confirmButtonColor: '#ba1a1a',
                });
            }
        }
    };

    const handleLogOut = () => {
        logout();
    };

    return (
        <div className="max-w-6xl mx-auto" dir="rtl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar Card */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="bg-surface-container-low p-8 rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)] border border-outline-variant/10 text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6 group">
                            <img
                                src={typeof formData.profilePicture === 'string'
                                    ? `${IMAGE_BASE_URL}/profile_pictures/${formData.profilePicture}`
                                    : profilePicturePreview || "/My_Logo.jpg"}
                                className="w-full h-full rounded-full object-cover ring-4 ring-primary/10 shadow-xl"
                                alt="Profile"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="material-symbols-outlined">photo_camera</span>
                                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            </label>
                        </div>
                        <h3 className="font-notoSerif text-2xl text-primary mb-1">{formData.username}</h3>
                        <p className="text-sm text-outline font-bold uppercase tracking-widest mb-8">{formData.role}</p>

                        <div className="space-y-3">
                            <button onClick={handleLogOut} className="w-full py-3 bg-surface-container-highest text-primary font-bold rounded-xl hover:bg-outline-variant/20 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">logout</span>
                                تسجيل الخروج
                            </button>
                            <button onClick={handleDeleteAccount} className="w-full py-3 text-error text-xs font-bold uppercase tracking-widest hover:underline transition-all">
                                حذف الحساب نهائياً
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary p-8 rounded-2xl text-on-primary">
                        <h4 className="font-notoSerif text-xl mb-4 italic">Kitabi Tany Community</h4>
                        <p className="text-sm opacity-80 leading-relaxed">شكراً لكونك جزءاً من مجتمعنا. نساهم سوياً في تقليل الهدر ونشر المعرفة بطريقة مستدامة.</p>
                    </div>
                </aside>

                {/* Form Content */}
                <div className="lg:col-span-8">
                    <div className="bg-surface-container-low p-10 rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)] border border-outline-variant/10">
                        <h2 className="font-notoSerif text-3xl text-primary italic mb-10">البيانات الشخصية</h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">الأسم الكامل</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">البريد الألكتروني</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-3 bg-surface-container-highest/50 border-none rounded-xl text-on-surface/50 font-manrope cursor-not-allowed"
                                        value={formData.email}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-outline mr-2">كلمة المرور الجديدة</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full px-4 py-3 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface font-manrope"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="اتركه فارغاً للحفاظ على كلمة المرور الحالية"
                                />
                            </div>

                            <div className="pt-6 border-t border-outline-variant/10 flex justify-end">
                                <button type="submit" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/10">
                                    حفظ التغييرات
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
