const { emailLayout, infoTable } = require("./layout");

module.exports = (name, company, position, status, salary) => {
  const bodyHtml = `
    <h2 style="margin:0 0 16px; font-size:20px; color:#111827;">💼 Job Added Successfully</h2>
    <p style="margin:0 0 8px;">Hi ${name},</p>
    <p style="margin:0 0 8px;">Your new job application has been saved in Job Tracker Pro:</p>

    ${infoTable([
      ["Company", company],
      ["Position", position],
      ["Status", status],
      ["Salary", salary || "Not specified"],
    ])}

    <p style="margin:20px 0 0; color:#6b7280; font-size:13px;">
      We'll keep tracking this application and send reminders whenever needed.
    </p>
  `;

  return emailLayout({
    title: "Job added — Job Tracker Pro",
    preheader: `${company} — ${position} added to your tracker`,
    accentColor: "#2563eb",
    bodyHtml,
  });
};