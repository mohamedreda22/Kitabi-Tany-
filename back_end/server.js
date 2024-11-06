const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect('mongodb+srv://nyara3376:8mmiewlj7z5CVJ7y@cluster0.md1gk.mongodb.net/Kitabi_Tani')
  .then(() => console.log('MongoDB connected'))
  .catch(error => {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  });

app.use('/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));