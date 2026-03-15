const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./db");   // connect database

const chatRoutes = require("./chat");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
// chat route
app.use("/chat", chatRoutes);

app.listen(3000, () => {
  console.log("DeepSolver server running on port 3000");
});