console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS EXISTS:", !!process.env.EMAIL_PASS);

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("SMTP Connected");
  }
});

module.exports = transporter;