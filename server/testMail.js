require("dotenv").config();
const transporter = require("./config/mail");

(async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "forever.pqr456@gmail.com", // Replace with your email
      subject: "Mailjet SMTP Test",
      text: "This is a test email from Mailjet.",
    });

    console.log("✅ Email sent!");
    console.log(info);
  } catch (err) {
    console.error("❌ Failed to send email:");
    console.error(err);
  }
})();