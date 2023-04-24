const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Activity: { type: String, required: false },
    Description: { type: String, required: false },
    Date: { type: String, required: false },
    User: { type: String, required: false }


});

const UserActivity = mongoose.model("user_activity", userActivitySchema)

module.exports = UserActivity