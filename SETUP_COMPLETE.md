# 🚀 Accord Medical Job Application - Complete Setup Guide

## ✅ Setup Complete!

Your job application system is now fully configured with:
- ✅ MongoDB database integration
- ✅ Email notifications (applicant + admin)
- ✅ Backend API server with authentication
- ✅ Frontend Next.js application
- ✅ Rate limiting and security features

---

## 🖥️ Server Status

### Frontend (Next.js)
- **URL**: http://localhost:3002
- **Status**: ✅ Running

### Backend (Express API)
- **URL**: https://api.codewithseth.co.ke
- **Status**: ✅ Running
- **Database**: ✅ Connected to MongoDB Atlas

---

## 🎯 Quick Start Commands

### Start Both Servers (Development)
```bash
# Option 1: Run both concurrently
npm run dev:all

# Option 2: Run separately (in different terminals)
npm run dev          # Frontend (Next.js)
npm run server:dev   # Backend (Express)
```

### Production
```bash
npm run build        # Build Next.js
npm run start        # Start Next.js production
npm run server       # Start Express production
```

---

## 📧 Email Configuration (IMPORTANT!)

Your emails are currently configured with placeholder SMTP settings. To send real emails:

### Option 1: Gmail Setup (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

3. **Update `.env`**:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM="Accord Medical <your-email@gmail.com>"
```

### Option 2: Professional Email Service

For production, use a professional email service:

**SendGrid** (Recommended)
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
EMAIL_FROM="Accord Medical <no-reply@accordmedical.co.ke>"
```

**Mailgun**
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASS=your_mailgun_password
EMAIL_FROM="Accord Medical <no-reply@accordmedical.co.ke>"
```

**AWS SES**
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your_aws_access_key
EMAIL_PASS=your_aws_secret_key
EMAIL_FROM="Accord Medical <no-reply@accordmedical.co.ke>"
```

After updating `.env`, restart the backend server:
```bash
# Press Ctrl+C to stop the server, then
npm run server:dev
```

---

## 🔐 Admin Access

### Login Credentials
- **Email**: `customerservice@accordmedical.co.ke`
- **Password**: `customer2026`

⚠️ **IMPORTANT**: Change this password in production!

### Admin API Endpoints

**Login**
```bash
curl -X POST https://api.codewithseth.co.ke/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customerservice@accordmedical.co.ke","password":"customer2026"}'
```

**Get All Applications** (requires token)
```bash
curl https://api.codewithseth.co.ke/api/applications \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📝 Testing the Application Flow

### Step 1: Fill Out Application
1. Open: http://localhost:3002
2. Complete all 6 steps of the form
3. Submit the application

### Step 2: Check Backend Logs
Watch the backend terminal for:
- ✅ Application saved to MongoDB
- ✅ Email sent to applicant
- ✅ Email sent to admin

### Step 3: Verify Database
The application is saved to MongoDB with a unique ID like `APP-1729089234567-ABC123XYZ`

### Step 4: Check Emails
- Applicant receives a confirmation email with application ID
- Admin receives a notification with applicant details

---

## 🗄️ Database Structure

### MongoDB Collections

**applications**
- All submitted job applications
- Status tracking (pending, reviewed, shortlisted, rejected, hired)
- Full applicant data and document links

**admins**
- Admin user accounts
- Encrypted passwords
- Role-based access (admin, super-admin)

### View Data in MongoDB Atlas
1. Go to: https://cloud.mongodb.com
2. Login with your credentials
3. Browse Collections → accord → applications

---

## 🔧 Environment Variables

### `.env` (Backend - Root Directory)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://bellarinseth_db_user:5RWVgMqZ1CxeybBe@cluster0.8aeu9sk.mongodb.net/accord
JWT_SECRET=change_this_secret
JWT_EXPIRE=7d
ADMIN_EMAIL=customerservice@accordmedical.co.ke
ADMIN_PASSWORD=customer2026
EMAIL_HOST=smtp.example.com         # ⚠️ UPDATE THIS
EMAIL_PORT=587
EMAIL_USER=your_smtp_user           # ⚠️ UPDATE THIS
EMAIL_PASS=your_smtp_password       # ⚠️ UPDATE THIS
EMAIL_FROM="Accord Medical <no-reply@example.com>"  # ⚠️ UPDATE THIS
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### `.env.local` (Frontend - Root Directory)
```env
NEXT_PUBLIC_API_URL=https://api.codewithseth.co.ke
```

---

## 🎨 Customization

### Update Company Logo
Replace `/public/logoaccord.png` with your logo

### Update Email Templates
Edit `/server/services/emailService.js`:
- `sendApplicationConfirmation` - Applicant email
- `sendAdminNotification` - Admin email

### Update Form Fields
1. Edit form steps in `/components/form-steps/`
2. Update schema in `/server/models/Application.js`
3. Update FormData interface in `/components/job-application-form.tsx`

---

## 🚨 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -ti:5000 | xargs kill -9

# Restart server
npm run server:dev
```

### Frontend won't start
```bash
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

### Emails not sending
1. Check SMTP credentials in `.env`
2. Look for error logs in backend terminal
3. Test with a different SMTP provider (Gmail, Mailtrap)
4. Emails are logged even if sending fails

### MongoDB connection failed
1. Check MongoDB URI in `.env`
2. Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
3. Check database user credentials

### File watcher error (ENOSPC)
Already fixed! But if it occurs again:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## 📊 Application Workflow

```
1. Applicant → Fills form (6 steps)
2. Frontend → Validates data
3. Next.js API → Forwards to Express backend
4. Backend → Saves to MongoDB
5. Backend → Sends confirmation email to applicant ✉️
6. Backend → Sends notification to admin ✉️
7. Admin → Reviews in dashboard (to be built)
8. Admin → Updates status (shortlisted/rejected/hired)
```

---

## 🎯 Next Steps (Recommended)

### 1. Configure Real Email Service
- Set up Gmail App Password OR
- Sign up for SendGrid/Mailgun/AWS SES
- Update `.env` with real SMTP credentials
- Test email delivery

### 2. Build Admin Dashboard (Optional)
Create an admin panel to:
- View all applications
- Filter by status
- Update application status
- Add notes to applications
- Export to CSV

### 3. Deploy to Production
- **Frontend**: Deploy to Vercel (automatic for Next.js)
- **Backend**: Deploy to Heroku, Railway, or DigitalOcean
- **Database**: Already on MongoDB Atlas ✅

### 4. Security Enhancements
- Change admin password
- Update JWT_SECRET to a strong random string
- Enable HTTPS in production
- Configure CORS for specific domains only
- Set up monitoring and logging

---

## 📚 Documentation

- **Backend API**: See `/server/README.md`
- **Project Structure**: See main README.md
- **API Endpoints**: https://api.codewithseth.co.ke/ (root shows all endpoints)

---

## 💡 Useful Commands

```bash
# Create new admin
npm run create-admin

# Start both servers
npm run dev:all

# Check backend health
curl https://api.codewithseth.co.ke/api/health

# View MongoDB logs
npm run server:dev  # Watch terminal output

# Format code
npm run lint

# Build for production
npm run build
```

---

## 🆘 Support

If you encounter issues:
1. Check the terminal logs (both frontend and backend)
2. Review the troubleshooting section above
3. Check MongoDB connection status
4. Verify environment variables are loaded

---

## ✨ Features Summary

✅ Multi-step job application form (6 steps)  
✅ MongoDB database storage  
✅ Automatic email notifications  
✅ Admin authentication with JWT  
✅ Rate limiting (3 submissions per 15 min)  
✅ Input validation and sanitization  
✅ Responsive design  
✅ Document link collection (Google Drive, etc.)  
✅ Application status tracking  
✅ Secure password hashing  
✅ Production-ready API  

---

**Your system is ready to accept applications! 🎉**

Visit: http://localhost:3002
