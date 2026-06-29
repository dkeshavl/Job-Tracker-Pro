const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// optional: verify email config on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Mail Config Error:", error.message);
  } else {
    console.log("✅ Mailer is ready");
  }
});

module.exports = transporter;