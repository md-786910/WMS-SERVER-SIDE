const Issues = require("../models/Issues");

module.exports = {
  addIssues: async (req, res) => {
    try {
      const saveTask = new Issues({
        ...req.body,
      });
      const data = await saveTask.save();
      res.status(201).json({
        message: "issues added successfully",
        data: data,
        success: true,
      });
    } catch (error) {
      res.status(404).json({ message: error.message, success: false });
    }
  },
  getIssues: async (req, res) => {
    try {
      const data = await Issues.find({}).sort({ _id: -1 });
      res.status(200).json({
        message: "issues added successfully",
        data: data,
        success: true,
      });
    } catch (error) {
      res.status(404).json({ message: error.message, success: false });
    }
  },
  updateIssuesStatus: async (req, res) => {
    try {
      const data = await Issues.findByIdAndUpdate(req.body.id, {
        $set: {
          ...req.body,
          isResolved: true,
        }
      });
      res.status(201).json({
        message: "issues updated successfully",
        data: data,
        success: true,
      });
    } catch (error) {
      res.status(404).json({ message: error.message, success: false });
    }
  },
  updateIssues: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ message: "Invalid request ID" });
      }
      const data = await Issues.findByIdAndUpdate(
        id,
        {
          $set: { ...req.body },
        },
        {
          upsert: true,
          new: true,
        }
      );
      res.status(201).json({
        message: "issues updated successfully",
        data: data,
        success: true,
      });
    } catch (error) {
      res.status(404).json({ message: error.message, success: false });
    }
  },
  removeIssues: async (req, res) => {
    try {
      const { id } = req.body;
      const data = await Issues.findByIdAndDelete(id);
      res.status(200).json({
        message: "task remove successfully",
        data: data,
        success: true,
      });
    } catch (error) {
      res.status(404).json({ message: error.message, success: false });
    }
  },
  getIssuesById: async (req, res) => {
    try {
      const { id } = req.body;
      const data = await Issues.findById({ _id: id });
      res.status(200).json({ message: "", data: data, success: true });
    } catch (error) {
      res.status(404).json({ message: error.message, success: false });
    }
  },
};
