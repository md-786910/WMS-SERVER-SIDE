
const notebookFileModel = require("../models/notebookFile");

const runDb = require("../conn/mongoConn");
const { DB_URI } = require("../constants/config");
runDb(DB_URI);
const runSetUpRedirectFunc = async () => {
    console.log("script started");
    try {

        const notebookFiles = await notebookFileModel.find({});

        let order = 1;

        for (const notebookFile of notebookFiles) {
            await notebookFile.updateOne({
                order,
            });
            console.log("running for notebookFile of ", order);
            order++;
        }



        console.log("End");
    } catch (error) {
        console.log({ error });
        throw new Error(error);
    }
};

runSetUpRedirectFunc();
