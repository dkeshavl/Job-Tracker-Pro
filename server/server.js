require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const mailRoutes = require("./routes/mailRoutes");
require("./cron/interviewReminder");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/mail", mailRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});