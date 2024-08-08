const issuesModel = require("../models/Issues")
const companyModel = require("../models/company")
const runDb = require("../conn/mongoConn")
runDb(process.env.DB_URI)
const runSetUpRedirectFunc = async () => {
    console.log("script started")
    try {

        const issues = await issuesModel.find({});
        const companies = await companyModel.find({})
        for (const issue of issues) {
            const issueId = issue?._id;
            const redirectTo = "resolve/" + issueId
            await issue.updateOne({ redirectTo });

            console.log("running for issues of ", issueId)

        }


        for (const company of companies) {
            const companyId = company?._id;
            const redirectTo = "company/" + companyId
            await company.updateOne({ redirectTo });

            console.log("running for company of ", companyId)

        }

        console.log("End")
    } catch (error) {
        console.log({ error })
        throw new Error(error);
    }
}

runSetUpRedirectFunc();