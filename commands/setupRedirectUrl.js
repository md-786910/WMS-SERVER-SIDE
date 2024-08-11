const issuesModel = require("../models/Issues");
const companyModel = require("../models/company");
const taskModel = require("../models/task");
const notebookFileModel = require("../models/notebookFile");
const notebookModel = require("../models/notebook");

const runDb = require("../conn/mongoConn");
const { DB_URI } = require("../constants/config");
runDb(DB_URI);
const runSetUpRedirectFunc = async () => {
    console.log("script started");
    try {
        const issues = await issuesModel.find({});
        const companies = await companyModel.find({});
        const tasks = await taskModel.find({});
        const notebookFiles = await notebookFileModel.find({});
        const notebooks = await notebookModel.find({});

        let countTask = tasks?.length - 1;

        for (const issue of issues) {
            const issueId = issue?._id;
            const redirectTo = "resolve/" + issueId;
            await issue.updateOne({ redirectTo });
            console.log("running for issues of ", issueId);
        }

        for (const task of tasks) {
            const taskId = task?._id;
            const redirectTo = `task?card=${countTask}`;
            await task.updateOne({ redirectTo });
            console.log("running for tasks of ", taskId);
            countTask--;
        }

        for (const company of companies) {
            const companyId = company?._id;
            const redirectTo = "company/" + companyId;
            await company.updateOne({ redirectTo });

            console.log("running for company of ", companyId);
        }

        for (const notebookFile of notebookFiles) {
            const notefileId = notebookFile?._id;
            const file = notebookFile?.fileName;
            const redirectTo = `notebook/${notefileId}-${file}`;
            await notebookFile.updateOne({
                redirectTo,
            });
            console.log("running for notebookFile of ", notefileId);
        }

        for (const notebook of notebooks) {
            const notefileId = notebook?.fileId;
            const noteFile = await notebookFileModel.findOne({
                _id: notefileId,
            })
            const file = noteFile?.fileName;
            const redirectTo = `notebook/${notefileId}-${file}`;
            await notebook.updateOne({
                redirectTo,
            });
            console.log("running for notebook of ", notefileId);
        }

        console.log("End");
    } catch (error) {
        console.log({ error });
        throw new Error(error);
    }
};

runSetUpRedirectFunc();
