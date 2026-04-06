import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { getUserById, updateUser, deleteUser, logout } from '../services/userService';
import { IMAGE_BASE_URL } from '../services/axiosInstance';
import '../assets/css/Profile.css';
import { Link, useNavigate } from 'react-router-dom';

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
    const [theme, setTheme] = useState('light');
    const userId = Cookies.get('userId');
    const token = Cookies.get('token');

    useEffect(() => {
        if (!userId || !token) {
            Swal.fire({
                icon: 'warning',
                title: 'غير مصرح لك بالدخول',
                text: 'الرجاء تسجيل الدخول للوصول الى هذه الصفحة',
            }).then(() => {
                navigate('/login');
            });
        } else {
            fetchUserData();
        }

        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(savedTheme);
    }, [navigate, userId, token]);

    // Fetch user data
    const fetchUserData = async () => {
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
            });
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle profile picture upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'نوع ملف غير صالح',
                    text: 'يرجى تحميل صورة بصيغة JPEG أو PNG.',
                });
                return;
            }
            setFormData({ ...formData, profilePicture: file });
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    // Submit updated profile data
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
            });
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        const confirmation = await Swal.fire({
            icon: 'warning',
            title: 'هل انت متأكد؟',
            text: 'ذلك سيؤدي الى حذف حسابك نهائياً',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذف الحساب',
            cancelButtonText: 'الغاء',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
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
                });
            }
        }
    };

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    
    const handleLogOut = () => {
        logout();
    };

    return (
        <div className="profile-container" dir="rtl">
            <div className="sidebar">
                <div className="avatar">
                    {profilePicturePreview ? (
                        <img
                            src={typeof formData.profilePicture === 'string'
                                ? `${IMAGE_BASE_URL}/profile_pictures/${formData.profilePicture}`
                                : profilePicturePreview}
                            className='avatar-img'
                            alt="Profile"
                        />
                    ) : (
                        <img src="/My_Logo.jpg" alt="Default Avatar" className="avatar-img" />
                    )}
                </div>

                <h3>إعدادات الملف الشخصي</h3>
                <button onClick={handleDeleteAccount} className="delete-btn">حذف الحساب</button>
                <button onClick={handleLogOut} className='logout-btn'>تسجيل الخروج</button>

                <div className="toggle-switch-container">
                    <label>تغيير المظهر</label>
                    <div className={`toggle-switch ${theme}`}>
                        <input
                            type="checkbox"
                            className="toggle-input"
                            id="themeToggle"
                            checked={theme === 'dark'}
                            onChange={handleThemeToggle}
                        />
                        <label htmlFor="themeToggle" className="toggle-label"></label>
                    </div>
                </div>

                <Link to="/home">
                    <button className="btn-home" style={{backgroundColor:"#4CAF50", color: "white", padding: "10px", borderRadius: "5px", marginTop: "10px", width: "100%"}}>العودة للرئيسية</button>
                </Link>
            </div>

            <div className="content">
                <form className="profile-form" onSubmit={handleSubmit}>
                    <h1>البيانات الأساسية</h1>
                    <div className="form-group">
                        <label>الأسم الكامل</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>البريد الألكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="اتركه فارغاً للحفاظ على كلمة المرور الحالية"
                        />
                    </div>
                    <div className="form-group">
                        <label>الدور</label>
                        <input type="text" name="role" value={formData.role} disabled />
                    </div>
                    <div className="form-group">
                        <label>تغيير الصورة</label>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <button type="submit" className="save-btn">حفظ التغييرات</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
