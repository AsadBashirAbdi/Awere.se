# Email Setup Guide — Loopia SMTP

This guide explains how to configure email delivery for the AWERE contact form using Loopia SMTP.

## Features

The contact form includes:

1. **Email to AWERE team** — Sends notification to `contact@awere.se` with:
   - User details (name, email, company, website)
   - Project type and budget range
   - Full message
   - Reply-To set to user's email

2. **Autoresponder to user** — Sends confirmation email to the user with:
   - Subject: "Thanks — we received your message"
   - Professional acknowledgment
   - Response time expectation (1-2 business days)
   - Tips for follow-up information

3. **Rate limiting** — Prevents abuse (5 submissions per IP per 10 minutes)

4. **Input validation** — Ensures data quality and security

## Prerequisites

- Mailbox already exists: `contact@awere.se` on Loopia
- Domain `awere.se` DNS is on Loopia with MX, SPF, DKIM configured
- Website deployed on Vercel

## Environment Variables

You need to set these 5 variables in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `CONTACT_FROM_EMAIL` | `contact@awere.se` | Verified Loopia mailbox (sender) |
| `CONTACT_TO_EMAIL` | `contact@awere.se` | Where contact form emails go |
| `SMTP_HOST` | `mailcluster.loopia.se` | Loopia SMTP server |
| `SMTP_PORT` | `465` | Port (465 for SSL, 587 for STARTTLS) |
| `SMTP_USER` | `contact@awere.se` | Loopia mailbox username |
| `SMTP_PASS` | `your-loopia-password` | Loopia mailbox password |

## Setup Steps

### 1. Get Loopia Mailbox Password

If you don't know the password for `contact@awere.se`:

1. Log in to [Loopia Customer Zone](https://customerzone.loopia.se)
2. Go to **Email** → **Email accounts**
3. Find `contact@awere.se`
4. Click **Change password** or view existing password
5. Copy the password (you'll need it for `SMTP_PASS`)

### 2. Add Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project: `awere-site`
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

```
CONTACT_FROM_EMAIL = contact@awere.se
CONTACT_TO_EMAIL = contact@awere.se
SMTP_HOST = mailcluster.loopia.se
SMTP_PORT = 465
SMTP_USER = contact@awere.se
SMTP_PASS = <your-loopia-password>
```

**Important:**
- Select **Production**, **Preview**, and **Development** for all variables
- Click **Save** after each one
- **Never commit passwords to git**

### 3. Redeploy

After adding env vars:

1. In Vercel → **Deployments** tab
2. Click **...** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (~2 minutes)

### 4. Test the Form

1. Go to `https://awere.se/contact`
2. Fill out the form
3. Click "Submit brief"
4. You should see: "Message sent successfully!"
5. Check your inbox at `contact@awere.se`

## Port Configuration

### Port 465 (Default, Recommended)
- Uses SSL/TLS encryption from the start
- Most reliable for Loopia

### Port 587 (Alternative)
If port 465 is blocked:
1. Change `SMTP_PORT` to `587` in Vercel
2. Redeploy
3. Uses STARTTLS (opportunistic TLS)

## Troubleshooting

### "Failed to send message" Error

**1. Check Vercel Logs**
```bash
vercel logs --follow
```

Look for error messages like:
- `Auth failed` → Check username/password
- `Connection timeout` → Check port (try 587)
- `Missing env vars` → Verify all 6 variables are set

**2. Common Issues**

| Error | Solution |
|-------|----------|
| Authentication failed | Verify password in Loopia, ensure `SMTP_USER` matches mailbox |
| Connection timeout | Try port 587 instead of 465 |
| SSL error | Ensure port matches protocol (465=SSL, 587=STARTTLS) |
| Missing configuration | Check all env vars exist in Vercel |

**3. Test SMTP Credentials Manually**

You can test the SMTP connection locally:

```bash
# Create a test script
cat > test-smtp.js << 'EOF'
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mailcluster.loopia.se',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@awere.se',
    pass: 'YOUR_PASSWORD_HERE'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Error:', error);
  } else {
    console.log('SMTP Connection successful!');
  }
});
EOF

node test-smtp.js
```

### Rate Limiting

The form has built-in rate limiting:
- **Limit**: 5 submissions per IP per 10 minutes
- **Reset**: Automatically after 10 minutes
- **Error**: "Too many requests. Please try again later."

If you need to adjust:
1. Edit `app/api/contact/route.ts`
2. Change `RATE_LIMIT_MAX` or `RATE_LIMIT_WINDOW_MS`
3. Commit and deploy

## Security Notes

1. **Never set user email as From address** — Always use `contact@awere.se`
2. **Use Reply-To for user email** — This is handled automatically
3. **Password security** — Loopia password is only in Vercel env vars (encrypted)
4. **No logs with secrets** — Code never logs passwords or sensitive data
5. **Rate limiting** — Prevents spam abuse

## DNS Configuration (No Changes Needed)

Your DNS is already correctly configured on Loopia. Do NOT change:
- ✅ MX records (for receiving mail)
- ✅ SPF record (for sender verification)
- ✅ DKIM record (for email signing)

These are managed by Loopia for `contact@awere.se`.

## Testing Checklist

- [ ] All 6 env vars set in Vercel
- [ ] Redeployed after setting vars
- [ ] Form submission shows success message
- [ ] Email received at `contact@awere.se`
- [ ] Reply-To header contains user's email
- [ ] No errors in Vercel logs
- [ ] Rate limiting works (try 6 submissions quickly)

## Support

If issues persist:
1. Check [Loopia SMTP documentation](https://support.loopia.se/en/wiki/smtp-settings)
2. Verify mailbox is active in Loopia Customer Zone
3. Check Vercel logs for detailed error messages
4. Try port 587 if 465 fails

---

**Setup complete!** Emails will now be sent via Loopia SMTP. 🎉
