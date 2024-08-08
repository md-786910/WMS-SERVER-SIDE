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
        redirectTo: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            virtual: true,
            get: function () {
                return "issue";
            }
        }

    },
    {
        timestamps: true,
    }
);
const Issues = mongoose.model("Issues", issuesSchema)
module.exports = Issues;
