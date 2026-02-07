# Email Setup Guide — AWERE Contact Form

This guide explains how to set up the contact form email delivery using Resend.

## Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your account

## Step 2: Verify Your Domain

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `awere.se`
4. Add the provided DNS records to your domain (in Loopia):
   - SPF record (TXT)
   - DKIM record (TXT)
   - DMARC record (TXT)
5. Wait for verification (usually 5-15 minutes)

## Step 3: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: `AWERE Production` (or similar)
4. Copy the API key (you won't see it again!)

## Step 4: Set Environment Variables

### Locally (`.env.local`)

Create `/awere-site/.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=contact@awere.se
CONTACT_FROM_EMAIL=hello@awere.se
CONTACT_SUBJECT_PREFIX=AWERE
```

### In Vercel (Production)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable:
   - `RESEND_API_KEY` = `re_xxxxxxxxxxxxxxxxxx`
   - `CONTACT_TO_EMAIL` = `contact@awere.se`
   - `CONTACT_FROM_EMAIL` = `hello@awere.se`
   - `CONTACT_SUBJECT_PREFIX` = `AWERE`
3. Make sure they apply to **Production**, **Preview**, and **Development**
4. Redeploy (Vercel will prompt you)

## Step 5: Test Locally

```bash
cd awere-site
npm run dev
```

1. Open `http://localhost:3000/contact`
2. Fill out the form
3. Submit
4. Check `contact@awere.se` inbox for the email

## Step 6: Test in Production

1. Deploy to Vercel (or trigger a redeploy)
2. Go to `https://awere.se/contact`
3. Fill and submit the form
4. Check inbox

## Important Notes

### Verified Sender Email

The `CONTACT_FROM_EMAIL` must be from your verified domain. Examples:
- ✅ `hello@awere.se`
- ✅ `contact@awere.se`
- ✅ `no-reply@awere.se`
- ❌ `awere@gmail.com` (not your domain)

### Anti-Spam Protection

The form includes:
- **Honeypot field** (`hp`) — bots that fill it get silently dropped
- **Timing check** — submissions <2s or >24h old are dropped
- **Validation** — name (2-80 chars), email (valid format), message (20-4000 chars)

### Rate Limiting

Resend free tier allows 100 emails/day. If you exceed this, upgrade to a paid plan.

### Troubleshooting

**"Failed to send email" error:**
1. Check Vercel logs: `vercel logs --follow`
2. Verify API key is correct
3. Verify domain is verified in Resend
4. Check sender email is from verified domain

**Emails go to spam:**
- Ensure SPF/DKIM/DMARC records are correctly set
- Use a dedicated sender email (not your personal inbox)
- Warm up your sending reputation (start with low volume)

---

## Summary

| Variable | Value | Where |
|----------|-------|-------|
| `RESEND_API_KEY` | Get from Resend dashboard | Vercel + `.env.local` |
| `CONTACT_TO_EMAIL` | `contact@awere.se` | Vercel + `.env.local` |
| `CONTACT_FROM_EMAIL` | `hello@awere.se` | Vercel + `.env.local` |
| `CONTACT_SUBJECT_PREFIX` | `AWERE` | Vercel + `.env.local` |

Done! 🎉
