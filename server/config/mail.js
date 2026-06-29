require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "in-v3.mailjet.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // STARTTLS

  auth: {
    user: process.env.EMAIL_USER, // Mailjet API Key
    pass: process.env.EMAIL_PASS, // Mailjet Secret Key
  },

  tls: {
    rejectUnauthorized: false,
  },
});

// Verify SMTP connection when the server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailjet SMTP Connection Failed");
    console.error(error);
  } else {
    console.log("✅ Mailjet SMTP Connected Successfully");
    console.log("📧 Sender:", process.env.EMAIL_FROM);
  }
});

module.exports = transporter;