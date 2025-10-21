# 🚀 Multi-Job Portal System - Complete Setup Guide

## ✅ What's Been Implemented

Your job portal has been completely redesigned to support multiple job postings!

### Backend (Complete)
- ✅ Job Model with all fields (title, department, description, qualifications, location, deadline, status, etc.)
- ✅ Job Controller with full CRUD operations
- ✅ Job Routes (Public & Admin protected routes)
- ✅ Job-Application linking (applications now reference specific jobs)
- ✅ Job Statistics API
- ✅ Sample data seed script

### Admin Dashboard (Complete)
- ✅ Job Management Page with statistics cards
- ✅ Jobs table with Edit, Close/Reopen, Delete actions
- ✅ "Post New Job" form with all required fields
- ✅ Status badges (Open, Closed, Draft)
- ✅ Application count per job

## 🎯 Quick Start

### Step 1: Seed Sample Jobs

```bash
# Run this command to populate your database with 6 sample jobs
cd /home/seth/Documents/code/jobaccord
node server/seed-jobs.js
```

This will create:
1. Social Media Marketing Intern (Marketing)
2. Technical Sales Supervisor (Sales - Biomedical)
3. Customer Service Representative (Customer Support)
4. Accountant (Finance)
5. IT Support Specialist (Information Technology)
6. Human Resources Officer (Human Resources)

### Step 2: Restart Your Server

```bash
# Stop your current server (Ctrl+C)
# Then start it again
node server/server.js
```

### Step 3: Access Admin Dashboard

1. Go to: http://localhost:3000/admin/login
2. Login with:
   - Email: `customerservice@accordmedical.co.ke`
   - Password: `customer2026`
3. Navigate to: http://localhost:3000/admin/jobs

## 📋 Admin Dashboard Features

### Job Management Page (`/admin/jobs`)

**Statistics Cards:**
- Total Jobs
- Open Positions
- Closed Jobs
- Draft Jobs

**Jobs Table Shows:**
- Job Title
- Department
- Location
- Application Deadline
- Status (Open/Closed/Draft)
- Number of Applications
- Action Buttons:
  - ✏️ **Edit** - Modify job details
  - ❌ **Close** - Mark job as closed
  - ✅ **Reopen** - Reopen a closed job
  - 🗑️ **Delete** - Permanently remove job

### Post New Job (`/admin/jobs/new`)

**Required Fields:**
- Job Title
- Department
- Location
- Employment Type (Full-time, Part-time, Contract, Internship)
- Job Description
- Qualifications
- Application Deadline
- Status (Open or Draft)

**Optional Fields:**
- Responsibilities
- Salary Range
- External Application Link

## 🔌 API Endpoints

### Public Endpoints (No Authentication)

```bash
# Get all open jobs
GET /api/jobs/open

# Get single job details
GET /api/jobs/:id/public
```

### Admin Endpoints (Require Authentication)

```bash
# Create new job
POST /api/jobs

# Get all jobs (with filters)
GET /api/jobs?status=open&department=Marketing

# Get job statistics
GET /api/jobs/statistics

# Get single job
GET /api/jobs/:id

# Update job
PUT /api/jobs/:id

# Delete job
DELETE /api/jobs/:id

# Close job
PATCH /api/jobs/:id/close

# Reopen job
PATCH /api/jobs/:id/reopen
```

## 🧪 Testing

### Test Job Creation

1. Visit http://localhost:3000/admin/jobs
2. Click "Post New Job"
3. Fill in the form:
   - Title: "Test Job Position"
   - Department: "Test Department"
   - Location: "Nairobi"
   - Employment Type: "Full-time"
   - Description: "This is a test job"
   - Qualifications: "Test qualifications"
   - Deadline: (Pick a future date)
   - Status: "Open"
4. Click "Create Job"

### Test API Directly

```bash
# Get all open jobs (no auth needed)
curl http://localhost:5000/api/jobs/open

# Get job statistics (requires auth)
curl http://localhost:5000/api/jobs/statistics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📁 File Structure

```
server/
├── models/
│   ├── Job.js              ✅ New Job model
│   └── Application.js       ✅ Updated with jobId reference
├── controllers/
│   └── jobController.js     ✅ Complete CRUD operations
├── routes/
│   └── jobRoutes.js         ✅ Public & admin routes
├── seed-jobs.js             ✅ Sample data script
└── server.js                ✅ Routes registered

app/admin/jobs/
├── page.tsx                 ✅ Job management dashboard
├── new/
│   └── page.tsx             ✅ Create new job form
└── [id]/
    └── edit/
        └── page.tsx         🚧 To be created (copy from new/page.tsx)
```

## 🎨 Next Steps

### 1. Create Edit Job Page

Copy the "new job" form and modify it to load and update existing jobs:

```bash
# You'll need to create:
app/admin/jobs/[id]/edit/page.tsx
```

### 2. Create Public Job Listings Page

Create a page where job seekers can browse all open positions:

```bash
# Create these files:
app/jobs/page.tsx              # List all open jobs
app/jobs/[id]/page.tsx         # Individual job details
app/jobs/[id]/apply/page.tsx   # Application form
```

### 3. Update Application Form

Modify the application form to include job selection or link it to specific jobs.

### 4. Add Job Search & Filters

Add search and filter functionality on the public jobs page:
- Search by title or keywords
- Filter by department
- Filter by location
- Filter by employment type

### 5. Email Notifications

Update email service to notify admins when applications are submitted for specific jobs.

## 🔧 Common Tasks

### Add a New Job Manually

1. Login to admin panel
2. Go to "Jobs" section
3. Click "Post New Job"
4. Fill the form and save

### Close a Job

1. Go to Jobs page
2. Find the job
3. Click the "Close" (❌) button

### Delete a Job

1. Go to Jobs page
2. Find the job
3. Click the "Delete" (🗑️) button
4. Confirm deletion

### View Applications for a Job

Currently shows application count. Next step: Click on the count to view all applications for that specific job.

## 📊 Database Schema

### Job Model
```javascript
{
  title: String,              // e.g., "Software Engineer"
  department: String,          // e.g., "Engineering"
  description: String,         // Full job description
  qualifications: String,      // Required qualifications
  responsibilities: String,    // Job responsibilities
  location: String,            // e.g., "Nairobi"
  employmentType: String,      // 'full-time', 'part-time', 'contract', 'internship'
  deadline: Date,              // Application deadline
  salary: String,              // e.g., "Ksh 50,000 - 70,000"
  link: String,                // External application link (optional)
  status: String,              // 'open', 'closed', 'draft'
  applicationCount: Number,    // Number of applications
  postedBy: ObjectId,          // Admin who posted
  createdAt: Date,
  updatedAt: Date
}
```

### Application Model (Updated)
```javascript
{
  jobId: ObjectId,             // Reference to Job ✅ NEW
  jobTitle: String,            // Job title ✅ NEW
  fullName: String,
  email: String,
  // ... all other fields
}
```

## 🐛 Troubleshooting

### Jobs not showing in admin panel?
- Check if server is running
- Check if you're logged in
- Check browser console for errors
- Run the seed script to add sample data

### Can't create new job?
- Ensure you're logged in as admin
- Check that all required fields are filled
- Check server logs for errors

### API returns 404?
- Ensure server is restarted after code changes
- Check that job routes are registered in server.js

## 🎉 Success!

You now have a fully functional multi-job portal where you can:
✅ Post multiple job openings
✅ Manage all jobs from one dashboard
✅ Track applications per job
✅ Close/reopen jobs as needed
✅ View statistics and metrics

Ready to customize further? Check the "Next Steps" section above!
