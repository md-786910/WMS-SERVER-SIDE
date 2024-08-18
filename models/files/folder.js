const mongoose = require("mongoose");
const folderSchema = new mongoose.Schema(
    {
        folderName: {
            type: String,
            required: true,
        },
        redirectTo: {
            type: String,
            required: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
const folderModel = mongoose.model("folder", folderSchema)
module.exports = folderModel;
