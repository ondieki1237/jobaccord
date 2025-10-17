# Postman Testing Guide for Job Application API

## Backend Server
Make sure the backend server is running:
```bash
cd /home/seth/Documents/ACCORD/jobaccord/server
node server.js
```

Server should be running at: `http://localhost:5000`

---

## Test Application Submission

### Endpoint
```
POST http://localhost:5000/api/applications/submit
```

### Headers
```
Content-Type: application/json
```

### Body (raw JSON)
Use the contents from `sample-application.json`:

```json
{
  "fullName": "Jane Doe",
  "email": "janedoe@example.com",
  "phone": "+254729115000",
  "location": "Nairobi, Kenya",
  "eligibleToWork": "yes",
  "hasDegree": "yes",
  "degreeDetails": "BSc Biomedical Engineering, University of Nairobi",
  "yearsExperience": "5",
  "hasSupervised": "yes",
  "leadershipDescription": "Led a team of 8 sales reps for 2 years.",
  "equipmentExperience": "Handled installation and sales of MRI, CT, and X-ray machines.",
  "majorSaleDescription": "Closed a KES 10M deal with Kenyatta Hospital.",
  "strengths": [
    "Sales strategy & negotiation",
    "Client relationship management",
    "Team leadership"
  ],
  "crmProficiency": "4",
  "trainingExample": "Trained new hires on CRM and product demos.",
  "motivation": "Driven by results and client satisfaction.",
  "hadSalesTarget": "yes",
  "targetPerformance": "Achieved 120% of annual target in 2024.",
  "teamMotivation": "Organized monthly team-building and recognition events.",
  "leadershipStyle": "Collaborative and goal-oriented.",
  "challenges": "Managing client expectations and tight deadlines.",
  "difficultClients": "Listen, empathize, and offer solutions.",
  "crossDepartment": "Worked with logistics and finance to deliver urgent orders.",
  "whyJoin": "Accord Medical is a leader in innovation and client care.",
  "availableStart": "2025-11-01",
  "cvLink": "https://example.com/jane-doe-cv.pdf",
  "achievementsLink": "https://example.com/jane-doe-awards.pdf",
  "additionalDetails": "Open to relocation and travel.",
  "additionalDocuments": [
    { "label": "Recommendation Letter", "url": "https://example.com/recommendation.pdf" },
    { "label": "Portfolio", "url": "https://example.com/portfolio.pdf" }
  ]
}
```

### Expected Success Response
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "applicationId": "APP-1729155000000-ABC123DEF",
    "email": "janedoe@example.com",
    "emailSent": true
  }
}
```

### What Happens
1. ✅ Application is saved to MongoDB
2. ✅ Confirmation email sent to applicant (janedoe@example.com)
3. ✅ Notification email sent to admin (humanresource@accordmedical.co.ke)

---

## Check Server Logs
After submitting, check your terminal where the server is running. You should see:
```
✅ Email sent successfully: <message-id>
✅ Email sent successfully: <message-id>
```

---

## Troubleshooting

### "Route not found"
- Make sure you're using: `POST http://localhost:5000/api/applications/submit`
- Not: `/api/applications` or `/api/submit-application`

### "Missing required field"
- Make sure all required fields are included:
  - fullName
  - email
  - phone
  - location
  - eligibleToWork
  - cvLink

### Email not sending
- Check server logs for email errors
- Verify EMAIL_* environment variables in `server/.env`
- Port 587 should be used for SMTP

---

## Other Available Endpoints

### Get All Applications (Admin)
```
GET http://localhost:5000/api/applications
Headers: Authorization: Bearer <JWT_TOKEN>
```

### Get Application by ID (Admin)
```
GET http://localhost:5000/api/applications/:id
Headers: Authorization: Bearer <JWT_TOKEN>
```

### Admin Login
```
POST http://localhost:5000/api/auth/login
Body:
{
  "email": "humanresource@accordmedical.co.ke",
  "password": "accord2026"
}
```

Response will include a JWT token for protected routes.
