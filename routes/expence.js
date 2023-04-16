const express = require('express')
const router = express.Router()
const { addMoney, getMoney } = require('../controller/expenceController');

router.post("/addMoney", addMoney);
router.get("/getMoney", getMoney);




module.exports = router