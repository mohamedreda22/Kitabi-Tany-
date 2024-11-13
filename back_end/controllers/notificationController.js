const Notification = require('../models/Notification.js');
 
const createNotification = async (userId, message) => {
    try {
        const notification = new Notification({
            user: userId,
            message
        });
        await notification.save();
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

 
const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.userId }).sort({ createdAt: -1 });
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
