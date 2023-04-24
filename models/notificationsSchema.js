const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    NotificationHeader: { type: String, required: false },
    NotificationBody: { type: String, required: false },
    Image: { type: String, required: false },
    Date: { type: String, required: false },
});

const Notification = mongoose.model("notifications", notificationsSchema)

module.exports = Notification;