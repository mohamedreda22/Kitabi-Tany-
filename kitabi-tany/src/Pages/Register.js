import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/css/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer',
        profilePicture: '', 
    });
    // const [uploadedFile, setUploadedFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const file = formData.profilePicture;
        let uploadedFileName = '';
    
        if (file) {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
    
            try {
                const response = await axios.post(
                    'http://localhost:5000/upload/profile_pictures',
                    uploadFormData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                uploadedFileName = response.data.file;
    
                Swal.fire({
                    icon: 'success',
                    title: 'تم رفع الملف بنجاح',
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'فشل رفع الملف';
                Swal.fire({
                    icon: 'error',
                    title: 'فشل رفع الملف',
                    text: errorMessage,
                    confirmButtonColor: '#d33',
                });
                return; // stop further execution if upload fails
            }
        }
    
        // Ensure that uploadedFileName is passed as profilePicture in registrationData
        try {
            const registrationData = {
                ...formData,
                profilePicture: uploadedFileName,  // Set uploaded file name to profilePicture
            };
            const data = await registerUser(registrationData);
            console.log(registrationData);
            Swal.fire({
                icon: 'success',
                title: 'تم التسجيل بنجاح',
                text: data.message,
                confirmButtonColor: '#4CAF50',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'حدث خطأ أثناء التسجيل';
            Swal.fire({
                icon: 'error',
                title: 'فشل التسجيل',
                text: errorMessage,
                confirmButtonColor: '#d33',
            });
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-header">إنشاء حساب</h2>
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
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="buyer">مشتري</option>
                <option value="seller">بائع</option>
            </select>
            <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                placeholder="صورة الملف الشخصي"
                required
            />
            {formData.profilePicture && (
                <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="profile-preview"
                    style={{ width: '100px', height: '100px', marginTop: '10px', marginLeft: '80px' }}
                />
            )}
            
            <button type="submit" className="auth-btn">إنشاء حساب</button>
            <Link to="/login" className="routerLink">تسجيل الدخول</Link>
        </form>
    );
};

export default Register;
