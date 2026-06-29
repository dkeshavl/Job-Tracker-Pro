const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true only for port 465
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mail Config Error:");
    console.error(error);
  } else {
    console.log("✅ Mailer is ready");
  }
});

module.exports = transporter;