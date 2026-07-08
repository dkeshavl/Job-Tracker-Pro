require("dotenv").config();
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.EMAIL_USER,
  process.env.EMAIL_PASS,
);

function parseFrom(fromStr) {
  const fallback = process.env.EMAIL_FROM || "";
  const value = fromStr || fallback;
  const match = value.match(/^(.*)<(.+)>$/);
  if (match) {
    return { Email: match[2].trim(), Name: match[1].trim().replace(/^"|"$/g, "") || undefined };
  }
  return { Email: value.trim() };
}

function sendMail({ from, to, subject, html, text }, callback) {
  const promise = mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: parseFrom(from),
          To: [{ Email: to }],
          Subject: subject,
          HTMLPart: html,
          TextPart: text,
        },
      ],
    })
    .then((res) => res.body)
    .catch((err) => {
      console.error("❌ Mailjet API send failed:", err?.response?.data || err.message);
      throw err;
    });

  if (callback) {
    promise.then((body) => callback(null, body)).catch((err) => callback(err));
    return;
  }
  return promise;
}

mailjet
  .get("apikey", { version: "v3" })
  .request()
  .then(() => {
    console.log("✅ Mailjet API credentials OK (using HTTPS REST API)");
    console.log("📧 Sender:", process.env.EMAIL_FROM);
  })
  .catch((err) => {
    console.error("❌ Mailjet API credential check failed");
    console.error(err?.response?.data || err.message);
  });

module.exports = { sendMail };