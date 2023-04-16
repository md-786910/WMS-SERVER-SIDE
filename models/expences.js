const mongoose = require("mongoose");
const expenceSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            default: 0
        },
        month: [ // current month
            {
                month: {
                    type: String,
                },
                amount: {
                    type: Number,
                    default: 0
                }
            }
        ]

    },
    {
        timestamps: true,
    }
);
const Expence = mongoose.model("Expence", expenceSchema)
module.exports = Expence;
