const { emailLayout, button } = require("./layout");

const verifyEmailTemplate = (name, link) => {
  const bodyHtml = `
    <h2 style="margin:0 0 16px; font-size:20px; color:#111827;">Welcome, ${name} 👋</h2>
    <p style="margin:0 0 8px;">Thanks for signing up for Job Tracker Pro.</p>
    <p style="margin:0 0 8px;">Please confirm your email address to activate your account.</p>

    ${button(link, "Verify Email Address")}

    <p style="margin:20px 0 0; color:#6b7280; font-size:13px;">
      This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.
    </p>
  `;

  return emailLayout({
    title: "Verify your email — Job Tracker Pro",
    preheader: "Confirm your email to activate your Job Tracker Pro account.",
    accentColor: "#111827",
    bodyHtml,
  });
};

module.exports = verifyEmailTemplate;