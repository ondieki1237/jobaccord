# Accord Medical Job Application - Backend Setup

## Overview
This backend provides API services for the Accord Medical job application system, including:
- Application submission with MongoDB storage
- Email notifications to applicants and admins
- Admin authentication and authorization
- Application management (CRUD operations)
- Rate limiting and security features

## Tech Stack
- **Express.js** - Web server framework
- **MongoDB** - Database with Mongoose ODM
- **Nodemailer** - Email service
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Rate Limiting** - API protection

## Setup Instructions

### 1. Environment Variables
Ensure your `.env` file contains all required variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
ADMIN_EMAIL=customerservice@accordmedical.co.ke
ADMIN_PASSWORD=customer2026
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_password
EMAIL_FROM="Accord Medical <no-reply@example.com>"
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Create Initial Admin
```bash
npm run create-admin
```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run server:dev
```

**Production:**
```bash
npm run server
```

**Run both frontend and backend:**
```bash
npm run dev:all
```

## API Endpoints

### Public Routes

#### Submit Application
```
POST /api/applications/submit
Body: {
  fullName, email, phone, location, eligibleToWork,
  cvLink, ... (all form fields)
}
```

#### Admin Login
```
POST /api/auth/login
Body: { email, password }
```

### Protected Routes (Require JWT Token)

#### Get All Applications
```
GET /api/applications?status=pending&page=1&limit=10
Headers: { Authorization: "Bearer <token>" }
```

#### Get Application by ID
```
GET /api/applications/:id
Headers: { Authorization: "Bearer <token>" }
```

#### Update Application Status
```
PUT /api/applications/:id
Headers: { Authorization: "Bearer <token>" }
Body: { status: "shortlisted", notes: "..." }
```

#### Delete Application
```
DELETE /api/applications/:id
Headers: { Authorization: "Bearer <token>" }
```

#### Get Statistics
```
GET /api/applications/statistics
Headers: { Authorization: "Bearer <token>" }
```

#### Get Admin Profile
```
GET /api/auth/profile
Headers: { Authorization: "Bearer <token>" }
```

## Email Configuration

The system sends two types of emails:

1. **Applicant Confirmation** - Professional email with application details
2. **Admin Notification** - Alert to HR team with applicant summary

### SMTP Configuration
Update these variables in `.env`:
- `EMAIL_HOST` - SMTP server (e.g., smtp.gmail.com)
- `EMAIL_PORT` - Port (587 for TLS, 465 for SSL)
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `EMAIL_FROM` - Sender name and email

### Gmail Setup Example
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM="Accord Medical <your-email@gmail.com>"
```

**Note:** For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an "App Password"
3. Use the app password in EMAIL_PASS

## Security Features

- **Helmet.js** - Sets security headers
- **CORS** - Configurable cross-origin requests
- **Rate Limiting** - 3 submissions per 15 min per IP
- **JWT Authentication** - Token-based admin auth
- **Password Hashing** - Bcrypt with salt rounds
- **Input Validation** - Email and required field checks

## Database Schema

### Application Model
- Personal information (name, email, phone, location)
- Experience details (degree, years, supervision)
- Skills and competencies
- Leadership and results
- Cultural fit responses
- Document links (CV, achievements)
- Status tracking (pending, reviewed, shortlisted, rejected, hired)
- Timestamps and metadata

### Admin Model
- Email and password (hashed)
- Role (admin, super-admin)
- Active status
- Last login tracking

## Development Tips

### Testing Email Locally
Use a service like [Mailtrap](https://mailtrap.io/) or [Ethereal](https://ethereal.email/) for testing emails without sending real emails.

### MongoDB Connection
Ensure your MongoDB Atlas:
1. Has the correct IP whitelist (0.0.0.0/0 for development)
2. User has read/write permissions
3. Database name matches your connection string

### Debugging
- Check server logs for errors
- MongoDB errors usually indicate connection issues
- Email errors are logged but don't block submissions

## Production Deployment

1. **Environment**: Set `NODE_ENV=production`
2. **Security**: 
   - Change JWT_SECRET to a strong random string
   - Update admin password after first login
   - Restrict CORS origins
3. **Database**: Use MongoDB Atlas or managed instance
4. **Email**: Configure production SMTP service
5. **Hosting**: Deploy to Heroku, AWS, DigitalOcean, etc.

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGODB_URI format
- Verify network access in MongoDB Atlas
- Ensure database user credentials are correct

### "Email not sending"
- Verify SMTP credentials
- Check EMAIL_HOST and EMAIL_PORT
- Test with a different SMTP provider

### "Token invalid"
- JWT_SECRET must be the same across restarts
- Check token format: "Bearer <token>"
- Token expires after JWT_EXPIRE duration

## Support
For issues or questions, contact the development team.
