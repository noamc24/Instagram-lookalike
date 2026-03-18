const express = require("express");
const socialController = require("../controller/socialController");

const router = express.Router();

router.get("/facebook/latest", socialController.getFacebookLatest);
router.get("/facebook/webhook", socialController.verifyFacebookWebhook);
router.post("/facebook/webhook", socialController.receiveFacebookWebhook);

module.exports = router;