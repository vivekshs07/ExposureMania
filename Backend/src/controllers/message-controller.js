const Chat = require("../models/Chat.model.js");
const Message = require("../models/Message.model.js");
const { io, getReceiverSocketId } = require("../utils/socket");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiver } = req.params;
    const sender = req.user;
    let chat = await Chat.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [sender, receiver],
      });
    }

    const newMessage = new Message({
      sender,
      receiver,
      message,
    });

    await newMessage.save();

    chat.messages.push(newMessage._id);
    await chat.save();
    const receiverSocketId = getReceiverSocketId(receiver);
    console.log("receiverSocketId", receiverSocketId);
    io.to(receiverSocketId).emit("private message",{newMessage});
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user;

    const chat = await Chat.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Populate actual messages, not just references

    if (!chat) return res.status(200).json([]);

    const messages = chat.messages;

    res.status(200).json({ messages ,chatId:chat._id.toString()});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendMessage, getMessages };
