const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
    family: 4, // Force IPv4
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("❌ Mail Config Error:", err);
  } else {
    console.log("✅ Gmail SMTP Connected");
  }
});

module.exports = transporter;