const mongoose = require("mongoose");
const notebookFileSchema = new mongoose.Schema(
    {
        fileName: {
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
const notebookFileModel = mongoose.model("notebookFile", notebookFileSchema)
module.exports = notebookFileModel;
