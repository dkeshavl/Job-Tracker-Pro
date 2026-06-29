require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("SMTP USER:", process.env.EMAIL_USER);
console.log("SMTP HOST:", process.env.EMAIL_HOST);
console.log("FROM:", process.env.EMAIL_FROM);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // 587 = STARTTLS

  auth: {
    user: process.env.EMAIL_USER, // ✅ API KEY
    pass: process.env.EMAIL_PASS, // ✅ SECRET KEY
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("❌ Mail Error:", err);
  } else {
    console.log("✅ Mailjet SMTP Connected");
  }
});

module.exports = transporter;