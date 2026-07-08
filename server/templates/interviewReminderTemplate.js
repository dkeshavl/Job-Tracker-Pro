const interviewReminderTemplate = (
  name,
  company,
  position,
  interviewDate,
  interviewTime,
  title,
  message,
  color
) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:40px;background:#f4f6f9;font-family:Arial,sans-serif;">

<div style="
max-width:650px;
margin:auto;
background:white;
border-radius:12px;
overflow:hidden;
box-shadow:0 5px 18px rgba(0,0,0,.08);
">

<div style="
background:${color};
padding:30px;
text-align:center;
color:white;
">

<h1 style="margin:0;">
💼 Job Tracker Pro
</h1>

<p style="margin-top:10px;">
${title}
</p>

</div>

<div style="padding:35px;">

<h2>Hello ${name},</h2>

<p>${message}</p>

<table style="width:100%;margin-top:25px;border-collapse:collapse;">

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>Company</b></td>
<td style="padding:12px;border:1px solid #eee;">${company}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>Position</b></td>
<td style="padding:12px;border:1px solid #eee;">${position}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>Date</b></td>
<td style="padding:12px;border:1px solid #eee;">${interviewDate}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>Time</b></td>
<td style="padding:12px;border:1px solid #eee;">${interviewTime}</td>
</tr>

</table>

<h3 style="margin-top:30px;">Before your interview</h3>

<ul style="line-height:1.8;">
<li>✅ Check your internet connection</li>
<li>✅ Keep your resume ready</li>
<li>✅ Test your microphone and camera</li>
<li>✅ Join the meeting a few minutes early</li>
</ul>

<hr style="margin:35px 0;">

<p>
Good luck with your interview!
</p>

<p style="font-weight:bold;">
— Job Tracker Pro Team
</p>

</div>

</div>

</body>
</html>
`;
};

module.exports = interviewReminderTemplate;