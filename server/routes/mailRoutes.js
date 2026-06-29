const express = require("express");
const router = express.Router();
const transporter = require("../config/mail");

router.get("/test-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM, // send to yourself
      subject: "🎉 Job Tracker Pro Test Email",
      html: `
        <h2>Email is Working!</h2>
        <p>This email was sent from <b>Job Tracker Pro</b>.</p>
        <p>If you received this, Nodemailer is configured correctly.</p>
      `,
    });

    res.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;