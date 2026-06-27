const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getJobs,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob,
  getStats,
} = require("../controllers/jobController");

router.get("/", authMiddleware, getJobs);
router.post("/", authMiddleware, createJob);
router.put("/:id", authMiddleware, updateJob);
router.put("/:id/status", authMiddleware, updateJobStatus);
router.delete("/:id", authMiddleware, deleteJob);
router.get("/stats", authMiddleware, getStats);

module.exports = router;