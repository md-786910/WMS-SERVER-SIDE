const express = require('express');
const { getVideo, postVideo } = require('../controller/videoCotroller');
const router = express.Router()

router.post("/postVideo", postVideo);
router.get("/getVideo", getVideo);


module.exports = router