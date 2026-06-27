const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const transporter = require("../config/mail");

// Get all jobs
const getJobs = (req, res) => {
  db.query(
    "SELECT * FROM jobs WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// Create job// Create job
const createJob = (req, res) => {
  const {
    company,
    position,
    status,
    salary,
    notes,
    interview_date,
    interview_time,
  } = req.body;

  const jobId = uuidv4();

  db.query(
    `INSERT INTO jobs
    (id, user_id, company, position, status, salary, notes, interview_date, interview_time)
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      jobId,
      req.user.id,
      company,
      position,
      status || "Applied",
      salary,
      notes,
      interview_date || null,
      interview_time || null,
    ],
    async (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      try {
        // Get user's name and email
        const [users] = await db.promise().query(
          "SELECT name, email FROM users WHERE id = ?",
          [req.user.id]
        );

        if (users.length > 0) {
          const user = users[0];

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "✅ Job Application Added Successfully",
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">

                <h2 style="color:#2563eb;">Job Tracker Pro</h2>

                <p>Hi <b>${user.name}</b>,</p>

                <p>Your job application has been successfully added.</p>

                <table style="border-collapse:collapse;width:100%">
                  <tr>
                    <td><b>Company</b></td>
                    <td>${company}</td>
                  </tr>

                  <tr>
                    <td><b>Position</b></td>
                    <td>${position}</td>
                  </tr>

                  <tr>
                    <td><b>Status</b></td>
                    <td>${status || "Applied"}</td>
                  </tr>
                </table>

                <br>

                <p>
                  We'll help you organize your applications throughout your job search.
                </p>

                <p>
                  If this application later moves to the <b>Interview</b> stage and you add an interview date and time,
                  Job Tracker Pro will automatically send reminder emails before your interview.
                </p>

                <hr>

                <p>
                  Thank you for using <b>Job Tracker Pro</b>.
                </p>

                <p>
                  We wish you the very best in your job search! 🚀
                </p>

              </div>
            `,
          });

          console.log("✅ Applied email sent to", user.email);
        }
      } catch (mailErr) {
        console.log("Email Error:", mailErr.message);
      }

      res.json({
        message: "Job created successfully",
      });
    }
  );
};

// Update job
const updateJob = (req, res) => {
  const { id } = req.params;

  const {
    company,
    position,
    status,
    salary,
    notes,
    interview_date,
    interview_time,
  } = req.body;

  db.query(
    `UPDATE jobs
     SET company=?,
         position=?,
         status=?,
         salary=?,
         notes=?,
         interview_date=?,
         interview_time=?,
         reminder_24h=0,
         reminder_1h=0,
         reminder_10m=0
     WHERE id=? AND user_id=?`,
    [
      company,
      position,
      status,
      salary,
      notes,
      interview_date || null,
      interview_time || null,
      id,
      req.user.id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Job updated successfully",
      });
    }
  );
};

// Update only status (Kanban)
// Update only status (Kanban)
const updateJobStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Update status
    await db.promise().query(
      "UPDATE jobs SET status=? WHERE id=? AND user_id=?",
      [status, id, req.user.id]
    );

    // Get job + user details
    const [rows] = await db.promise().query(
      `
      SELECT
        jobs.company,
        jobs.position,
        jobs.interview_date,
        jobs.interview_time,
        users.name,
        users.email
      FROM jobs
      JOIN users ON jobs.user_id = users.id
      WHERE jobs.id = ? AND jobs.user_id = ?
      `,
      [id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Job not found." });
    }

    const job = rows[0];

    let subject = "";
    let html = "";

    switch (status) {
      case "Interview":
        subject = `📅 Interview Status Updated`;

        html = `
          <h2>Interview Scheduled</h2>

          <p>Hi <b>${job.name}</b>,</p>

          <p>Your application has moved to the <b>Interview</b> stage.</p>

          <p><b>Company:</b> ${job.company}</p>
          <p><b>Position:</b> ${job.position}</p>

          <p>
            If you've added an interview date and time,
            Job Tracker Pro will automatically remind you:
          </p>

          <ul>
            <li>📅 1 day before</li>
            <li>⏰ 1 hour before</li>
            <li>🚨 Final reminder (under 10 minutes)</li>
          </ul>

          <p>Good luck with your interview! 🎉</p>
        `;
        break;

      case "Offer":
        subject = `🎉 Congratulations!`;

        html = `
          <h2>Congratulations!</h2>

          <p>Hi <b>${job.name}</b>,</p>

          <p>Your application has been updated to <b>Offer</b>.</p>

          <p><b>Company:</b> ${job.company}</p>
          <p><b>Position:</b> ${job.position}</p>

          <p>
            We hope this opportunity leads to an exciting new chapter in your career.
          </p>

          <p>
            Thank you for choosing Job Tracker Pro.
          </p>

          <h3>🎉 Best wishes for your future!</h3>
        `;
        break;

      case "Rejected":
        subject = `💙 Keep Going`;

        html = `
          <h2>Application Status Updated</h2>

          <p>Hi <b>${job.name}</b>,</p>

          <p>Your application has been updated to <b>Rejected</b>.</p>

          <p><b>Company:</b> ${job.company}</p>
          <p><b>Position:</b> ${job.position}</p>

          <p>
            Every application is another step toward the right opportunity.
          </p>

          <p>
            Keep learning.
            Keep applying.
            Don't give up.
          </p>

          <p>
            Job Tracker Pro will continue helping you throughout your job search.
          </p>
        `;
        break;

      default:
        return res.json({
          message: "Status updated successfully",
        });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: job.email,
      subject,
      html,
    });

    console.log(`✅ ${status} email sent`);

    res.json({
      message: "Status updated successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// Delete job
const deleteJob = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM jobs WHERE id=? AND user_id=?",
    [id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Job deleted successfully" });
    }
  );
};

// Dashboard stats
const getStats = (req, res) => {
  db.query(
    `
    SELECT
      COUNT(*) AS total,

      SUM(CASE WHEN status = 'Applied' THEN 1 ELSE 0 END) AS applied,
      SUM(CASE WHEN status = 'Interview' THEN 1 ELSE 0 END) AS interview,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejected,
      SUM(CASE WHEN status = 'Offer' THEN 1 ELSE 0 END) AS offer_count

    FROM jobs
    WHERE user_id = ?
    `,
    [req.user.id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      const row = results[0];

      res.json({
        total: row.total || 0,
        applied: row.applied || 0,
        interview: row.interview || 0,
        rejected: row.rejected || 0,
        offer_count: row.offer_count || 0,
      });
    }
  );
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  updateJobStatus,
  deleteJob,
  getStats,
};