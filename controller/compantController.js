const CompanyTask = require("../models/CompanyTask");
const Company = require("../models/company");
module.exports = {
    addCompany: async (req, res) => {
        try {
            const saveCompany = new Company({
                ...req.body,
            });
            const data = await saveCompany.save();
            const redirectTo = "resolve/" + data?._id
            await data.updateOne({ redirectTo });
            res
                .status(201)
                .json({
                    message: "company added successfully",
                    data: data,
                    success: true,
                });
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },
    updateCompany: async (req, res) => {
        try {
            const data = await Company.findByIdAndUpdate(req.body.id, {
                ...req.body
            })
            res
                .status(201)
                .json({
                    message: "company updated successfully",
                    data: data,
                    success: true,
                });
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },
    getCompany: async (req, res) => {
        try {
            const data = await Company.find({});
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
    deleteCompany: async (req, res) => {
        try {
            const { id } = req.body;

            // delete task to that company
            const user = await Company.findById({ _id: id });
            await user.populate("companyTaskGet");
            user.companyTaskGet.map(async (d) => {
                await CompanyTask.findByIdAndDelete({ _id: d._id })
            })
            // delete company
            const data = await Company.findByIdAndDelete({ _id: id });
            res
                .status(201)
                .json({
                    message: "company delete successfully",
                    data: data,
                    success: true,
                });
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },
    getCompanyById: async (req, res) => {
        try {
            const { id } = req.body
            const data = await Company.findById({ _id: id })
            res
                .status(201)
                .json({
                    message: "",
                    data: data,
                    success: true,
                });
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },

    // company task
    addCompanyTask: async (req, res) => {
        try {
            const saveCompany = new CompanyTask({
                ...req.body,
                company: req.body.company,
            });
            const data = await saveCompany.save();
            res
                .status(201)
                .json({
                    message: "task added successfully",
                    data: data,
                    success: true,
                });
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },
    completeTask: async (req, res) => {
        try {
            const { id } = req.body;
            const taskDelete = await CompanyTask.findById({ _id: id });
            taskDelete.isCompleted = !taskDelete.isCompleted;
            await taskDelete.save();
            res
                .status(201)
                .json({
                    message: "complete task successfully",
                    data: taskDelete,
                    success: true,
                });
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },


    getCompanyTask: async (req, res) => {
        try {
            const data = await Company.find({});
            let result = [];

            data?.forEach(async (d) => {
                const user = await Company.findById({ _id: d._id });
                await user.populate("companyTaskGet");
                result.push({
                    company: d,
                    task: user.companyTaskGet.map((d) => d),
                });
            });

            // const user = await Company.findById("6438e0acffa8b23ae41e0a2d");
            // await user.populate("companyTaskGet");
            // console.log(user.companyTaskGet);
            setTimeout(() => {
                res
                    .status(200)
                    .json({
                        message: "company task fetch successfully",
                        data: result,
                        success: true,
                    });
            }, 1500);

            // const task = await CompanyTask.findById("64392d21acb28fee94f91775");
            // const data = await task.populate("Company");
        } catch (error) {
            res.status(404).json({ message: error.message, success: false });
        }
    },
};
