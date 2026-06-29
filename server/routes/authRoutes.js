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

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// email verification
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

// password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// protected
router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;