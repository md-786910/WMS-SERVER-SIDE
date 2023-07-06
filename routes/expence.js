const express = require("express");
const router = express.Router();
const { addMoney, getMoney } = require("../controller/expenceController");
const { cacheMid } = require("../utils/cache");

router.post("/addMoney", addMoney);
router.get("/getMoney", cacheMid, getMoney);

module.exports = router;
