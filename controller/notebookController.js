const notebookModel = require("../models/notebook");
const notebookFileModel = require("../models/notebookFile")

module.exports = {
    createFile: async (req, res) => {
        try {
            const fileSize = await notebookFileModel.countDocuments()
            const { fileName } = req.body
            const files = await notebookFileModel.create({ fileName, order: fileSize + 1 })

            const notefileId = files?._id;
            const file = files?.fileName;
            const redirectTo = `notebook/${notefileId}-${file}`;

            await files.updateOne({ redirectTo })
            res.status(201).json({ message: "File created successfully", success: true })
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error })
        }
    },
    getAllFiles: async (req, res) => {
        try {
            const files = await notebookFileModel.find({}).sort({ order: 1 })
            res.status(200).json({ files, success: true })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },

    updateOrderNotebookFiles: async (req, res) => {
        try {
            const filesData = req.body;
            let order = 1;

            for (const file of filesData) {
                const data = await notebookFileModel.findByIdAndUpdate({ _id: file?._id }, {
                    $set: {
                        order: order,
                    }
                });
                order = order + 1;
            }

            res.status(200).json({ message: "successfully update order", success: true })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },
    updateNoteBookTitle: async (req, res) => {
        try {
            const { fileName } = req.body;
            const { fileId } = req.params;

            const data = await notebookFileModel.findByIdAndUpdate({ _id: fileId }, {
                $set: {
                    fileName
                }
            });

            res.status(200).json({ message: "successfully update notebook file", success: true })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },
    deleteFiles: async (req, res) => {
        try {
            const { fileId } = req.params;
            const files = await notebookFileModel.findByIdAndDelete({ _id: fileId })
            await notebookModel.findOneAndDelete({ fileId: fileId })
            res.status(200).json({ message: "file deleted successfully with content", success: true })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    },
    createNotebook: async (req, res) => {
        try {
            const { fileName: { content, fileId } } = req.body;

            const notefileId = fileId;
            const noteFile = await notebookFileModel.findOne({
                _id: notefileId,
            })
            const file = noteFile?.fileName;
            const redirectTo = `notebook/${notefileId}-${file}`;

            const updateNote = await notebookModel.findOneAndUpdate({ fileId: fileId }, {
                $set: {
                    content: content,
                    redirectTo: redirectTo,
                }
            }, {
                new: true,
                upsert: true,
            })
            res.status(201).json({ message: "notebook updated successfully", success: true })
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error })
        }
    },
    getContentNotebook: async (req, res) => {
        try {
            const { fileId } = req.params;
            const content = await notebookModel.findOne({ fileId: fileId })
            res.status(200).json({ content, success: true })
        } catch (error) {
            res.status(404).json({ message: error })
        }
    }
}