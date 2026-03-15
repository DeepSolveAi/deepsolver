const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://deepsolver:DeepSolver123@@cluster0.urpfs02.mongodb.net/deepsolver");;

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Database connected");
});

module.exports = db;