const express = require("express");
const { upload } = require("../config/multer");
const { uploadFilesToS3 } = require("../config/aws");
const fileModel = require("../models/files/file");
const { uploadFilesMultiple, getMultipleFiles, createFolder, getFolder, deleteDocFile, deleteFolderWithFiles } = require("../controller/filerController");
const fileRouter = express.Router();

fileRouter.post("/upload-files", upload.array('selectedFiles'), uploadFilesMultiple)
fileRouter.get("/get-multiple-files/:folderId", getMultipleFiles)
fileRouter.delete("/delete-file-docs/:fileId", deleteDocFile)
fileRouter.delete("/delete-folder-with-files/:folderId", deleteFolderWithFiles)

// folder
fileRouter.post("/create-folder", createFolder)
fileRouter.get("/get-folder", getFolder)

module.exports = fileRouter