# 🔐 Admin Dashboard - User Guide

## Overview
The Admin Dashboard provides a comprehensive interface to manage job applications for the Technical Sales Supervisor position at Accord Medical Supplies Ltd.

---

## 🚀 Access the Dashboard

### URL
```
http://localhost:3002/admin
```

### Default Login Credentials
- **Email**: `customerservice@accordmedical.co.ke`
- **Password**: `customer2026`

⚠️ **Security Note**: Change the default password in production!

---

## 📱 Dashboard Features

### 1. **Login Page** (`/admin/login`)
- Secure JWT-based authentication
- Email and password validation
- Auto-redirect if already logged in
- Professional branded interface

### 2. **Dashboard** (`/admin/dashboard`)
- **Statistics Overview**:
  - Total Applications
  - Pending Review (requires action)
  - Reviewed (initial screening done)
  - Shortlisted (ready for interview)
  - Rejected (not proceeding)
  - Hired (successfully recruited)

- **Recent Applications**:
  - Shows latest 5 submissions
  - Quick status badges
  - Application ID tracking
  - Submission timestamps
  - Direct links to detailed views

### 3. **Applications List** (`/admin/applications`)
- **Search Functionality**:
  - Search by candidate name
  - Search by email
  - Search by application ID

- **Filtering**:
  - Filter by status (All, Pending, Reviewed, Shortlisted, Rejected, Hired)
  - Real-time filter updates

- **Pagination**:
  - 10 applications per page
  - Next/Previous navigation
  - Page counter

- **Table View** (Desktop):
  - Application ID
  - Candidate name and location
  - Contact information (email & phone)
  - Experience level
  - Submission date
  - Current status
  - Quick action buttons

- **Card View** (Mobile):
  - Responsive design for mobile devices
  - All key information displayed
  - Touch-friendly action buttons

### 4. **Application Detail** (`/admin/applications/[id]`)
Comprehensive view of individual applications with:

#### **Contact Information Section**
- Full name
- Email (clickable to send email)
- Phone (clickable to call)
- Location
- Work eligibility status
- Availability start date

#### **Experience & Background Section**
- Education details (degree status and specifics)
- Years of experience
- Leadership/supervisory experience
- Equipment experience
- Major sales achievements

#### **Skills & Competencies Section**
- Key strengths (visual badges)
- CRM proficiency rating (1-5 scale)
- Training/mentoring examples
- Motivation for biomedical sales

#### **Results & Leadership Section**
- Sales target experience
- Target performance history
- Team motivation strategies
- Leadership style description
- Industry challenges insights

#### **Culture & Fit Section**
- Difficult client handling approach
- Cross-departmental collaboration examples
- Reasons for joining Accord Medical
- Company culture alignment

#### **Documents & Attachments**
- CV/Resume link (direct access)
- Achievements/Awards documentation
- Additional supporting documents
- All links open in new tab

#### **Update Application Panel** (Sidebar)
- **Status Management**:
  - Change application status (Pending → Reviewed → Shortlisted → Rejected/Hired)
  - Status dropdown with all options
  
- **Internal Notes**:
  - Add reviewer comments
  - Track decision rationale
  - Team communication notes

- **Quick Actions**:
  - Send email directly
  - Call applicant
  - Download CV
  - All one-click actions

---

## 🎯 Typical Workflow

### Step 1: Review New Applications
1. Log in to admin dashboard
2. View pending applications count
3. Click "View All" or navigate to Applications

### Step 2: Initial Screening
1. Open application detail view
2. Review contact information and eligibility
3. Check educational background
4. Review experience level

### Step 3: Detailed Assessment
1. Evaluate skills and competencies
2. Review sales achievements
3. Assess leadership qualities
4. Check cultural fit responses

### Step 4: Review Documents
1. Open CV/Resume
2. Check achievement documentation
3. Verify credentials

### Step 5: Make Decision
1. Update status (Reviewed, Shortlisted, or Rejected)
2. Add internal notes explaining decision
3. Save changes

### Step 6: Follow-up Actions
1. For shortlisted candidates:
   - Send email for interview scheduling
   - Call to discuss next steps
   
2. For rejected candidates:
   - Update status to maintain records
   - Add notes for future reference

---

## 🔍 Search & Filter Tips

### Search Best Practices
- Use partial names (e.g., "John" finds "John Doe")
- Search by email domain (e.g., "@gmail.com")
- Use application ID for specific lookup

### Filter Strategies
- **Pending**: New applications requiring review
- **Reviewed**: Initial screening completed
- **Shortlisted**: Ready for interview invitations
- **Rejected**: Keep for records/future opportunities
- **Hired**: Successful recruitments

---

## 📊 Status Definitions

| Status | Meaning | Color | Next Action |
|--------|---------|-------|-------------|
| **Pending** | Just submitted, awaiting review | Yellow | Review application |
| **Reviewed** | Initial screening done | Blue | Detailed assessment |
| **Shortlisted** | Qualified for interview | Green | Schedule interview |
| **Rejected** | Not proceeding | Red | Archive/reference |
| **Hired** | Successfully recruited | Purple | Onboarding |

---

## 🔐 Security Features

### Authentication
- JWT token-based authentication
- Tokens stored in localStorage
- Auto-redirect for unauthorized access
- Session persistence across page reloads

### Data Protection
- All API calls require authentication
- Bearer token in headers
- Secure password hashing (bcrypt)
- Admin-only access to sensitive data

### Session Management
- Logout clears all stored data
- Automatic redirect to login
- Token expiration (7 days default)

---

## 📱 Responsive Design

### Desktop (>768px)
- Full table view with all columns
- Sidebar navigation
- Multi-column layout
- Expanded detail views

### Tablet (768px - 1024px)
- Responsive table with adjusted spacing
- Collapsible sidebar
- Optimized card views

### Mobile (<768px)
- Card-based application list
- Stacked detail sections
- Touch-friendly buttons
- Bottom navigation for tabs

---

## 🛠️ Admin Actions Reference

### Dashboard Actions
- **View All Applications**: Navigate to full list
- **Click Application Card**: Open detail view
- **Logout**: End session and return to login

### List Actions
- **Search**: Filter visible applications
- **Filter by Status**: Show specific status only
- **Navigate Pages**: Browse all applications
- **View Details**: Open full application

### Detail Actions
- **Update Status**: Change application state
- **Add Notes**: Record internal comments
- **Save Changes**: Persist updates
- **Send Email**: Open email client
- **Call**: Initiate phone call
- **View Documents**: Open in new tab
- **Back**: Return to list

---

## 💡 Tips & Best Practices

### Efficient Review Process
1. **Batch Review**: Process multiple pending applications at once
2. **Use Notes**: Document decision rationale for team
3. **Status Progression**: Follow logical status flow
4. **Quick Actions**: Use one-click email/call features

### Organization Tips
1. **Regular Review**: Check dashboard daily for new applications
2. **Status Updates**: Keep statuses current
3. **Documentation**: Add notes for all key decisions
4. **Team Communication**: Share notes with hiring team

### Quality Assurance
1. **Verify Credentials**: Always check CV and documents
2. **Contact Verification**: Test email/phone before scheduling
3. **Complete Review**: Read all sections before decision
4. **Notes for Future**: Document for potential re-consideration

---

## 🆘 Troubleshooting

### Can't Login
- Verify email and password
- Check caps lock
- Ensure backend server is running (port 5000)
- Check browser console for errors

### Applications Not Loading
- Check network connection
- Verify backend server is running
- Check browser console for API errors
- Ensure valid authentication token

### Status Update Not Saving
- Check network connection
- Verify you're still logged in
- Refresh page and try again
- Check server logs for errors

### Documents Won't Open
- Verify links are valid
- Check if URLs are publicly accessible
- Try copying link and opening manually
- Contact applicant if link is broken

---

## 🔄 API Endpoints Used

The admin dashboard interacts with these API endpoints:

```
POST   /api/auth/login              - Admin authentication
GET    /api/auth/profile            - Get admin profile
GET    /api/applications            - List all applications
GET    /api/applications/:id        - Get single application
PUT    /api/applications/:id        - Update application
GET    /api/applications/statistics - Get dashboard statistics
```

All endpoints require JWT authentication except login.

---

## 📈 Future Enhancements (Roadmap)

- [ ] Export applications to CSV/Excel
- [ ] Bulk status updates
- [ ] Email templates for common responses
- [ ] Interview scheduling integration
- [ ] Advanced analytics and reporting
- [ ] Applicant comparison tool
- [ ] Document viewer (PDF preview)
- [ ] Activity log/audit trail
- [ ] Multi-admin collaboration features
- [ ] Automated email notifications on status change

---

## 📞 Support

For technical issues or questions:
- Check SETUP_COMPLETE.md
- Review server logs
- Contact system administrator

---

**Admin Dashboard Version**: 1.0.0  
**Last Updated**: October 16, 2025  
**Powered by**: Next.js 15 + Express.js + MongoDB
