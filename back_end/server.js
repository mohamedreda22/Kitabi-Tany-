const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  })
);
app.use('/cover_books', express.static(path.join(__dirname, 'Uploads/cover_books')));
app.use('/profile_pictures', express.static(path.join(__dirname, 'Uploads/Profile_pictures')));

const DATABASE = process.env.DATABASE;
mongoose.connect(DATABASE)
  .then(() => console.log('MongoDB connected'))
  .catch(error => {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  });

//app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); //have register and login
app.use('/api/books', bookRoutes)
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));