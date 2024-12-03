const multer = require('multer');
const path = require('path');


// Storage configuration for book covers
const storageBook = multer.diskStorage({
    destination: (req, file, cb) => {
        // Destination folder for the uploaded book cover images
        cb(null, path.join(__dirname, '../Uploads/cover_books'));
    },
    filename: (req, file, cb) => {
        // Set the file name to be the current timestamp + the original file extension
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

/* const uploadProfile = multer({
    storage: storageProfile,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
}); */
// const uploadProfile = multer({ storage: storageProfile}).single('profilePicture');
const uploadProfile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('Setting file destination');
            cb(null, 'Uploads/Profile_pictures');
        },
        filename: (req, file, cb) => {
            console.log('Setting file name');
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
}).single('profilePicture');


/* const uploadProfile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'Uploads/Profile_pictures');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only .jpeg and .png formats are allowed'));
        }
    },
}).single('profilePicture'); */

module.exports = { uploadBook, uploadProfile };
