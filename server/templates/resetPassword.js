const { emailLayout, button } = require("./layout");

const resetPasswordTemplate = (name, link) => {
  const bodyHtml = `
    <h2 style="margin:0 0 16px; font-size:20px; color:#111827;">Reset your password</h2>
    <p style="margin:0 0 8px;">Hi ${name},</p>
    <p style="margin:0 0 8px;">We received a request to reset your Job Tracker Pro password.</p>

    ${button(link, "Reset Password")}

    <p style="margin:20px 0 0; color:#6b7280; font-size:13px;">
      This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
    </p>
  `;

  return emailLayout({
    title: "Reset your password — Job Tracker Pro",
    preheader: "Reset your Job Tracker Pro password.",
    accentColor: "#111827",
    bodyHtml,
  });
};

module.exports = resetPasswordTemplate;