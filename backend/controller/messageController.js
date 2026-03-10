const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");


// GET conversations for user
const getUserConversations = async (req, res) => {
  try {

    const { username } = req.params;

    const conversations = await Conversation.find({
      participants: username
    });

    res.json({
      success: true,
      conversations
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


// GET messages
const getMessages = async (req, res) => {
  try {

    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      messages
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};


// SEND message
const sendMessage = async (req, res) => {
  try {

    const { conversationId, sender, text } = req.body;

    const message = new Message({
      conversationId,
      sender,
      text
    });

    await message.save();

    res.json({
      success: true,
      message
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};


// CREATE GROUP
const createGroup = async (req, res) => {
  try {

    const { name, members } = req.body;

    const conversation = new Conversation({
      participants: members,
      isGroup: true,
      groupName: name
    });

    await conversation.save();

    res.json({
      success: true,
      conversation
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  getUserConversations,
  getMessages,
  sendMessage,
  createGroup
};