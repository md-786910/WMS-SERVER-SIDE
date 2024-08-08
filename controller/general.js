const issuesModel = require("../models/Issues")
const companyModel = require("../models/company")
const taskModel = require("../models/task")

const results = [];
module.exports.searchGlobal = async (req, res, next) => {
    try {
        let { query = "" } = req.query;

        // Search in issuesModel based on title and content
        const issues = await issuesModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
            ],
        }).select("title redirectTo type").limit(10);
        results.push(...issues);

        // Search in companyModel based on name, role, and status
        const companies = await companyModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { role: { $regex: query, $options: 'i' } },
                { status: { $regex: query, $options: 'i' } },
            ],
        }).select("name role status redirectTo type").limit(10);;
        results.push(...companies);


        // Search in taskModel based on title
        const tasks = await taskModel.find({
            title: { $regex: query, $options: 'i' },
        }).select("title redirectTo type").limit(10);


        results.push(...tasks);

        console.log({ results });
        query = ""
        res.status(200).send(results)
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: error.message,
            success: false,
        });
    }
};