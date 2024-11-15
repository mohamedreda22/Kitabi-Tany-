const multer = require('multer');
const path = require('path');

// Storage configuration for book covers
const storageBook = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Uploads/cover_books'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Storage configuration for profile pictures
const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Storing file to:", '../back_end/Uploads/profile_pictures');
        // cb(null, '../back_end/Uploads/profile_pictures'); 
        cb(null, path.join(__dirname, '../Uploads/profile_pictures'));
    },
    filename: (req, file, cb) => {
        console.log("Original File Name:", file.originalname);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
    }
};

// Configure upload limits and file filtering
const uploadBook = multer({
    storage: storageBook,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
});

/* const uploadProfile = multer({
    storage: storageProfile,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
}); */
const uploadProfile = multer({ storage: storageProfile}).single('profilePicture');
module.exports = { uploadBook, uploadProfile };
