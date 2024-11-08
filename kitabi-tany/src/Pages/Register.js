import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { Link } from 'react-router-dom';


const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer',
        profilePicture: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            setSuccess("User registered successfully");
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
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
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>
            <input
                type="file"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                placeholder="Profile Picture"
                required
            />
            <button type="submit">Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <Link to="/login" className='routerLink'>Login</Link>

        </form>
    );
};

export default Register;
