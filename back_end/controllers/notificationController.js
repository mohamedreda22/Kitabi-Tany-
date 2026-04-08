const notificationService = require('../services/notificationService');

const createNotification = async (userId, message) => {
    try {
        await notificationService.createNotification(userId, message);
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

const getUserNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getUserNotifications(req.userId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error getting notifications:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createNotification,
    getUserNotifications
};
