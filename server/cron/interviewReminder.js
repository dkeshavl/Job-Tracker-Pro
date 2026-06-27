const cron = require("node-cron");
const db = require("../config/db");
const transporter = require("../config/mail");

console.log("✅ Interview Reminder Cron Started");

// runs every minute
cron.schedule("* * * * *", async () => {
  try {
    const [jobs] = await db.promise().query(`
  SELECT
    jobs.*,
    users.name,
    users.email
  FROM jobs
  INNER JOIN users
    ON jobs.user_id = users.id
  WHERE
    jobs.status = 'Interview'
    AND jobs.interview_date IS NOT NULL
    AND TIMESTAMP(jobs.interview_date, jobs.interview_time) >= NOW() - INTERVAL 1 MINUTE
    AND (
      jobs.reminder_24h = 0
      OR jobs.reminder_1h = 0
      OR jobs.reminder_10m = 0
    )
`);

    console.log("======================================");
    console.log("Checking Interview Reminders");
    console.log("Time:", new Date().toLocaleString());
    console.log("======================================");

    for (const job of jobs) {
      const interview = new Date(job.interview_date);

      // attach time
      if (job.interview_time) {
        const [h, m, s] = job.interview_time.toString().split(":").map(Number);
        interview.setHours(h || 0, m || 0, s || 0, 0);
      }

      const diff = interview.getTime() - Date.now();
      // Skip interviews that ended more than 1 minute ago
      if (diff < -60000) {
        console.log("⛔ Interview already finished. Skipping...");
        continue;
      }

      const totalSeconds = Math.floor(diff / 1000);

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      console.log("--------------------------------");
      console.log("User   :", job.name);
      console.log("Email  :", job.email);
      console.log("Company:", job.company);
      console.log(`Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`);
      console.log("Flags  :", {
        h24: job.reminder_24h,
        h1: job.reminder_1h,
        m10: job.reminder_10m,
      });

      // -------------------- 24H REMINDER --------------------
      if (
        totalSeconds <= 86400 &&
        totalSeconds > 86340 &&
        job.reminder_24h === 0
      ) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: job.email,
          subject: `📅 Interview Tomorrow - ${job.company}`,
          html: `
            <h2>Interview Reminder</h2>
            <p>Hi ${job.name},</p>
            <p>Your interview for <b>${job.position}</b> is scheduled tomorrow.</p>
          `,
        });

        await db
          .promise()
          .query("UPDATE jobs SET reminder_24h = 1 WHERE id = ?", [job.id]);

        console.log("✅ 24h reminder sent");
      }

      // -------------------- 1H REMINDER --------------------
      if (
        totalSeconds <= 3600 &&
        totalSeconds > 3540 &&
        job.reminder_1h === 0
      ) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: job.email,
          subject: `⏰ Interview in 1 Hour - ${job.company}`,
          html: `
            <h2>Interview Reminder</h2>
            <p>Hi ${job.name},</p>
            <p>Your interview for <b>${job.position}</b> is in 1 hour.</p>
          `,
        });

        await db
          .promise()
          .query("UPDATE jobs SET reminder_1h = 1 WHERE id = ?", [job.id]);

        console.log("✅ 1h reminder sent");
      }

      // -------------------- FINAL REMINDER --------------------
      if (
        totalSeconds <= 600 &&
        totalSeconds >= -59 &&
        job.reminder_10m === 0
      ) {
        // Recalculate remaining time immediately before sending
        const latestDiff = interview.getTime() - Date.now();

        const latestTotalSeconds = Math.max(0, Math.floor(latestDiff / 1000));

        const latestMinutes = Math.floor(latestTotalSeconds / 60);
        const latestSeconds = latestTotalSeconds % 60;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: job.email,
          subject: `🚨 Your Interview Starts Soon (${job.company})`,
          html: `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">

        <h2 style="color:#dc2626;">
          🚨 Interview Starting Soon
        </h2>

        <p>Hi <b>${job.name}</b>,</p>

        <p>
          Your interview for
          <b>${job.position}</b>
          at
          <b>${job.company}</b>
          is starting soon.
        </p>

        <p style="font-size:16px;">
            ⏳ Your interview starts in
            <b>
                ${
                  latestMinutes > 0
                    ? `${latestMinutes} minute${latestMinutes !== 1 ? "s" : ""}`
                    : ""
                }
                ${latestMinutes > 0 && latestSeconds > 0 ? " and " : ""}
                ${
                  latestSeconds > 0
                    ? `${latestSeconds} second${latestSeconds !== 1 ? "s" : ""}`
                    : ""
                }
                ${latestMinutes === 0 && latestSeconds === 0 ? "a few moments" : ""}
            </b>.
        </p>

        <hr>

        <p>Please make sure:</p>

        <ul>
          <li>✅ Stable internet connection</li>
          <li>✅ Camera & microphone are working</li>
          <li>✅ Resume is ready</li>
          <li>✅ Join the meeting a few minutes early</li>
        </ul>

        <p>
          We wish you the very best for your interview.
        </p>

        <p>
          <b>— Job Tracker Pro</b>
        </p>

      </div>
    `,
        });

        await db
          .promise()
          .query("UPDATE jobs SET reminder_10m = 1 WHERE id = ?", [job.id]);

        console.log(
          `✅ Final reminder sent to ${job.email} (${latestMinutes}m ${latestSeconds}s remaining)`,
        );
        continue;
      }
    }
  } catch (err) {
    console.log("❌ Cron Error:", err.message);
  }
});
