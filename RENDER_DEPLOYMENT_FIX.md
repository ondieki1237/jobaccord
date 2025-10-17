# Render Deployment Fixes

## Issues Fixed

### 1. Express Trust Proxy Error ✅
**Error**: `ValidationError: The 'X-Forwarded-For' header is set but the Express 'trust proxy' setting is false`

**Solution**: Added `app.set('trust proxy', 1);` in `server/server.js`

This is required because Render (and other hosting platforms) use reverse proxies, and Express needs to trust the proxy to correctly identify client IPs for rate limiting.

### 2. Email Connection Timeout ⚠️
**Error**: `Error: Connection timeout` when sending emails

**Solutions Applied**:
1. Added timeout configurations to nodemailer transporter:
   - `connectionTimeout: 10000` (10 seconds)
   - `greetingTimeout: 5000` (5 seconds)
   - `socketTimeout: 10000` (10 seconds)
   
2. Added TLS configuration:
   - `rejectUnauthorized: false` to accept self-signed certificates

3. Errors are caught and logged but don't crash the application

**Note**: The email timeout may still occur if:
- Render's IP is blocked by your SMTP server (mail.accordmedical.co.ke)
- Your SMTP server firewall doesn't allow connections from Render
- SMTP credentials are incorrect in production environment variables

## Deployment Status

The fixes are committed and pushed. Render will automatically deploy the changes.

## Email Troubleshooting

If emails still timeout on Render:

1. **Check Environment Variables** on Render dashboard:
   - `EMAIL_HOST=mail.accordmedical.co.ke`
   - `EMAIL_PORT=465`
   - `EMAIL_USER=humanresource@accordmedical.co.ke`
   - `EMAIL_PASS=acordhr123!`

2. **Whitelist Render's IP** in your SMTP server firewall

3. **Alternative**: Use a cloud email service like:
   - SendGrid
   - AWS SES
   - Mailgun
   - Postmark

These services are designed for application email sending and work better with hosting platforms like Render.

## Next Steps

1. Wait for Render deployment to complete
2. Test the application submission
3. Check Render logs to see if trust proxy error is resolved
4. Monitor email delivery status

## Contact

For SMTP server configuration, contact your email administrator to:
- Whitelist Render's outbound IP addresses
- Verify SMTP credentials
- Confirm port 465 is accessible from external services
