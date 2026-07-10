const { emailLayout, infoTable } = require("./layout");

module.exports = (name, company, position) => {
  const bodyHtml = `
    <h2 style="margin:0 0 16px; font-size:20px; color:#111827;">🗑️ Job Deleted</h2>
    <p style="margin:0 0 8px;">Hi ${name},</p>
    <p style="margin:0 0 8px;">A job application has been removed from your Job Tracker Pro account:</p>

    ${infoTable([
      ["Company", company],
      ["Position", position],
      [
        "Deleted On",
        new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      ],
    ])}

    <p style="margin:20px 0 0; color:#6b7280; font-size:13px;">
      This action cannot be undone. If you deleted this by mistake, you'll need to add the job again.
    </p>
  `;

  return emailLayout({
    title: "Job deleted — Job Tracker Pro",
    preheader: `${company} — ${position} removed from your tracker`,
    accentColor: "#dc2626",
    bodyHtml,
  });
};