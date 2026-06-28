const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  deleteAccount,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Email verification (FIXED)
router.get("/verify-email/:token", verifyEmail);

// Resend verification email
router.post("/resend-verification", resendVerificationEmail);

// Password reset flow
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected route
router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;
