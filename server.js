const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./db");

const chatRoutes = require("./chat");

const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// routes
app.use("/chat", chatRoutes);

// use Render port or default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 DeepSolver server running on port ${PORT}`);
});