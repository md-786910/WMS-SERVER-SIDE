const Task = require("../models/task");
module.exports = {
    addTask: async (req, res) => {
        try {
            const { title } = req.body
            const saveTask = new Task({
                title: title
            })
            const data = await saveTask.save()
            res.status(201).json({ message: "task added successfully", data: data, success: true })
        } catch (error) {
            res.status(404).json({ message: error.message, success: false })
        }
    },
    getTask: async (req, res) => {
        try {
            const data = await Task.find({}).sort({ _id: -1 })
            res.status(200).json({ message: "task fetch successfully", data: data, success: true })
        } catch (error) {
            res.status(404).json({ message: error.message, success: false })
        }
    },
    removeTask: async (req, res) => {
        try {
            const { id } = req.body
            const data = await Task.findByIdAndDelete(id)
            res.status(200).json({ message: "task removed successfully", data: data, success: true })
        } catch (error) {
            res.status(404).json({ message: error.message, success: false })
        }
    }
}