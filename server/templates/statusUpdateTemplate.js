module.exports = (
  name,
  company,
  position,
  oldStatus,
  newStatus
) => {
  return `
  <div style="font-family:Arial,sans-serif;background:#f5f7fb;padding:30px;">
    <div style="max-width:650px;margin:auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

      <div style="background:#2563eb;padding:25px;text-align:center;">
        <h1 style="color:white;margin:0;">
          Job Tracker Pro
        </h1>
      </div>

      <div style="padding:35px;">

        <h2 style="margin-top:0;">
          📢 Job Status Updated
        </h2>

        <p>
          Hi <b>${name}</b>,
        </p>

        <p>
          Your application status has been updated.
        </p>

        <table style="width:100%;border-collapse:collapse;margin:25px 0;">
          <tr>
            <td style="padding:12px;border:1px solid #ddd;"><b>Company</b></td>
            <td style="padding:12px;border:1px solid #ddd;">${company}</td>
          </tr>

          <tr>
            <td style="padding:12px;border:1px solid #ddd;"><b>Position</b></td>
            <td style="padding:12px;border:1px solid #ddd;">${position}</td>
          </tr>

          <tr>
            <td style="padding:12px;border:1px solid #ddd;"><b>Previous Status</b></td>
            <td style="padding:12px;border:1px solid #ddd;">${oldStatus}</td>
          </tr>

          <tr>
            <td style="padding:12px;border:1px solid #ddd;"><b>Current Status</b></td>
            <td style="padding:12px;border:1px solid #ddd;font-weight:bold;color:#16a34a;">
              ${newStatus}
            </td>
          </tr>
        </table>

        <p>
          Keep tracking your applications with Job Tracker Pro.
        </p>

        <p>
          Best wishes for your career journey!
        </p>

      </div>

      <div style="background:#f3f4f6;padding:20px;text-align:center;font-size:13px;color:#666;">
        © ${new Date().getFullYear()} Job Tracker Pro
      </div>

    </div>
  </div>
  `;
};