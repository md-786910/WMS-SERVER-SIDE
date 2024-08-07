const express = require("express");
const router = express.Router();
const {
  addCompany,
  addCompanyTask,
  getCompany,
  getCompanyTask,
  deleteCompany,
  completeTask,
  getCompanyById,
  updateCompany,
} = require("../controller/compantController");

// -------For Company

router.post("/addCompany", addCompany);
router.get("/getCompany", getCompany);
router.post("/removeCompany", deleteCompany);
router.post("/getCompanyById", getCompanyById);
router.post("/updateCompany", updateCompany);

// -----for company task

router.post("/addCompanyTask", addCompanyTask);
router.post("/completeTask", completeTask);
router.get("/getCompanyTask", getCompanyTask);

module.exports = router;
