const cron = require("node-cron");
const db = require("../config/db");
const transporter = require("../config/mail");

const interviewReminderTemplate = require("../templates/interviewReminderTemplate");
const interview10mTemplate = require("../templates/interview10mTemplate");

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

for (const job of jobs) {
  const interview = new Date(job.interview_date);

  // attach time
  if (job.interview_time) {
    const [h, m, s] = job.interview_time.toString().split(":").map(Number);
    interview.setHours(h || 0, m || 0, s || 0, 0);
  }

  // ===== DEBUG =====
  console.log("================================");
  console.log("DB Date:", job.interview_date);
  console.log("DB Time:", job.interview_time);
  console.log("Interview Object:", interview);
  console.log("Interview ISO:", interview.toISOString());
  console.log("Now:", new Date());
  console.log("Now ISO:", new Date().toISOString());
  console.log("================================");

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
          from: process.env.EMAIL_FROM,
          to: job.email,
          subject: `📅 Interview Tomorrow - ${job.company}`,
          html: interviewReminderTemplate(
            "📅 Interview Tomorrow",
            job.name,
            job.company,
            job.position,
            new Date(job.interview_date).toLocaleDateString(),
            job.interview_time,
            "Tomorrow"
          ),
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
          from: process.env.EMAIL_FROM,
          to: job.email,
          subject: `⏰ Interview in 1 Hour - ${job.company}`,
          html: interviewReminderTemplate(
            "⏰ Interview in 1 Hour",
            job.name,
            job.company,
            job.position,
            new Date(job.interview_date).toLocaleDateString(),
            job.interview_time,
            "1 Hour"
          ),
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
          from: process.env.EMAIL_FROM,
          to: job.email,
          subject: `🚨 Your Interview Starts Soon (${job.company})`,
          html: interview10mTemplate(
            job.name,
            job.company,
            job.position,
            new Date(job.interview_date).toLocaleDateString(),
            job.interview_time,
            `${latestMinutes} minute${latestMinutes !== 1 ? "s" : ""}${
              latestSeconds > 0
                ? ` ${latestSeconds} second${latestSeconds !== 1 ? "s" : ""}`
                : ""
            }`
          ),
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
