const Notification = require('../models/Notification.js');

const createNotification = async (userId, message) => {
    try {
        const notification = new Notification({
            user: userId,
            message
        });
        await notification.save();
        return notification;
    } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};

const getUserNotifications = async (userId) => {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

module.exports = {
    createNotification,
    getUserNotifications
};
