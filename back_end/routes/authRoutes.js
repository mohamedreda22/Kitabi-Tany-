const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { uploadProfile } = require('../middleware/Upload');
router.post('/register', uploadProfile, authController.register);
router.post('/login', authController.login);
router.post("/forgetPassword", authController.forgetPassword)
router.post("/resetPassword", authController.resetPassword)


module.exports = router;