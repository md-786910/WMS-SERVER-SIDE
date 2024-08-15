const express = require("express");
const { createFile, getAllFiles, createNotebook, getContentNotebook, deleteFiles, updateOrderNotebookFiles } = require("../controller/notebookController");
const notebookRouter = express.Router();

notebookRouter.post("/create-file", createFile);
notebookRouter.get("/get-all-file", getAllFiles);
notebookRouter.patch("/order-notebook-files", updateOrderNotebookFiles);
notebookRouter.delete("/delete-file/:fileId", deleteFiles);

// create notebook
notebookRouter.post("/create-notebook/", createNotebook);
notebookRouter.get("/get-notebook-content/:fileId", getContentNotebook);




module.exports = notebookRouter;
