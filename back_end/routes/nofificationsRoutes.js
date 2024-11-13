const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const isAuth = require('../middleware/isAuth');


router.get('/myNotifications', isAuth, notificationController.getUserNotifications);

module.exports = router;