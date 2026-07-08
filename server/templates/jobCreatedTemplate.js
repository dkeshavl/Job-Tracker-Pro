module.exports = (
  name,
  company,
  position,
  status,
  salary
) => {
  return `
  <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

    <div style="background:#2563eb;padding:20px;text-align:center;">
      <h1 style="color:#fff;margin:0;">
        💼 Job Added Successfully
      </h1>
    </div>

    <div style="padding:30px;">

      <h2>Hello ${name},</h2>

      <p>
        Your new job application has been saved successfully in
        <b>Job Tracker Pro</b>.
      </p>

      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        <tr>
          <td style="padding:10px;"><b>Company</b></td>
          <td>${company}</td>
        </tr>

        <tr style="background:#f9fafb;">
          <td style="padding:10px;"><b>Position</b></td>
          <td>${position}</td>
        </tr>

        <tr>
          <td style="padding:10px;"><b>Status</b></td>
          <td>${status}</td>
        </tr>

        <tr style="background:#f9fafb;">
          <td style="padding:10px;"><b>Salary</b></td>
          <td>${salary || "Not specified"}</td>
        </tr>
      </table>

      <br>

      <p>
        We'll continue helping you track this application and send reminders whenever required.
      </p>

      <hr>

      <p style="text-align:center;color:#6b7280;">
        🚀 Job Tracker Pro
      </p>

    </div>

  </div>
  `;
};