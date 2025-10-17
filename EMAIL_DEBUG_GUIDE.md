# 🔍 EMAIL NOT SENT - DIAGNOSIS & FIX

## 📊 Problem Summary

**Issue:** Test emails work perfectly, but application submission emails are NOT being sent.

- ✅ `npm run test-email` - Works perfectly
- ❌ Application submission emails - NOT sent
- ✅ SMTP configuration - Correct
- ✅ Application saves to database - Works
- ❌ `emailSent: false` in API response

---

## 🔎 Root Cause Investigation

### Changes Made for Better Diagnostics:

I've enhanced the logging in your code to show exactly what's happening:

**Files Modified:**
1. `server/services/emailService.js` - Added detailed error logging
2. `server/controllers/applicationController.js` - Added step-by-step logging

**New Logs Will Show:**
```
📝 Application created: APP-xxxxx
📧 Sending confirmation email to: user@example.com
✅ Confirmation email sent successfully to: user@example.com
   Message ID: <xxxxx>
📧 Sending admin notification...
✅ Admin notification sent successfully to: admin@example.com
   Message ID: <xxxxx>
```

**Or if there's an error:**
```
❌ Confirmation email sending error:
   To: user@example.com
   Error: [error message]
   Stack: [stack trace]
```

---

## ✅ HOW TO TEST & FIX

### Step 1: Stop All Running Processes

```bash
# Kill any suspended processes
fg  # Then press Ctrl+C

# Or kill all node processes
pkill -f "node server/server.js"
pkill -f nodemon
```

### Step 2: Start Fresh Server

```bash
cd /home/seth/Documents/code/jobaccord

# Start backend with enhanced logging
npm run server:dev
```

### Step 3: In a NEW Terminal, Test Application Submission

```bash
cd /home/seth/Documents/code/jobaccord

# Simple curl test
curl -X POST http://localhost:5000/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "eucabethmoraam1102@gmail.com",
    "phone": "+254729115000",
    "location": "Nairobi",
    "eligibleToWork": "yes",
    "cvLink": "https://example.com/cv.pdf"
  }'
```

### Step 4: Check Server Terminal for Detailed Logs

Look in the terminal where you ran `npm run server:dev`:

**If successful, you'll see:**
```
📝 Application created: APP-xxxxx
📧 Sending confirmation email to: eucabethmoraam1102@gmail.com
✅ Confirmation email sent successfully to: eucabethmoraam1102@gmail.com
   Message ID: <xxxxx@accordmedical.co.ke>
📧 Sending admin notification...
✅ Admin notification sent successfully to: customerservice@accordmedical.co.ke
   Message ID: <xxxxx@accordmedical.co.ke>
```

**If there's an error, you'll see:**
```
❌ Confirmation email sending error:
   To: eucabethmoraam1102@gmail.com
   Error: Connection timeout / Invalid credentials / etc.
   Stack: [full error details]
```

---

## 🐛 Possible Issues & Solutions

### Issue 1: Server Suspended/Not Responding

**Symptoms:**
- Curl commands get suspended (^Z shown)
- No response from server

**Fix:**
```bash
# Kill all node processes
pkill -f node

# Start fresh
npm run server:dev
```

### Issue 2: SMTP Connection Timeout

**Error:** `Connection timeout` or `ETIMEDOUT`

**Causes:**
- Firewall blocking SMTP port 465
- SMTP server down
- Network issues

**Fix:**
```bash
# Test SMTP connection
telnet mail.accordmedical.co.ke 465

# If that doesn't work, try port 587
telnet mail.accordmedical.co.ke 587
```

### Issue 3: Authentication Failed

**Error:** `Invalid login` or `Authentication failed`

**Fix:**
```bash
# Verify credentials in .env
cat .env | grep EMAIL

# Test with the test-email script
npm run test-email
```

### Issue 4: Email Being Blocked by Recipient Server

**Error:** `Recipient rejected` or `550 Blocked`

**Possible causes:**
- Gmail blocking automated emails
- Email marked as spam
- Domain not whitelisted

**Fix:**
- Check spam folder
- Try different email address
- Add SPF/DKIM records to your domain

### Issue 5: Rate Limiting

**Error:** `Too many connections` or `Rate limit exceeded`

**Fix:**
- Wait a few minutes
- Reduce number of test submissions
- Check SMTP server limits

---

## 🧪 Comprehensive Test Procedure

### Test 1: Verify SMTP Connection
```bash
npm run test-email
```
**Expected:** ✅ Test email sent successfully!

### Test 2: Check Server Health
```bash
curl http://localhost:5000/api/health
```
**Expected:** `{"success":true,"message":"Server is running"}`

### Test 3: Submit Test Application
```bash
curl -X POST http://localhost:5000/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "eucabethmoraam1102@gmail.com",
    "phone": "+254729115000",
    "location": "Nairobi",
    "eligibleToWork": "yes",
    "cvLink": "https://example.com/cv.pdf"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "applicationId": "APP-xxxxx",
    "email": "eucabethmoraam1102@gmail.com",
    "emailSent": true  ← THIS SHOULD BE TRUE
  }
}
```

### Test 4: Check Email Inbox
- Check main inbox
- Check spam/junk folder  
- Wait 1-2 minutes for delivery
- Check both applicant and admin emails

---

## 📝 Email Configuration Checklist

```bash
# Verify all environment variables are set
cat .env | grep EMAIL
```

**Should show:**
```
EMAIL_HOST=mail.accordmedical.co.ke
EMAIL_PORT=465
EMAIL_USER=humanresource@accordmedical.co.ke
EMAIL_PASS=acordhr123!
EMAIL_FROM="Accord Medical HR <humanresource@accordmedical.co.ke>"
```

**And:**
```bash
cat .env | grep ADMIN_EMAIL
```

**Should show:**
```
ADMIN_EMAIL=customerservice@accordmedical.co.ke
```

---

## 🚀 Quick Start (Clean Slate)

```bash
# Terminal 1: Start Backend
cd /home/seth/Documents/code/jobaccord
pkill -f node  # Kill any existing processes
npm run server:dev

# Terminal 2: Test Submission
cd /home/seth/Documents/code/jobaccord
sleep 3  # Wait for server to start
curl -X POST http://localhost:5000/api/applications/submit \
  -H "Content-Type: application/json" \
  -d @application-minimal.json

# Check Terminal 1 for detailed logs
# Check email inbox for confirmation
```

---

## 📊 Debugging Checklist

- [ ] Server is running (`npm run server:dev`)
- [ ] No suspended processes (`fg` and Ctrl+C to clear)
- [ ] Health check responds: `curl http://localhost:5000/api/health`
- [ ] Test email works: `npm run test-email` shows success
- [ ] Environment variables are correct: `cat .env | grep EMAIL`
- [ ] MongoDB is connected (check server logs)
- [ ] Test application submitted via curl
- [ ] Server logs show email sending attempts
- [ ] Check for error messages in server logs
- [ ] Check applicant email inbox (including spam)
- [ ] Check admin email inbox (customerservice@accordmedical.co.ke)

---

## 🔧 Common Error Messages & Fixes

### Error: "ECONNREFUSED"
**Meaning:** Can't connect to SMTP server  
**Fix:** Check EMAIL_HOST and EMAIL_PORT, verify server is reachable

### Error: "ETIMEDOUT"
**Meaning:** Connection timeout  
**Fix:** Check firewall, try different port (587 instead of 465)

### Error: "Invalid login"
**Meaning:** Authentication failed  
**Fix:** Verify EMAIL_USER and EMAIL_PASS in .env

### Error: "self signed certificate"
**Meaning:** SSL certificate issue  
**Fix:** Already handled with `rejectUnauthorized: false`

### Error: "Greeting never received"
**Meaning:** SMTP handshake failed  
**Fix:** Increase timeout values, check SMTP server status

---

## 💡 Next Steps

1. **Start clean server:** `pkill -f node && npm run server:dev`
2. **Submit test application** using curl in new terminal
3. **Watch server logs** for the new detailed error messages
4. **Share the error** if you see any ❌ messages
5. **Check email inbox** including spam folder

The enhanced logging I added will now show exactly where and why the email is failing!

---

## 📞 If Still Not Working

Please run this and share the output:

```bash
# In Terminal 1
npm run server:dev

# In Terminal 2
curl -X POST http://localhost:5000/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Debug Test",
    "email": "eucabethmoraam1102@gmail.com",
    "phone": "+254729115000",
    "location": "Nairobi",
    "eligibleToWork": "yes",
    "cvLink": "https://example.com/cv.pdf"
  }'
```

Then share:
1. The response from curl
2. The logs from Terminal 1 (server logs)
3. Any error messages you see

---

**Status:** Enhanced logging added  
**Action Required:** Run fresh server and test  
**Expected Result:** Detailed error logs will show exact issue  
