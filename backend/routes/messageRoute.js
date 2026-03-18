const express = require("express");
const {
  getUserConversations,
  getMessages,
  sendMessage,
  createGroup,
} = require("../controller/messageController");

const router = express.Router();

router.get("/conversations/:username", getUserConversations);
router.get("/:conversationId", getMessages);
router.post("/send", sendMessage);
router.post("/create-group", createGroup);

module.exports = router;