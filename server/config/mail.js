require("dotenv").config();

// Render's free tier blocks outbound SMTP ports (25/465/587), so we send
// via Brevo's HTTPS transactional email API instead (port 443, never
// blocked). Brevo's free tier (300 emails/day) allows sending to ANY
// recipient without domain verification — you only need to verify the
// single "From" sender address once (a confirmation link, no DNS needed).
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// Parses "Display Name <email@x.com>" or a bare "email@x.com" into
// Brevo's { email, name } shape.
function parseFrom(fromStr) {
  const fallback = process.env.EMAIL_FROM || "";
  const value = fromStr || fallback;
  const match = value.match(/^(.*)<(.+)>$/);

  if (match) {
    return {
      email: match[2].trim(),
      name: match[1].trim().replace(/^"|"$/g, "") || undefined,
    };
  }

  return { email: value.trim() };
}

// Same call shape as nodemailer's transporter.sendMail:
// supports both `await sendMail({...})` and `sendMail({...}, callback)`.
function sendMail({ from, to, subject, html, text }, callback) {
  const promise = fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: parseFrom(from),
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text,
    }),
  })
    .then(async (res) => {
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        const detail = body?.message || JSON.stringify(body);
        console.error("❌ Brevo rejected message:", detail);
        throw new Error(`Brevo rejected message: ${detail}`);
      }

      return body;
    })
    .catch((err) => {
      if (!err.message?.startsWith("Brevo rejected message")) {
        console.error("❌ Brevo send failed:", err.message || err);
      }
      throw err;
    });

  if (callback) {
    promise.then((body) => callback(null, body)).catch((err) => callback(err));
    return;
  }

  return promise;
}

// Lightweight startup check — confirms the API key is valid.
fetch("https://api.brevo.com/v3/account", {
  headers: { "api-key": process.env.BREVO_API_KEY, Accept: "application/json" },
})
  .then(async (res) => {
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("❌ Brevo API key check failed:", body?.message || res.statusText);
    } else {
      console.log("✅ Brevo API key OK");
      console.log("📧 Sender:", process.env.EMAIL_FROM);
    }
  })
  .catch((err) => {
    console.error("❌ Brevo API key check failed:", err.message || err);
  });

module.exports = { sendMail };