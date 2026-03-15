const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userMessage: String,
  aiMessage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Chat", chatSchema);