const express = require("express");
const { getVideo, postVideo } = require("../controller/videoCotroller");
const { cacheMid } = require("../utils/cache");
const router = express.Router();

router.post("/postVideo", postVideo);
router.get("/getVideo", cacheMid, getVideo);

module.exports = router;
