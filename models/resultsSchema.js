const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    Assessment: { type: String, required: false },
    ObtainedMarks: { type: String, required: false },
    TotalMarks: { type: String, required: false },
    EnrollmentID: { type: String, required: false }

});

const Result = mongoose.model("results", resultsSchema)
module.exports = Result