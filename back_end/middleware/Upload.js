const multer = require('multer');
const path = require('path');
 
const storageBook = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../back_end/Uploads/cover_books');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

 
const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../back_end/Uploads/profile_pictures'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadBook = multer({ storage: storageBook });
const uploadProfile = multer({ storage: storageProfile });

module.exports = { uploadBook, uploadProfile };
