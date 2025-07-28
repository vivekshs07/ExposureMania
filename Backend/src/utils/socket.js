const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const users = new Map();
const onlineUsers = new Set();


const getReceiverSocketId = (receiver) => {
  const receiverSocket = Array.from(users).find((user) => user[1] === receiver);
  console.log("receiverSocket", receiverSocket);
  return receiverSocket ? receiverSocket[0] : null;
};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    console.log("User joined: ", userId);
    users.set(socket.id,userId);
    onlineUsers.add(userId);
    io.emit("onlineUsers",Array.from(onlineUsers));
    console.log("onlineUsers", onlineUsers);
    console.log("users", users);
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    const disconnectedUser = users.get(socket.id);
    console.log("disconnectedUser", disconnectedUser);
    if (disconnectedUser) {
      onlineUsers.delete(disconnectedUser);
      users.delete(socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers));
    }
    console.log("onlineUsers", onlineUsers);
    console.log("users", users);
  });
});

module.exports = { server, app, io, getReceiverSocketId };
