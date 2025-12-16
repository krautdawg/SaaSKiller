# MailForm + Coolify Setup (Simple Steps)

## What you’re doing
You’ll run MailForm (an email relay) inside Coolify, add two configs (targets), and point your app’s backend to it to send:
- Lead emails to you
- Quote emails to your users

---

## 1) Deploy MailForm in Coolify
1) In Coolify, create a new **Docker Image** service.  
2) Image: `ghcr.io/feuerhamster/mailform:latest`  
3) Port: leave 3000 (default).  
4) Env vars:  
   - `PORT=3000`  
   - `TARGETS_DIR=/app/targets`  
   - `PROXY=true` (helps if behind Coolify’s proxy)  
5) Volume: add a persistent volume (e.g. `mailform-targets:/app/targets`).  
6) Network: keep it in the same project as your API (so they can talk internally).  
7) Deploy.

---

## 2) Add MailForm target files
You need two JSON files in the MailForm volume (`/app/targets`):

**lead-gen.json** (sends leads to you)
```json
{
  "smtp": "smtps://USER:PASS@smtp.example.com",
  "origin": "https://your-frontend-domain.com",
  "recipients": ["you@yourdomain.com"],
  "from": "leads@saaskiller.com",
  "subjectPrefix": "[Lead]",
  "rateLimit": { "timespan": 300, "requests": 3 },
  "key": "MAILFORM_LEAD_KEY"
}
```

**quote-user.json** (sends quotes to the user)
```json
{
  "smtp": "smtps://USER:PASS@smtp.example.com",
  "origin": "https://your-frontend-domain.com",
  "recipients": [],
  "from": "quotes@saaskiller.com",
  "subjectPrefix": "[Quote]",
  "rateLimit": { "timespan": 300, "requests": 5 },
  "key": "MAILFORM_QUOTE_KEY"
}
```

How to place them:
- In Coolify, open the MailForm service → Volumes/File Manager → create these two files under `/app/targets`.
- No `redirect` fields so the API returns JSON (not redirects).

---

## 3) Set env vars in your API service (Coolify)
Add these to your API service env:
```
MAILFORM_URL=http://mailform:3000
MAILFORM_LEAD_TARGET=lead-gen
MAILFORM_QUOTE_TARGET=quote-user
MAILFORM_LEAD_KEY=MAILFORM_LEAD_KEY
MAILFORM_QUOTE_KEY=MAILFORM_QUOTE_KEY
```
(Use the same keys as in the JSON files. `mailform` is the container name/service name inside the project network.)

Redeploy the API service after adding envs.

---

## 4) Add two backend routes (Node/Express example)
In your API code, add:

```js
import fetch from 'node-fetch'; // or axios
const {
  MAILFORM_URL,
  MAILFORM_LEAD_TARGET,
  MAILFORM_QUOTE_TARGET,
  MAILFORM_LEAD_KEY,
  MAILFORM_QUOTE_KEY
} = process.env;

const sendMail = async (target, apiKey, payload) => {
  const res = await fetch(`${MAILFORM_URL}/api/${target}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { key: apiKey } : {})
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MailForm error: ${res.status} ${text}`);
  }
  return res.json().catch(() => ({}));
};

// Lead: POST /api/mail/lead
app.post('/api/mail/lead', async (req, res) => {
  const { name, email, tool, message, bleed } = req.body;
  if (!email || !tool) return res.status(400).json({ error: 'email and tool required' });

  const body = `
    Lead from ${name || 'Unknown'}<br/>
    Email: ${email}<br/>
    Tool: ${tool}<br/>
    Bleed: ${bleed || 'n/a'}<br/>
    Message: ${message || 'n/a'}
  `;
  try {
    await sendMail(MAILFORM_LEAD_TARGET, MAILFORM_LEAD_KEY, {
      from: email || 'leads@saaskiller.com',
      subject: `Lead: ${tool}`,
      body
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quote: POST /api/mail/quote
app.post('/api/mail/quote', async (req, res) => {
  const { userEmail, quoteSummary, quoteLink } = req.body;
  if (!userEmail) return res.status(400).json({ error: 'userEmail required' });

  const body = `
    Here’s your quote:<br/><br/>
    ${quoteSummary || 'Quote attached/linked.'}<br/>
    ${quoteLink ? `<a href="${quoteLink}">View Quote</a>` : ''}
  `;
  try {
    await sendMail(MAILFORM_QUOTE_TARGET, MAILFORM_QUOTE_KEY, {
      from: 'quotes@saaskiller.com',
      subject: 'Your SaaSKiller Quote',
      body,
      to: userEmail
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## 5) Frontend wiring
- Lead form → POST to `/api/mail/lead` with `{ name, email, tool, message, bleed }`.
- After generating a quote → POST to `/api/mail/quote` with `{ userEmail, quoteSummary, quoteLink }`.
- Show success/failure messages.

---

## 6) Test checklist
1) Submit a lead form → you get an email.  
2) Send a quote → user mailbox gets the quote.  
3) Break the SMTP creds → confirm you see a friendly error (no crash).  
4) (Optional) Add captcha tokens if you set `captcha` in targets.
```
