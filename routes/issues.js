const express = require("express");
const {
  addIssues,
  updateIssues,
  removeIssues,
  getIssues,
  getIssuesById,
  updateIssuesStatus,
  permanentDelete,
} = require("../controller/issuesController");
const router = express.Router();

router.post("/addIssues", addIssues);
router.get("/getIssues", getIssues);
router.post("/getIssuesById", getIssuesById);

// update issues
router.patch("/updateIssues/status/:id", updateIssuesStatus);

// For issues
router.patch("/update-issues/:id", updateIssues);
router.delete("/removeIssues/:id", removeIssues);

router.delete("/permanent-delete/:id", permanentDelete);

module.exports = router;
