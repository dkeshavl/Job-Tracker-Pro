const db = require("../config/db");

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // ============================
    // Overall Statistics
    // ============================

    const [stats] = await db.promise().query(
      `
      SELECT

      COUNT(*) total,

      SUM(CASE WHEN status='Applied' THEN 1 ELSE 0 END) applied,

      SUM(CASE WHEN status='Interview' THEN 1 ELSE 0 END) interview,

      SUM(CASE WHEN status='Offer' THEN 1 ELSE 0 END) offer_count,

      SUM(CASE WHEN status='Rejected' THEN 1 ELSE 0 END) rejected

      FROM jobs

      WHERE user_id=?
      `,
      [userId],
    );

    // ============================
    // Monthly Applications
    // ============================

    const [monthly] = await db.promise().query(
      `
        SELECT
            YEAR(created_at) AS year,
            MONTH(created_at) AS monthNumber,
            DATE_FORMAT(created_at, '%b') AS month,
            COUNT(*) AS count
        FROM jobs
        WHERE user_id = ?
        GROUP BY
            YEAR(created_at),
            MONTH(created_at),
            DATE_FORMAT(created_at, '%b')
        ORDER BY
            YEAR(created_at),
            MONTH(created_at)
  `,
      [userId],
    );
    // ============================
    // Upcoming Interviews
    // ============================

    const [upcoming] = await db.promise().query(
      `
        SELECT
            company,
            position,
            interview_datetime
        FROM jobs
        WHERE
            user_id = ?
            AND status = 'Interview'
            AND interview_datetime >= UTC_TIMESTAMP()
        ORDER BY
            interview_datetime
        LIMIT 5
      `,
      [userId],
    );

    // ============================
    // Recent Jobs
    // ============================

    const [recent] = await db.promise().query(
      `
      SELECT

      company,

      position,

      status,

      created_at

      FROM jobs

      WHERE user_id=?

      ORDER BY created_at DESC

      LIMIT 5
      `,
      [userId],
    );

    const row = stats[0];

    const total = row.total || 0;
    const interview = row.interview || 0;
    const offers = row.offer_count || 0;

    const interviewRate =
      total === 0 ? 0 : Number(((interview / total) * 100).toFixed(1));

    const offerRate =
      total === 0 ? 0 : Number(((offers / total) * 100).toFixed(1));

    res.json({
      stats: {
        total,
        applied: row.applied || 0,
        interview,
        offer: offers,
        rejected: row.rejected || 0,
      },

      monthlyApplications: monthly,

      interviewRate,

      offerRate,

      upcomingInterviews: upcoming,

      recentActivity: recent,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAnalytics,
};
