const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadProfile
    = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'Uploads/Profile_pictures');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    });

const router = express.Router();

router.post('/profile_pictures', uploadProfile.single('file'), (req, res) => {
    if (req.file) {
        res.status(200).json({ file: req.file.filename });
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
});

module.exports = router;
