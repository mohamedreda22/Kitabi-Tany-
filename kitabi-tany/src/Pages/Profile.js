import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import '../assets/css/Profile.css';

const Profile = () => {
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
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const userId = Cookies.get('userId');
        const token = Cookies.get('token');
        if (!userId || !token) {
            Swal.fire({
                icon: 'warning',
                title: 'غير مصرح لك بالدخول',
                text: 'الرجاء تسجيل الدخول للوصول الى هذه الصفحة',
            }).then(() => {
                console.error('Unauthorized access to profile');
            });
        } else {
            fetchUserData();
        }

        // Apply theme based on selected mode
        document.body.className = theme;
    }, [theme] );

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFormData({
                username: response.data.username,
                email: response.data.email,
                password: '',
                profilePicture: response.data.profilePicture,
                role: response.data.role,
            });
            setProfilePicturePreview(response.data.profilePicture);
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response && error.response.status === 401) {
                Cookies.remove('userId');
                Cookies.remove('token');
                Swal.fire({
                    icon: 'error',
                    title: 'Session Expired',
                    text: 'Please log in again.',
                }).then(() => {
                });
            } else {
                console.error('Error fetching user data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch user data.',
                });
            }
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
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid File Type',
                    text: 'Please upload a JPEG or PNG image.',
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
            await axios.put(`${API_BASE_URL}/users/${userId}`, formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Profile updated successfully!',
                timer: 1500,
                showConfirmButton: false,
            });
            fetchUserData();
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'خطا في تحديث البيانات الرجاء المحاولة مرة اخرى',
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
                await axios.delete(`${API_BASE_URL}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Cookies.remove('userId');
                Cookies.remove('token');
                Swal.fire({
                    icon: 'success',
                    title: 'حذف الحساب',
                    text: 'تم حذف الحساب بنجاح',
                });
            } catch (error) {
                console.error('Error deleting account:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'حدث خطأ أثناء حذف الحساب، الرجاء المحاولة مرة اخرى',
                });
            }
        }
    };

    // Handle theme toggle
    const handleThemeToggle = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Handle logout
    const handleLogOut = () => {
        Cookies.remove('userId');
        Cookies.remove('token');
        window.location.href = '/';
    };

    return (
        <div className="profile-container">
            <div className="sidebar">
            <div className="avatar">
            {profilePicturePreview ? (
                <img 
                src={`http://localhost:5000/profile_pictures/${formData.profilePicture}`} 
                    className='avater'
                />
            ) : (
                <img src="/My LOGO.jpg" alt="Default Avatar" />
            )}
        </div>


                <h3>اعدادات الملف الشخصي</h3>
                <button onClick={handleDeleteAccount} >حذف الحساب</button><br/>
                <button onClick={handleLogOut} className='logout-btn'>تسجيل الخروج</button>
                <div className="toggle-switch-container">
                    <label>Toggle Theme</label>
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
            </div>
            <div className="content">
                <form className="profile-form" onSubmit={handleSubmit}>
                    <h1>البيانات الاساسية</h1>
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
                            placeholder="Leave empty to keep current password"
                        />
                    </div>
                    <div className="form-group">
                        <label>الدور</label>
                        <input type="text" name="role" value={formData.role} onChange={handleChange} disabled />
                    </div>
                    <div className="form-group">
                        <label>تغير الصورة </label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit">حفظ التغيرات</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
