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
    },
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
    (err) => {
      if (err) {
        console.error("CREATE JOB ERROR:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }

      // ✅ SEND RESPONSE FIRST (IMPORTANT)
      res.status(201).json({
        message: "Job created successfully",
      });

      // ✅ EMAIL IN BACKGROUND (NO await, NO blocking)
      process.nextTick(() => {
        db.query(
          "SELECT name, email FROM users WHERE id = ?",
          [req.user.id],
          (err2, users) => {
            if (err2 || !users.length) return;

            const user = users[0];

            transporter.sendMail(
              {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Job Added Successfully",
                html: `<h2>Hi ${user.name}</h2>
                       <p>Job added: <b>${company}</b> - ${position}</p>`,
              },
              (mailErr) => {
                if (mailErr) {
                  console.log("EMAIL ERROR:", mailErr.message);
                }
              },
            );
          },
        );
      });
    },
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
    },
  );
};

// Update only status (Kanban)
const updateJobStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE jobs SET status=? WHERE id=? AND user_id=?",
    [status, id, req.user.id],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }

      db.query(
        `SELECT jobs.company, jobs.position, users.name, users.email
         FROM jobs
         JOIN users ON jobs.user_id = users.id
         WHERE jobs.id = ? AND jobs.user_id = ?`,
        [id, req.user.id],
        (err2, rows) => {
          if (err2 || !rows.length) {
            return res.json({ message: "Status updated" });
          }

          const job = rows[0];

          let subject = "Job Status Updated";
          let html = `<p>${job.name}, status changed to ${status}</p>`;

          if (status === "Interview") {
            subject = "Interview Scheduled";
          } else if (status === "Offer") {
            subject = "🎉 Offer Received";
          } else if (status === "Rejected") {
            subject = "Application Update";
          }

          transporter.sendMail(
            {
              from: process.env.EMAIL_USER,
              to: job.email,
              subject,
              html,
            },
            (err3) => {
              if (err3) console.log("EMAIL ERROR:", err3.message);
            },
          );

          return res.json({
            message: "Status updated successfully",
          });
        },
      );
    },
  );
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
    },
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
    },
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
