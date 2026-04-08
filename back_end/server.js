const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes= require('./routes/orderRoutes')
const notification=require('./routes/nofificationsRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const app = express();

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, 'Uploads'),
  path.join(__dirname, 'Uploads/cover_books'),
  path.join(__dirname, 'Uploads/Profile_pictures'),
];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const DATABASE = process.env.DATABASE;
mongoose.connect(DATABASE)
  .then(() => console.log('MongoDB connected'))
  .catch(error => {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes)
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/notify',notification);
app.use('/api/review',reviewRoutes);
app.use("*", (req, res) => {
  res.status(404).json({ message: `can not found route for  this ${req.originalUrl}` })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
