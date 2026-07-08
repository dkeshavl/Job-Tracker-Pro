const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00',        // ✅ CRITICAL: Force UTC for all MySQL operations
  dateStrings: false,        // ✅ Return DATETIME as JS Date objects (not strings)
  supportBigNumbers: true,
  bigNumberStrings: false,
});

// Force UTC timezone on every new connection
db.on('connection', (connection) => {
  connection.query("SET SESSION time_zone='+00:00'", (err) => {
    if (err) console.error('Failed to set MySQL timezone:', err);
  });
});

// safer connection test (no crash)
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Connected (UTC Timezone Enforced)");
    connection.release();
  }
});

module.exports = db;
