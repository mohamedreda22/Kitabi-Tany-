const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Add this line
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../middleware/hashing');
const { uploadProfile } = require('../middleware/Upload');

// Register route
router.post('/register', uploadProfile, async (req, res) => {
    console.log('Request file:', req.file); // Should not be undefined
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the file was successfully uploaded
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);

        if (req.file) {
            console.log('Uploaded file:', req.file); 
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
        const savedUser = await newUser.save();
        console.log("New user data after saving:", savedUser._id.toString());

        // Respond with success
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    // Validate ObjectId before querying the database
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log('Fetched User ID:', user._id.toString());
        res.json(user);
    } catch (error) {
        console.error("Fetch User Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.put('/:id', uploadProfile, async (req, res) => {
    const userId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    try {
        const updateData = {
            username: req.body.username,
            role: req.body.role,
            ...(req.body.password && { password: await hashPassword(req.body.password) })
        };

        // If profile picture is updated, add file name to updateData
        if (req.file) {
            updateData.profilePicture = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    // Validate ObjectId before querying the database
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ error: error.message });
    }
});
// Get the profile picture of the user
router.get('/profilePicture/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log('Profile picture filename:', filename);
    res.sendFile(path.join(__dirname, 'Uploads/Profile_pictures/default.jpg'));

});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Fetch Users Error:", error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/logout',async (req,res)=>{
    res.clearCookie('userId');
    res.clearCookie('token');
    res.json({message:'Logged out successfully'});
})

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
        // console.log('Logged in User ID:', user._id.toString());
        // console.log('Fetched User:', user);
        // console.log('User ID:', user._id);
        // console.log('User ID string:', user._id.toString());
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username , role: user.role },
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );
        const userId = user._id.toString();
        // Set cookies
        // console.log("Setting cookie for userId:", userId);
        // cookies.set('userId', userId, { expires: 7 });
        res.cookie('userId', userId, { 
            httpOnly: true, 
            // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            secure: false, // Use secure cookies in production
            sameSite: 'None', 
            maxAge: 3600000 // 1 hour
        });
        // console.log("Setting cookie for userId:", userId);

         res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
            maxAge: 3600000 
        });

        res.json({ message: 'Login successful', token:token , userId: user._id , user: user });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
