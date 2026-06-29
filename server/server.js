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

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-tracker-pro-pearl.vercel.app",
  "https://job-tracker-pro-git-main-dkeshavl.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // temporary permissive for debugging
    },
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