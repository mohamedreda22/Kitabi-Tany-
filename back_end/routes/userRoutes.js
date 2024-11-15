const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../middleware/hashing');
const { uploadProfile } = require('../middleware/Upload');

// Create a new user (register)
/* router.post('/register', uploadProfile, async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Check if the file was successfully uploaded
        if (req.file) {
            console.log('Uploaded file:', req.file);
        } else {
            console.log('No file uploaded');
        }
        
        // Proceed with registration logic
        // You can use req.body to access other form fields
        console.log('Form Data:', req.body);
        
        // Your registration logic here
        
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
    try {
        console.log("File upload result:", req.file); // Log file information to verify the upload
        // Check if the email already exists
        console.log("Uploaded file:", req.file);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);
        const profilePicFilename = req.file ? req.file.filename : "default-test-image.jpg";

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture: profilePicFilename, // Set profilePicture
        });
        console.log("New user data before saving:", newUser); // Log newUser to verify the data

        // Save user to database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
}); */

// Register route
router.post('/register', uploadProfile, async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the file was successfully uploaded
        if (req.file) {
            console.log('Uploaded file:', req.file);  // This should log the file details
        } else {
            console.log('No file uploaded');
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // If no profile picture, set a default
        const profilePicFilename = req.file ? req.file.filename : 'default-test-image.jpg';
        console.log('Profile picture filename:', profilePicFilename); 

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture: profilePicFilename, // Set profilePicture to the uploaded file or default
        });
        
        // Log the newUser data before saving for debugging
        console.log("New user data before saving:", newUser);

        // Save user to database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Fetch User Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(400).json({ error: error.message });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.SECRET_KEY, // Use a secret key from environment variables
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
