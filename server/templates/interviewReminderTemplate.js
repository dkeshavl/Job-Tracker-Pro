const { emailLayout, infoTable } = require("./layout");

// Matches the exact call order used in cron/interviewReminder.js:
// interviewReminderTemplate(title, name, company, position, interviewDate, interviewTime, message)
const interviewReminderTemplate = (
  title,
  name,
  company,
  position,
  interviewDate,
  interviewTime,
  message,
) => {
  const bodyHtml = `
    <h2 style="margin:0 0 16px; font-size:20px; color:#4F46E5;">📅 ${title}</h2>
    <p style="margin:0 0 8px;">Hi ${name},</p>
    <p style="margin:0 0 8px;">Your interview is coming up ${message}.</p>

    ${infoTable([
      ["Company", company],
      ["Position", position],
      ["Date", interviewDate],
      ["Time", interviewTime],
    ])}

    <p style="margin:20px 0 8px; font-weight:600; color:#111827;">Before your interview:</p>
    <ul style="margin:0 0 8px; padding-left:20px; color:#374151;">
      <li style="margin-bottom:6px;">Check your internet connection</li>
      <li style="margin-bottom:6px;">Keep your resume ready</li>
      <li style="margin-bottom:6px;">Test your microphone and camera</li>
      <li>Join a few minutes early</li>
    </ul>

    <p style="margin:20px 0 0; color:#6b7280; font-size:13px;">Good luck with your interview!</p>
  `;

  return emailLayout({
    title: `${title} — Job Tracker Pro`,
    preheader: `${company} interview ${message} — ${interviewDate} at ${interviewTime}`,
    accentColor: "#4F46E5",
    bodyHtml,
  });
};

module.exports = interviewReminderTemplate;