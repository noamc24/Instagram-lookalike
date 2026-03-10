const express = require("express");
const router = express.Router();

const {
  getUserConversations,
  getMessages,
  sendMessage,
  createGroup
} = require("../controller/messageController");


router.get("/conversations/:username", getUserConversations);

router.get("/:conversationId", getMessages);

router.post("/send", sendMessage);

router.post("/create-group", createGroup);

module.exports = router;