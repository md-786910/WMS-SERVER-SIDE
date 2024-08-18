const { uploadFilesToS3, deleteFilesFromS3 } = require("../config/aws");
const fileModel = require("../models/files/file");
const folderModel = require("../models/files/folder");

module.exports = {
    uploadFilesMultiple: async (req, res) => {
        try {
            const { isFolderContain, folderId = null } = req.query
            const files = req.files.map(file => ({
                name: file.originalname,
                content: file.buffer,
                type: file.mimetype,
            }));
            const results = await uploadFilesToS3(files);
            // save to db;
            for (const file of results) {

                const fileSaver = await fileModel.create({
                    folderId: folderId === 'null' ? null : folderId,
                    fileName: file.originalName,
                    fileType: file.type,
                    isFolderExist: isFolderContain,
                    fileUrl: file.url,
                    key: file.key,
                });
                const redirectTo = "cloud-storage?type=model"
                await fileSaver.updateOne({
                    redirectTo,
                });

            }
            res.status(200).json({ message: 'Files uploaded successfully' });

        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    getMultipleFiles: async (req, res) => {
        try {
            const folderId = req.params?.folderId;
            let files = null;
            if (folderId !== 'null') {
                files = await fileModel.find({ folderId: folderId, isFolderExist: true }).sort({ createdAt: -1 });
            } else {
                files = await fileModel.find({ isFolderExist: false }).sort({ createdAt: -1 });;
            }
            res.status(200).json(files);

        } catch (error) {
            res.status(404).json({ message: error.message });

        }
    },
    deleteDocFile: async (req, res) => {
        try {
            const { fileId } = req.params;
            const files = await fileModel.findOne({ _id: fileId })
            if (!files) {
                return res.status(404).json({ message: "File not found" });
            }

            const key = files?.key;
            // also delete from aws;
            const fileDeleteFromAws = await deleteFilesFromS3(key)
            if (!fileDeleteFromAws) {
                return res.status(404).json({ message: "Aws something went wrong" });
            }
            await fileModel.findByIdAndDelete(fileId);
            res.status(200).json({ messages: "File deleted successfully" });

        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error.message });

        }
    },
    deleteFolderWithFiles: async (req, res) => {
        try {
            const { folderId } = req.params;
            const folder = await folderModel.findOne({ _id: folderId })
            if (!folder) {
                return res.status(404).json({ message: "folder not found" });
            }
            const files = await fileModel.find({
                folderId: folderId,
                isFolderContain: true,
            })

            for (const file of files) {
                const key = file?.key;
                const fileDeleteFromAws = await deleteFilesFromS3(key)
                if (!fileDeleteFromAws) {
                    return res.status(404).json({ message: "Aws something went wrong" });
                }
                await fileModel.findByIdAndDelete(file._id);
            }
            await folderModel.findByIdAndDelete(folderId);
            res.status(200).json({ messages: "File deleted successfully" });

        } catch (error) {
            res.status(404).json({ message: error.message });

        }
    },
    createFolder: async (req, res) => {
        try {
            const { folderName } = req.body;
            const folder = await folderModel.findOne({ folderName })
            if (folder) {
                return res.status(404).json({ message: "Already exists" });
            }
            const saveF = await folderModel.create({ folderName })
            const redirectTo = `?type=folder&lable=child&stage=2&folderId=${saveF?._id}`
            await saveF.updateOne({
                redirectTo,
            })
            res.status(201).json({ message: "folder created successfully" });
        } catch (error) {
            res.status(404).json({ message: error.message });

        }
    },
    getFolder: async (req, res) => {
        try {
            const files = await folderModel.find({}).sort({ createdAt: -1 })
            res.status(200).json(files);

        } catch (error) {
            res.status(404).json({ message: error.message });

        }
    },
}