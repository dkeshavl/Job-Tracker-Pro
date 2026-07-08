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
        AND jobs.interview_datetime IS NOT NULL
        AND jobs.interview_datetime >= UTC_TIMESTAMP() - INTERVAL 1 MINUTE
        AND (
          jobs.reminder_24h = 0
          OR jobs.reminder_1h = 0
          OR jobs.reminder_10m = 0
        )
    `);

    for (const job of jobs) {
      const interview = new Date(job.interview_datetime);
      const diff = interview.getTime() - Date.now();

      if (diff < -60000) continue;

      const totalSeconds = Math.floor(diff / 1000);
      const dateLabel = interview.toLocaleDateString();
      const timeLabel = interview.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // -------------------- 24H REMINDER --------------------
      if (totalSeconds <= 86400 && totalSeconds > 86340 && job.reminder_24h === 0) {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: job.email,
          subject: `📅 Interview Tomorrow - ${job.company}`,
          html: interviewReminderTemplate(
            "📅 Interview Tomorrow",
            job.name,
            job.company,
            job.position,
            dateLabel,
            timeLabel,
            "Tomorrow",
          ),
        });

        await db.promise().query("UPDATE jobs SET reminder_24h = 1 WHERE id = ?", [job.id]);
        console.log(`✅ 24h reminder sent to ${job.email} (${job.company})`);
      }

      // -------------------- 1H REMINDER --------------------
      if (totalSeconds <= 3600 && totalSeconds > 3540 && job.reminder_1h === 0) {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: job.email,
          subject: `⏰ Interview in 1 Hour - ${job.company}`,
          html: interviewReminderTemplate(
            "⏰ Interview in 1 Hour",
            job.name,
            job.company,
            job.position,
            dateLabel,
            timeLabel,
            "1 Hour",
          ),
        });

        await db.promise().query("UPDATE jobs SET reminder_1h = 1 WHERE id = ?", [job.id]);
        console.log(`✅ 1h reminder sent to ${job.email} (${job.company})`);
      }

      // -------------------- FINAL (10 MIN) REMINDER --------------------
      if (totalSeconds <= 600 && totalSeconds >= -59 && job.reminder_10m === 0) {
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
            dateLabel,
            timeLabel,
            `${latestMinutes} minute${latestMinutes !== 1 ? "s" : ""}${
              latestSeconds > 0 ? ` ${latestSeconds} second${latestSeconds !== 1 ? "s" : ""}` : ""
            }`,
          ),
        });

        await db.promise().query("UPDATE jobs SET reminder_10m = 1 WHERE id = ?", [job.id]);
        console.log(`✅ Final reminder sent to ${job.email} (${latestMinutes}m ${latestSeconds}s remaining)`);
      }
    }
  } catch (err) {
    console.log("❌ Cron Error:", err.message);
  }
});