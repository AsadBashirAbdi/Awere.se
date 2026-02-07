# Email Testing Guide

This guide explains how to test the contact form email functionality.

## Quick Test (UI)

### 1. Production Test
```
1. Go to: https://awere.se/contact
2. Fill out form:
   - Name: Test User
   - Email: your-test-email@example.com
   - Message: This is a test message from the AWERE contact form.
3. Click "Submit brief"
4. Expected: "Message sent successfully!" banner
5. Check: contact@awere.se inbox for the email
```

### 2. Local Test
```bash
cd awere-site
npm run dev
# Open: http://localhost:3000/contact
# Fill and submit form
```

## Advanced Test (curl)

### Test API Endpoint Directly

**Production:**
```bash
curl -X POST https://awere.se/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from curl. It needs to be at least 20 characters long.",
    "projectType": "SaaS",
    "budgetRange": "10-25k EUR"
  }'
```

**Expected Response (Success):**
```json
{"ok":true}
```

**Expected Response (Rate Limited):**
```json
{"ok":false,"error":"Too many requests. Please try again later."}
```

**Expected Response (Validation Error):**
```json
{"ok":false,"error":"Invalid message (20-4000 characters required)"}
```

### Test Rate Limiting

Run this 6 times quickly:
```bash
for i in {1..6}; do
  echo "Request $i:"
  curl -X POST https://awere.se/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","message":"Testing rate limit with enough characters"}' \
    -w "\nStatus: %{http_code}\n\n"
done
```

- First 5 requests: `{"ok":true}` with status `200`
- 6th request: `{"ok":false,"error":"Too many requests..."}` with status `429`

## Check Vercel Logs

### Real-time Logs
```bash
vercel logs --follow
```

### Recent Logs
```bash
vercel logs
```

### Filter by Function
```bash
vercel logs --filter="/api/contact"
```

### What to Look For

**Success:**
```
POST /api/contact 200 in 1234ms
```

**Error Patterns:**
```
Contact form error: Authentication failed
Contact form error: Connection timeout
Contact form error: Invalid login
```

## Common Test Scenarios

### 1. Valid Submission
```bash
curl -X POST https://awere.se/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "I would like to discuss a new SaaS project. We are looking for a technical partner.",
    "company": "ACME Inc",
    "website": "https://acme.com",
    "projectType": "SaaS",
    "budgetRange": "50-100k EUR"
  }'
```
Expected: `{"ok":true}` + email in inbox

### 2. Missing Required Field
```bash
curl -X POST https://awere.se/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com"
  }'
```
Expected: `{"ok":false,"error":"Invalid message (20-4000 characters required)"}`

### 3. Invalid Email
```bash
curl -X POST https://awere.se/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "not-an-email",
    "message": "This is a test message with enough characters."
  }'
```
Expected: `{"ok":false,"error":"Invalid email address"}`

### 4. Message Too Short
```bash
curl -X POST https://awere.se/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "message": "Short"
  }'
```
Expected: `{"ok":false,"error":"Invalid message (20-4000 characters required)"}`

## Verify Email Content

When you test the form, you should receive **TWO emails**:

### 1. Notification to AWERE team (`contact@awere.se`)

Check:

1. **From:** `AWERE <contact@awere.se>`
2. **To:** `contact@awere.se`
3. **Reply-To:** User's email (e.g., `jane@example.com`)
4. **Subject:** `AWERE contact — Jane Doe`
5. **Body includes:**
   - NAME: Jane Doe
   - EMAIL: jane@example.com
   - MESSAGE: (full message)
   - PROJECT TYPE: SaaS (if provided)
   - BUDGET RANGE: 50-100k EUR (if provided)
   - Timestamp

### 2. Autoresponder to user

The user receives a confirmation email:

1. **From:** `AWERE <contact@awere.se>`
2. **To:** User's email (from form)
3. **Subject:** `Thanks — we received your message`
4. **Body:**
```
Hi,

Thanks for reaching out to AWERE.

We've received your message and will get back to you as soon as possible (typically within 1–2 business days).

To help us respond efficiently, please include if relevant:
• What you're building (and where you're stuck)
• Your current stack (or constraints)
• Timeline and priorities
• Links/screenshots (if any)

Best regards,
AWERE
contact@awere.se

awere.se
```

## Verify Email Content (Legacy)

When you receive a test email, check:

1. **From:** `AWERE <contact@awere.se>`
2. **To:** `contact@awere.se`
3. **Reply-To:** User's email (e.g., `jane@example.com`)
4. **Subject:** `AWERE contact — Jane Doe`
5. **Body includes:**
   - NAME: Jane Doe
   - EMAIL: jane@example.com
   - MESSAGE: (full message)
   - PROJECT TYPE: SaaS (if provided)
   - BUDGET RANGE: 50-100k EUR (if provided)
   - Timestamp

## Troubleshooting

### Problem: "Failed to send message"

**Check:**
1. Vercel logs: `vercel logs --filter="/api/contact"`
2. Env vars are set in Vercel
3. SMTP credentials are correct

**Diagnose:**
```bash
# Check if env vars exist (doesn't show values)
vercel env ls
```

### Problem: "Too many requests"

**Solution:**
- Wait 10 minutes
- Or clear rate limit (restart deployment)
- Or test from different IP/network

### Problem: Email not received

**Check:**
1. Spam folder in `contact@awere.se` inbox
2. Loopia mailbox is not full
3. Email forwarding rules (if any)
4. Vercel logs show successful send

**Verify SMTP connection:**
```bash
# Install telnet
# Test connection to Loopia SMTP
telnet mailcluster.loopia.se 465
# Should connect (then Ctrl+C to exit)
```

### Problem: Authentication error in logs

**Fix:**
1. Verify password for `contact@awere.se` in Loopia
2. Update `SMTP_PASS` in Vercel env vars
3. Redeploy

## Performance Testing

### Response Time
```bash
time curl -X POST https://awere.se/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Performance test with sufficient character count"}'
```

Expected: < 3 seconds

### Load Test (Use with Caution)
```bash
# Test 3 concurrent requests
for i in {1..3}; do
  curl -X POST https://awere.se/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"User$i\",\"email\":\"test$i@example.com\",\"message\":\"Load test message number $i with enough characters\"}" &
done
wait
```

## Monitoring

### Set Up Alerts

In Vercel:
1. Go to **Settings** → **Notifications**
2. Enable alerts for:
   - Function errors
   - High response times

### Check Function Stats

In Vercel Dashboard:
- **Analytics** → **Functions**
- Check `/api/contact` metrics:
  - Invocations
  - Error rate
  - Duration (p50/p99)

## Test Checklist

Before going live:

- [ ] UI form submission works
- [ ] curl POST works
- [ ] Email arrives in inbox
- [ ] Reply-To is user's email
- [ ] Rate limiting triggers after 5 requests
- [ ] Validation errors return correct messages
- [ ] No sensitive data in Vercel logs
- [ ] Response time < 3 seconds
- [ ] Spam folder check done

---

**All tests passing?** Your contact form is production-ready! ✅
