const interview10mTemplate = (
  name,
  company,
  position,
  interviewDate,
  interviewTime,
  remainingTime
) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Interview Starting Soon</title>
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
background:#dc2626;
padding:30px;
text-align:center;
color:white;
">

<h1 style="margin:0;">
🚨 Interview Starting Soon
</h1>

<p style="margin-top:10px;">
Job Tracker Pro
</p>

</div>

<div style="padding:35px;">

<h2>Hello ${name},</h2>

<p>
Your interview is about to begin.
</p>

<table style="width:100%;margin-top:25px;border-collapse:collapse;">

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>🏢 Company</b></td>
<td style="padding:12px;border:1px solid #eee;">${company}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>💼 Position</b></td>
<td style="padding:12px;border:1px solid #eee;">${position}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>📅 Date</b></td>
<td style="padding:12px;border:1px solid #eee;">${interviewDate}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>🕒 Time</b></td>
<td style="padding:12px;border:1px solid #eee;">${interviewTime}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #eee;"><b>⏳ Starts In</b></td>
<td style="padding:12px;border:1px solid #eee;">${remainingTime}</td>
</tr>

</table>

<h3 style="margin-top:30px;">Final Checklist</h3>

<ul style="line-height:1.8;">
<li>✅ Join the meeting 5–10 minutes early</li>
<li>✅ Keep your resume ready</li>
<li>✅ Check your camera and microphone</li>
<li>✅ Ensure a stable internet connection</li>
<li>✅ Keep a glass of water nearby</li>
</ul>

<div style="
margin-top:30px;
padding:18px;
background:#fef2f2;
border-left:5px solid #dc2626;
border-radius:8px;
">

<b>Best of luck!</b><br>
Stay confident and do your best. You've got this! 🚀

</div>

<hr style="margin:35px 0;">

<p style="color:#666;">
This is an automated reminder from Job Tracker Pro.
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

module.exports = interview10mTemplate;