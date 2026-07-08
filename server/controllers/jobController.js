const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const transporter = require("../config/mail");
const statusUpdateTemplate = require("../templates/statusUpdateTemplate");
const jobCreatedTemplate = require("../templates/jobCreatedTemplate");
const deleteJobTemplate = require("../templates/deleteJobTemplate");

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

// Create job
const createJob = (req, res) => {
  const {
    company,
    position,
    status,
    salary,
    notes,
    interview_datetime, // ✅ Changed: now a single UTC ISO string
  } = req.body;

  const jobId = uuidv4();

  db.query(
    `INSERT INTO jobs 
    (id, user_id, company, position, status, salary, notes, interview_datetime)
    VALUES (?,?,?,?,?,?,?,?)`,
    [
      jobId,
      req.user.id,
      company,
      position,
      status || "Applied",
      salary || null,
      notes || null,
      interview_datetime || null, // ✅ MySQL stores as DATETIME in UTC
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
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: `🎉 New Job Added - ${company}`,
                html: jobCreatedTemplate(
                  user.name,
                  company,
                  position,
                  status || "Applied",
                  salary
                ),
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
    interview_datetime, // ✅ Changed: now a single UTC ISO string
  } = req.body;

  db.query(
    `UPDATE jobs
     SET company=?,
         position=?,
         status=?,
         salary=?,
         notes=?,
         interview_datetime=?,
         reminder_24h=0,
         reminder_1h=0,
         reminder_10m=0
     WHERE id=? AND user_id=?`,
    [
      company,
      position,
      status,
      salary || null,
      notes || null,
      interview_datetime || null, // ✅ UTC datetime
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

  // Get current status first
  db.query(
    "SELECT status FROM jobs WHERE id=? AND user_id=?",
    [id, req.user.id],
    (err0, oldRows) => {
      if (err0 || !oldRows.length) {
        return res.status(404).json({
          message: "Job not found",
        });
      }

      const oldStatus = oldRows[0].status;

      // Update status
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

          // Get user & job details
          db.query(
            `SELECT jobs.company, jobs.position, users.name, users.email
             FROM jobs
             JOIN users ON jobs.user_id = users.id
             WHERE jobs.id = ? AND jobs.user_id = ?`,
            [id, req.user.id],
            (err2, rows) => {
              if (err2 || !rows.length) {
                return res.json({
                  message: "Status updated successfully",
                });
              }

              const job = rows[0];

              let subject = "📢 Job Status Updated";

              if (status === "Interview") {
                subject = "📅 Interview Scheduled";
              } else if (status === "Offer") {
                subject = "🎉 Congratulations! Offer Received";
              } else if (status === "Rejected") {
                subject = "📌 Application Update";
              }

              transporter.sendMail(
                {
                  from: process.env.EMAIL_FROM,
                  to: job.email,
                  subject,
                  html: statusUpdateTemplate(
                    job.name,
                    job.company,
                    job.position,
                    oldStatus,
                    status
                  ),
                },
                (err3) => {
                  if (err3) {
                    console.log("EMAIL ERROR:", err3.message);
                  }
                }
              );

              return res.json({
                message: "Status updated successfully",
              });
            }
          );
        }
      );
    }
  );
};

// Delete job
const deleteJob = (req, res) => {
  const { id } = req.params;

  // Get job & user details first
  db.query(
    `SELECT jobs.company, jobs.position, users.name, users.email
     FROM jobs
     JOIN users ON jobs.user_id = users.id
     WHERE jobs.id = ? AND jobs.user_id = ?`,
    [id, req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!rows.length) {
        return res.status(404).json({
          message: "Job not found",
        });
      }

      const job = rows[0];

      // Delete the job
      db.query(
        "DELETE FROM jobs WHERE id=? AND user_id=?",
        [id, req.user.id],
        (deleteErr) => {
          if (deleteErr) {
            return res.status(500).json(deleteErr);
          }

          // Respond immediately
          res.json({
            message: "Job deleted successfully",
          });

          // Send email in background
          transporter.sendMail(
            {
              from: process.env.EMAIL_FROM,
              to: job.email,
              subject: `🗑️ Job Deleted - ${job.company}`,
              html: deleteJobTemplate(job.name, job.company, job.position),
            },
            (mailErr) => {
              if (mailErr) {
                console.log("EMAIL ERROR:", mailErr.message);
              }
            }
          );
        }
      );
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
