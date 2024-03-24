const mongoose = require("mongoose");
const messageSchema = require("../schema/MessageSchema");

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
