const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  deleteAccount,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;                  