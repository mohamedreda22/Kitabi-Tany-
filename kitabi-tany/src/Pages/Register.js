import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer',
        profilePicture: '', // File reference will be here
    });
    const [uploadedFile, setUploadedFile] = useState(null); // To store the uploaded file data
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // File upload logic
        const file = formData.profilePicture;
        if (file) {
            const url = 'http://localhost:3000/uploadFile';
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('filename', file.name);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };

            try {
                const response = await axios.post(url, uploadFormData, config);
                setUploadedFile(response.data.file);
                alert("تم رفع الملف بنجاح");
            } catch (error) {
                setError('فشل رفع الملف');
            }
        }

        // Register the user
        try {
            const registrationData = {
                ...formData,
                profilePicture: uploadedFile ? uploadedFile : formData.profilePicture,
            };
            const data = await registerUser(registrationData);
            setSuccess("تم التسجيل بنجاح");
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
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
                    style={{ width: '100px', height: '100px', marginTop: '10px',marginLeft: '65px' }}
                />
            )}
            
            <button type="submit" className="auth-btn">إنشاء حساب</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <Link to="/login" className="routerLink">تسجيل الدخول</Link>
        </form>
    );
};

export default Register;
