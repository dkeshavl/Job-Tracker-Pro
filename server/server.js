require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const mailRoutes = require("./routes/mailRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const authMiddleware = require("./middleware/authMiddleware");

require("./config/db"); // ensure DB loads
require("./cron/interviewReminder");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://job-tracker-pro-pearl.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/analytics", analyticsRoutes);

// protected test route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("Job Tracker Pro API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});