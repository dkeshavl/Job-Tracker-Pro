const verifyEmailTemplate = (name, link) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verify Your Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">

    <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:10px;">

      <h2 style="color:#2563eb;">
        Welcome to Job Tracker Pro 🎉
      </h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Thank you for registering. Please verify your email address by clicking the button below.
      </p>

      <div style="text-align:center; margin:30px 0;">
        <a
          href="${link}"
          style="
            background:#2563eb;
            color:white;
            padding:14px 24px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;
          "
        >
          Verify Email
        </a>
      </div>

      <p>
        This verification link will expire in <strong>24 hours</strong>.
      </p>

      <hr>

      <p style="color:#777;">
        If you didn't create this account, you can safely ignore this email.
      </p>

      <p>
        <strong>Job Tracker Pro Team</strong>
      </p>

    </div>

  </body>
  </html>
  `;
};

module.exports = verifyEmailTemplate;