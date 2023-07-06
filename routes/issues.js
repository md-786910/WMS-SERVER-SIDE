const express = require("express");
const {
  addIssues,
  updateIssues,
  removeIssues,
  getIssues,
  getIssuesById,
} = require("../controller/issuesController");
const { cacheMid } = require("../utils/cache");
const router = express.Router();

router.post("/addIssues", addIssues);
router.get("/getIssues", cacheMid, getIssues);
router.post("/getIssuesById", getIssuesById);

router.patch("/updateIssues", updateIssues);
router.post("/removeIssues", removeIssues);

module.exports = router;
