const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema(
    {
        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'folder',
            required: false,
        },
        isFolderExist: {
            type: Boolean,
        },
        fileName: {
            type: String,
            required: false,
        },
        fileType: {
            type: String,
            required: false,
        },
        fileUrl: {
            type: String,
            required: false,
        },
        key: {
            type: String,
            required: false,
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
const fileModel = mongoose.model("file", fileSchema)
module.exports = fileModel;
