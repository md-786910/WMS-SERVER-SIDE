const express = require("express");
const router = express.Router();
const {
  addTask,
  removeTask,
  getTask,
} = require("../controller/taskController");
const { cacheMid } = require("../utils/cache");

router.post("/addTask", addTask);
router.get("/getTask", cacheMid, getTask);
router.post("/removeTask", removeTask);

router.get("/task", cacheMid, (req, res, next) => {
  res.send("hi");
});

module.exports = router;
