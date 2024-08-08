const mongoose = require("mongoose");
const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        skill: {
            type: String,
            required: true,
        },
        status: {
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
                return "company";
            }
        }

    },
    {
        timestamps: true,
    }
);

companySchema.virtual("companyTaskGet", {
    ref: "CompanyTask",
    localField: "_id",
    foreignField: "company",
});

const Company = mongoose.model("Company", companySchema)
module.exports = Company;
