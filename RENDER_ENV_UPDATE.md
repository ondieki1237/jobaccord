# 🚨 IMPORTANT: Update Render Environment Variables

## Action Required

The code has been updated to use **port 587 (STARTTLS)** instead of port 465 (SSL) for better compatibility with Render.

### Steps to Update Render:

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select your backend service** (accord-medical-api or similar)
3. **Click "Environment" in the left sidebar**
4. **Update this variable**:
   ```
   EMAIL_PORT=587
   ```
   (Change from 465 to 587)

5. **Click "Save Changes"**
6. Render will automatically redeploy with the new settings

### Current Email Configuration:

```bash
EMAIL_HOST=mail.accordmedical.co.ke
EMAIL_PORT=587                                    # ← CHANGE THIS ON RENDER
EMAIL_USER=humanresource@accordmedical.co.ke
EMAIL_PASS=acordhr123!
EMAIL_FROM="Accord Medical Supplies <humanresource@accordmedical.co.ke>"
```

### What Changed:

- **Old**: Port 465 (SSL/TLS - direct encrypted connection)
- **New**: Port 587 (STARTTLS - starts unencrypted, upgrades to TLS)

Port 587 is more widely supported by hosting platforms and typically has fewer firewall restrictions.

### Technical Improvements:

The email service now:
- ✅ Automatically detects port and uses correct security mode
- ✅ Forces TLS for port 587 with `requireTLS: true`
- ✅ Longer timeouts (15s) for slower connections
- ✅ Better error logging in development
- ✅ Supports older TLS versions if needed

### Verification:

After updating on Render, check the deployment logs. You should see:
- ✅ No "Connection timeout" errors
- ✅ "Email sent successfully" messages

### If It Still Fails:

Port 587 is confirmed working from your local machine. If it still fails on Render:

1. **Contact Render Support** - They may need to whitelist mail.accordmedical.co.ke
2. **Contact Your Email Admin** - They may need to whitelist Render's IP ranges
3. **Use Alternative Email Service** (recommended for production):
   - SendGrid (free tier: 100 emails/day)
   - AWS SES (very cheap and reliable)
   - Mailgun (free tier: 1000 emails/month)
   - Postmark (reliable, good for transactional emails)

These services are designed for cloud hosting and rarely have connection issues.
