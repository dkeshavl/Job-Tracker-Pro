const { emailLayout, infoTable } = require("./layout");

const interview10mTemplate = (
  name,
  company,
  position,
  interviewDate,
  interviewTime,
  remainingTime,
) => {
  const bodyHtml = `
    <h2 style="margin:0 0 16px; font-size:20px; color:#dc2626;">🚨 Interview Starting Soon</h2>
    <p style="margin:0 0 8px;">Hi ${name},</p>
    <p style="margin:0 0 8px;">Your interview is about to begin.</p>

    ${infoTable([
      ["Company", company],
      ["Position", position],
      ["Date", interviewDate],
      ["Time", interviewTime],
      ["Starts In", remainingTime, "#dc2626"],
    ])}

    <p style="margin:20px 0 8px; font-weight:600; color:#111827;">Final checklist:</p>
    <ul style="margin:0 0 8px; padding-left:20px; color:#374151;">
      <li style="margin-bottom:6px;">Join the meeting 5–10 minutes early</li>
      <li style="margin-bottom:6px;">Keep your resume ready</li>
      <li style="margin-bottom:6px;">Check your camera and microphone</li>
      <li>Ensure a stable internet connection</li>
    </ul>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;">
      <tr>
        <td style="padding:16px 18px; background:#fef2f2; border-left:4px solid #dc2626; border-radius:6px;">
          <b style="color:#111827;">Best of luck!</b><br />
          <span style="color:#374151;">Stay confident and do your best. You've got this! 🚀</span>
        </td>
      </tr>
    </table>
  `;

  return emailLayout({
    title: "Interview Starting Soon — Job Tracker Pro",
    preheader: `${company} interview starts in ${remainingTime}`,
    accentColor: "#dc2626",
    bodyHtml,
  });
};

module.exports = interview10mTemplate;