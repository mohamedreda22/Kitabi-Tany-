const multer = require('multer');
const path = require('path');
const storageBook = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../back_end/cover_books');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadBook = multer({ storage: storageBook });
module.exports = uploadBook;
