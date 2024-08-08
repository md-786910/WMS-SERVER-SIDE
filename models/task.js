const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        redirectTo: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            virtual: true,
            get: function () {
                return "task";
            }
        }
    },
    {
        timestamps: true,
    }
);
const Task = mongoose.model("Task", taskSchema)
module.exports = Task;
