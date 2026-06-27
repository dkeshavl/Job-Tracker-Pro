const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");

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

// Create job
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

  db.query(
    `INSERT INTO jobs
    (id, user_id, company, position, status, salary, notes, interview_date, interview_time)
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      uuidv4(),
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
      if (err) return res.status(500).json(err);

      res.json({ message: "Job created successfully" });
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
         interview_time=?
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
      if (err) return res.status(500).json(err);

      res.json({ message: "Job updated successfully" });
    }
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
      if (err) return res.status(500).json(err);

      res.json({ message: "Status updated successfully" });
    }
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