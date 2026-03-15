const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://deepsolver:Deepsolver123@%40@cluster0.urpfs02.mongodb.net/deepsolver?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("✅ Database connected successfully");
});

module.exports = db;