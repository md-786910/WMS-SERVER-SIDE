const mongoose = require("mongoose");
const notebookSchema = new mongoose.Schema(
    {
        fileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notebookFile',
        },
        content: {
            type: String,
            required: false,
            default: "",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        redirectTo: {
            type: String,
            required: false,
        },


    },
    {
        timestamps: true,
    }
);
const notebookModel = mongoose.model("notebook", notebookSchema)
module.exports = notebookModel;
