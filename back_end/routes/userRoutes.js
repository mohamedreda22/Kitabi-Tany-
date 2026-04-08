const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { uploadProfile } = require('../middleware/Upload');

router.post('/register', uploadProfile, userController.register);
router.get('/:id', userController.getUserById);
router.put('/:id', uploadProfile, userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.get('/logout', userController.logout);

module.exports = router;
