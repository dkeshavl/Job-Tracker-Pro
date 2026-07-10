const BRAND_NAME = "Job Tracker Pro";
const BRAND_DARK = "#111827";

/**
 * Bulletproof table-based email shell. Uses explicit <table width="600">
 * instead of CSS max-width on a div, because Outlook's rendering engine
 * (Word) ignores max-width entirely — this is why prior templates
 * rendered at inconsistent widths across clients.
 */
function emailLayout({ title = BRAND_NAME, preheader = "", accentColor = BRAND_DARK, bodyHtml, footerNote }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f5f7; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${preheader}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#ffffff; border-radius:12px; overflow:hidden; max-width:600px;">

          <tr>
            <td style="background-color:${accentColor}; padding:22px 32px;">
              <span style="color:#ffffff; font-size:18px; font-weight:700;">🚀 ${BRAND_NAME}</span>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 32px; color:#1f2937; font-size:15px; line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>

          <tr>
            <td style="background-color:#f9fafb; padding:20px 32px; border-top:1px solid #e5e7eb;">
              <p style="margin:0; color:#9ca3af; font-size:12px; line-height:1.5;">
                ${footerNote || `You're receiving this email because you have an account with ${BRAND_NAME}.`}
              </p>
              <p style="margin:8px 0 0; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(link, label, color = "#4F46E5") {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
    <tr>
      <td style="border-radius:8px; background-color:${color};">
        <a href="${link}" target="_blank"
           style="display:inline-block; padding:13px 28px; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; border-radius:8px;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;
}

/** rows: array of [label, value, valueColor?] */
function infoTable(rows) {
  const trs = rows
    .map(
      ([label, value, color = "#111827"]) => `
        <tr>
          <td style="padding:12px; border:1px solid #e5e7eb; background:#f9fafb; font-size:13px; color:#6b7280; width:38%;"><b>${label}</b></td>
          <td style="padding:12px; border:1px solid #e5e7eb; font-size:14px; font-weight:600; color:${color};">${value}</td>
        </tr>`,
    )
    .join("");

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; margin:20px 0;">
    ${trs}
  </table>`;
}

module.exports = { emailLayout, button, infoTable, BRAND_NAME };