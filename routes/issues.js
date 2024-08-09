const express = require("express");
const {
  addIssues,
  updateIssues,
  removeIssues,
  getIssues,
  getIssuesById,
  updateIssuesStatus,
} = require("../controller/issuesController");
const router = express.Router();

router.post("/addIssues", addIssues);
router.get("/getIssues", getIssues);
router.post("/getIssuesById", getIssuesById);

router.patch("/updateIssues", updateIssuesStatus);

// For issues
router.patch("/update-issues/:id", updateIssues);
router.post("/removeIssues", removeIssues);

module.exports = router;
