const resetPasswordTemplate = (name, link) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Hello ${name}</h2>

      <p>You requested a password reset.</p>

      <p>
        Click below to reset your password:
      </p>

      <a href="${link}"
         style="padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:5px;">
        Reset Password
      </a>

      <p style="color:gray;margin-top:20px;">
        This link expires in 1 hour.
      </p>
    </div>
  `;
};

module.exports = resetPasswordTemplate;