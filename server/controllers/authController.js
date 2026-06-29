const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const crypto = require("crypto");
const transporter = require("../config/mail");
const verifyEmailTemplate = require("../templates/verifyEmail");
const resetPasswordTemplate = require("../templates/resetPassword");

/* =========================
   REGISTER USER
========================= */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    db.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("DB Error:", err);
          return res.status(500).json({
            message: "Database error",
            error: err.sqlMessage || err.message,
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            message: "Email already registered",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        db.query(
          `INSERT INTO users
          (id,name,email,password,is_verified,verification_token,verification_expires)
          VALUES (?,?,?,?,?,?,?)`,
          [
            id,
            name,
            email,
            hashedPassword,
            false,
            verificationToken,
            verificationExpires,
          ],
          async (err2) => {
            if (err2) return res.status(500).json(err2);

            const FRONTEND_URL = process.env.FRONTEND_URL;

            const verifyLink = `${FRONTEND_URL}/verify-email/${verificationToken}`;

            try {
              await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Verify your email - Job Tracker Pro",
                html: verifyEmailTemplate(name, verifyLink),
              });

              res.json({
                message: "Registration successful. Please verify your email.",
              });
            } catch (mailError) {
              console.error(mailError);
              return res.status(500).json({
                message: "Failed to send verification email.",
              });
            }
          },
        );
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* =========================
   LOGIN USER (FIXED)
========================= */
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // ✅ FIX: validation must come AFTER destructuring
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = results[0];

      // (optional security - you can enable again later)
      if (!user.is_verified) {
        return res.status(403).json({
          message: "Please verify your email before logging in.",
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.json({ token });
    },
  );
};

/* =========================
   VERIFY EMAIL
========================= */
const verifyEmail = (req, res) => {
  const { token } = req.params;

  db.query(
    `SELECT * FROM users 
     WHERE verification_token = ? 
     AND verification_expires > NOW()`,
    [token],
    (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "Invalid or expired verification link.",
        });
      }
      const user = results[0];

      db.query(
        `UPDATE users
         SET is_verified = 1,
             verification_token = NULL,
             verification_expires = NULL
         WHERE id = ?`,
        [user.id],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          res.json({
            success: true,
            message: "Email verified successfully.",
          });
        },
      );
    },
  );
};

/* =========================
   RESEND VERIFICATION
========================= */
const resendVerificationEmail = (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "No account found with this email.",
        });
      }

      const user = results[0];

      if (user.is_verified) {
        return res.status(400).json({
          message: "This email is already verified.",
        });
      }

      const verificationToken = crypto.randomBytes(32).toString("hex");
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      db.query(
        `UPDATE users SET verification_token=?, verification_expires=? WHERE id=?`,
        [verificationToken, verificationExpires, user.id],
        async (err2) => {
          if (err2) return res.status(500).json(err2);

          const verifyLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

          try {
            await transporter.sendMail({
              from: process.env.EMAIL_FROM,
              to: user.email,
              subject: "Verify your email - Job Tracker Pro",
              html: verifyEmailTemplate(user.name, verifyLink),
            });

            res.json({
              message: "Verification email sent successfully.",
            });
          } catch (mailError) {
            res.status(500).json({
              message: "Failed to send verification email.",
            });
          }
        },
      );
    },
  );
};

/* =========================
   FORGOT PASSWORD (FIXED LINK)
========================= */
const forgotPassword = (req, res) => {
  const { email } = req.body;

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "No account found with this email.",
        });
      }

      const user = results[0];

      db.query(
        `UPDATE users SET reset_token=?, reset_expires=? WHERE id=?`,
        [token, expires, user.id],
        async (err2) => {
          if (err2) return res.status(500).json(err2);

          const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

          try {
            await transporter.sendMail({
              from: process.env.EMAIL_FROM,
              to: user.email,
              subject: "Reset Password - Job Tracker Pro",
              html: resetPasswordTemplate(user.name, resetLink),
            });

            res.json({
              message: "Password reset link has been sent.",
            });
          } catch (mailError) {
            console.error("Mail Error:", mailError);
            return res.status(500).json({
              message: "Failed to send email",
            });
          }

        },
      );
    },
  );
};

/* =========================
   RESET PASSWORD
========================= */
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    `SELECT * FROM users WHERE reset_token=? AND reset_expires > NOW()`,
    [token],
    (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          message: "Database error",
          error: err.sqlMessage || err.message,
        });
      }

      if (results.length === 0) {
        return res.status(400).json({
          message: "Reset link expired.",
        });
      }

      const user = results[0];

      db.query(
        `UPDATE users 
         SET password=?, reset_token=NULL, reset_expires=NULL 
         WHERE id=?`,
        [hashedPassword, user.id],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          res.json({
            message: "Password updated successfully.",
          });
        },
      );
    },
  );
};

/* =========================
   DELETE ACCOUNT
========================= */
const deleteAccount = (req, res) => {
  const userId = req.user.id;

  db.query("DELETE FROM jobs WHERE user_id=?", [userId], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        message: "Database error",
        error: err.sqlMessage || err.message,
      });
    }

    db.query("DELETE FROM users WHERE id=?", [userId], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        message: "Account deleted successfully",
      });
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  deleteAccount,
};
