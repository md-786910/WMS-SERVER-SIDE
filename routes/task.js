const express = require("express");
const router = express.Router();
const {
  addTask,
  removeTask,
  getTask,
} = require("../controller/taskController");

router.post("/addTask", addTask);
router.get("/getTask", getTask);
router.post("/removeTask", removeTask);



module.exports = router;
