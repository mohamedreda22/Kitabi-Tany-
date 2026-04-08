const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Helper to ensure directory exists
const ensureDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    return dirPath;
};

// Storage configuration for book covers
const storageBook = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const dest = ensureDir(path.resolve(__dirname, '../Uploads/cover_books'));
            cb(null, dest);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

// Configure upload limits and file filtering
const uploadBook = multer({
    storage: storageBook,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
});

const uploadProfile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            try {
                const dest = ensureDir(path.resolve(__dirname, '../Uploads/Profile_pictures'));
                cb(null, dest);
            } catch (error) {
                cb(error);
            }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
}).single('profilePicture');

module.exports = { uploadBook, uploadProfile };
