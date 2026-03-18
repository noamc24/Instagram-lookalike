const express = require("express");
const statsController = require("../controller/statsController");

const router = express.Router();

router.get("/posts-per-day", statsController.postsPerDay);
router.get("/media-type", statsController.mediaTypeDistribution);
router.get("/likes-avg-per-day", statsController.likesAvgPerDay);

module.exports = router;