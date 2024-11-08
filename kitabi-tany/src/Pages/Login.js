// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import "../assets/css/Auth.css"
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            setSuccess(data.message);
            setError(null);
            localStorage.setItem('token', data.token); // Store token in localStorage
        } catch (err) {
            setError(err.message || 'Login failed');
            setSuccess(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <Link to="/register" className='routerLink'>Register</Link>


        </form>
    );
};

export default Login;
