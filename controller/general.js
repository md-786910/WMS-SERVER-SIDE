const issuesModel = require("../models/Issues")
const companyModel = require("../models/company")
const taskModel = require("../models/task")
const notebookFileModel = require("../models/notebookFile")
const notebookModel = require("../models/notebook")


module.exports.searchGlobal = async (req, res, next) => {
    try {
        const results = [];
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


        // notebook & notebook files
        const notebooksFile = await notebookFileModel.find({
            $or: [
                { fileName: { $regex: query, $options: 'i' } },
            ],
        }).select("fileName redirectTo").limit(10);

        results.push(...notebooksFile);


        const notebooks = await notebookModel.find({
            $or: [
                { content: { $regex: query, $options: 'i' } },
            ],
        }).select("content redirectTo").limit(10);

        results.push(...notebooks);

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