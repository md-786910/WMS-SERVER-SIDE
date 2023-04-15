const mongoose = require("mongoose");
const issuesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isResolved: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);
const Issues = mongoose.model("Issues", issuesSchema)
module.exports = Issues;
