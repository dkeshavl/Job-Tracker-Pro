require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("EMAIL:", process.env.EMAIL_FROM);
console.log("PASS EXISTS:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // Port 587 uses STARTTLS

  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Mail Error:", err);
  } else {
    console.log("✅ Mailjet SMTP Connected");
  }
});

module.exports = transporter;