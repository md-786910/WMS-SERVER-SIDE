const moment = require("moment");
const Expence = require("../models/expences");
module.exports = {
    addMoney: async (req, res) => {
        try {
            let { amount } = req.body;
            amount = parseInt(amount);
            const month = moment().format("MMMM");
            const checkMonth = await Expence.findOne({ "month.month": month });
            if (checkMonth !== null) {
                checkMonth.amount += amount;
                checkMonth.month[0].amount += amount;
                await checkMonth.save();
                res
                    .status(201)
                    .json({
                        message: "added money successfully",
                        data: checkMonth,
                        success: true,
                    });
            } else {
                const saveMoney = new Expence({
                    amount: amount,
                    month: [
                        {
                            month: month,
                            amount: amount,
                        },
                    ],
                });
                const data = await saveMoney.save();
                res
                    .status(201)
                    .json({
                        message: "added money successfully",
                        data: data,
                        success: true,
                    });
            }
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },
    getMoney: async (req, res) => {
        try {
            const data = await Expence.find({});
            res
                .status(200)
                .json({
                    message: "",
                    data: data,
                    success: true,
                });
            return data;
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },
};
