module.exports = (name, company, position) => {
  return `
  <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

    <div style="background:#dc2626;padding:20px;text-align:center;">
      <h1 style="color:#fff;margin:0;">
        🗑️ Job Deleted
      </h1>
    </div>

    <div style="padding:30px;">

      <h2>Hello ${name},</h2>

      <p>
        A job application has been removed from your
        <b>Job Tracker Pro</b> account.
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
          <td style="padding:10px;"><b>Deleted On</b></td>
          <td>${new Date().toLocaleString()}</td>
        </tr>

      </table>

      <br>

      <p>
        This action cannot be undone. If you deleted this by mistake,
        you'll need to add the job again.
      </p>

      <hr>

      <p style="text-align:center;color:#6b7280;">
        🚀 Job Tracker Pro
      </p>

    </div>

  </div>
  `;
};