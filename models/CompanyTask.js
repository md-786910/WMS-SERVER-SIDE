const mongoose = require("mongoose");
const companyTaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }
    },
    {
        timestamps: true,
    }
);
const CompanyTask = mongoose.model("CompanyTask", companyTaskSchema)
module.exports = CompanyTask;
