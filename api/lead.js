// Forwards each lead to the Make.com webhook.
// The webhook URL lives in the LEAD_WEBHOOK_URL environment variable in Vercel (Production), not in code.
const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const name = String(body.name || "").trim().slice(0, 80);
  const phone = String(body.phone || "").replace(/\D/g, "").slice(-10);

  // Honeypot: real people never fill the hidden "company" field.
  if (body.company) return res.status(200).json({ ok: true });
  if (!name || phone.length !== 10) return res.status(400).json({ error: "Name and a 10-digit phone number are required." });
  if (!WEBHOOK_URL) {
    console.error("LEAD_WEBHOOK_URL is not set", { name, phone });
    return res.status(500).json({ error: "Lead delivery isn't configured." });
  }

  const r = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      phone_e164: `+1${phone}`,
      phone_pretty: `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`,
      email: String(body.email || "").trim().slice(0, 120),
      sms_consent: body.sms_consent === true,
      consent_text: body.sms_consent === true ? String(body.consent_text || "").slice(0, 600) : "",
      page: String(body.page || "").slice(0, 120),
      source: String(body.source || "site").slice(0, 40),
      submitted_at: new Date().toISOString(),
    }),
  });

  if (!r.ok) {
    console.error("Webhook error", r.status, await r.text(), { name, phone });
    return res.status(502).json({ error: "Couldn't deliver the lead." });
  }
  return res.status(200).json({ ok: true });
};

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
