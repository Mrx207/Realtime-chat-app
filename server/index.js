const express = require("express");

const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Message = require("./models/MessageModel");
require("dotenv").config();
app.use(cors());
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const server = http.createServer(app);

// MongoDB connection
mongoose
  .connect(URI, {
    dbName: "Chat",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err, "error");
  });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];

const handleLast100Messages = async (socket, room) => {
  try {
    // Fetch the last 100 messages for the specified room from the database
    const last100Messages = await Message.find({ room })
      .sort({ createdAt: -1 })
      .limit(100);

    // Emit the last 100 messages to the client
    socket.emit("last_100_messages", JSON.stringify(last100Messages));
  } catch (error) {
    console.error("Error fetching last 100 messages:", error);
  }
};

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // Send welcome msg to user that just joined chat only
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // Save the new user to the room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    handleLast100Messages(socket, room);
  });

  Message.find()
    .then((messages) => {
      socket.emit("receive_message", messages);
    })
    .catch((error) => {
      console.error("Error sending messages:", error);
    });

  socket.on("send_message", (messageData) => {
    const { username, room, message } = messageData;
    const newMessage = new Message({ username, room, message });

    io.in(room).emit("receive_message", messageData);
    // Save the message to MongoDB
    newMessage
      .save()
      .then((savedMessage) => {
        // Emit the new message to all clients
        io.emit("newMessage", savedMessage);
      })
      .catch((error) => {
        console.error("Error saving message:", error);
      });
  });
});

server.listen(4000, () => "sever is running");
