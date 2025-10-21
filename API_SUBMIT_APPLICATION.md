# 📡 Job Application Submission API

## 🎯 API Endpoint for Submit Button

### **Endpoint Details**

```
POST /api/submit-application
```

**Full URLs:**
- **Local Development**: `http://localhost:3002/api/submit-application`
- **Production Backend**: `https://api.codewithseth.co.ke/api/applications/submit`

---

## 🔧 How It Works

### **Frontend Click Handler**

```typescript
const handleSubmit = async () => {
  setIsSubmitting(true)

  try {
    const response = await fetch("/api/submit-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setShowSuccess(true)
    } else {
      alert("There was an error submitting your application. Please try again.")
    }
  } catch (error) {
    console.error("Submission error:", error)
    alert("There was an error submitting your application. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}
```

### **API Route Handler** (`/app/api/submit-application/route.ts`)

The Next.js API route forwards the request to the backend:

```typescript
POST /api/submit-application
  ↓
Validates required fields
  ↓
Forwards to → https://api.codewithseth.co.ke/api/applications/submit
  ↓
Backend processes and saves to MongoDB
  ↓
Sends confirmation emails
  ↓
Returns success response
```

---

## 📋 Request Format

### **Headers**
```json
{
  "Content-Type": "application/json"
}
```

### **Method**
```
POST
```

### **Body (JSON)**

#### **Complete JSON Structure:**

```json
{
  "fullName": "Jane Doe",
  "email": "janedoe@example.com",
  "phone": "+254729115000",
  "location": "Nairobi, Kenya",
  "eligibleToWork": "yes",
  "hasDegree": "yes",
  "degreeDetails": "BSc Biomedical Engineering, University of Nairobi",
  "yearsExperience": "2-3",
  "hasSupervised": "yes",
  "leadershipDescription": "Led a team of 8 sales reps for 2 years in medical equipment sales",
  "equipmentExperience": "Handled installation and sales of MRI, CT, and X-ray machines",
  "majorSaleDescription": "Closed a KES 10M deal with Kenyatta Hospital for imaging equipment",
  "strengths": [
    "Sales strategy & negotiation",
    "Client relationship management",
    "Team leadership"
  ],
  "crmProficiency": "4",
  "trainingExample": "Trained new hires on CRM systems and product demonstrations",
  "motivation": "Driven by results and client satisfaction in healthcare sector",
  "hadSalesTarget": "yes",
  "targetPerformance": "Achieved 120% of annual sales target in 2024",
  "teamMotivation": "Organized monthly team-building and recognition events",
  "leadershipStyle": "Collaborative and goal-oriented approach",
  "challenges": "Managing client expectations and tight deadlines in medical procurement",
  "difficultClients": "Listen actively, empathize with concerns, and offer tailored solutions",
  "crossDepartment": "Worked with logistics and finance to deliver urgent hospital orders",
  "whyJoin": "Accord Medical is a leader in innovation and client care in East Africa",
  "availableStart": "2025-11-01",
  "cvLink": "https://drive.google.com/file/d/abc123/view",
  "achievementsLink": "https://drive.google.com/file/d/xyz789/view",
  "additionalDetails": "Open to relocation and travel. Available for immediate start.",
  "additionalDocuments": [
    {
      "label": "Recommendation Letter",
      "url": "https://drive.google.com/file/d/rec001/view"
    },
    {
      "label": "Sales Portfolio",
      "url": "https://drive.google.com/file/d/port001/view"
    },
    {
      "label": "Certifications",
      "url": "https://drive.google.com/file/d/cert001/view"
    }
  ]
}
```

---

## 📝 Field Descriptions

### **Basic Information** (Required ✅)
| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `fullName` | String | ✅ | "Jane Doe" | Applicant's full name |
| `email` | String | ✅ | "jane@example.com" | Valid email format |
| `phone` | String | ✅ | "+254729115000" | Phone number |
| `location` | String | ✅ | "Nairobi, Kenya" | Current location |
| `eligibleToWork` | String | ✅ | "yes" or "no" | Work eligibility |

### **Experience & Background**
| Field | Type | Required | Example | Options |
|-------|------|----------|---------|---------|
| `hasDegree` | String | ❌ | "yes" | "yes" or "no" |
| `degreeDetails` | String | ❌ | "BSc Biomedical Engineering" | Degree info if yes |
| `yearsExperience` | String | ❌ | "2-3" | "less-than-1", "1-2", "2-3", "over-3" |
| `hasSupervised` | String | ❌ | "yes" | "yes" or "no" |
| `leadershipDescription` | String | ❌ | "Led team of 8..." | Leadership experience |
| `equipmentExperience` | String | ❌ | "MRI, CT scanners..." | Equipment handled |
| `majorSaleDescription` | String | ❌ | "KES 10M deal..." | Major achievement |

### **Skills & Competencies**
| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `strengths` | Array | ❌ | ["Sales", "Leadership"] | Selected strengths |
| `crmProficiency` | String | ❌ | "4" | Scale 1-5 |
| `trainingExample` | String | ❌ | "Trained 10 staff..." | Training experience |
| `motivation` | String | ❌ | "Driven by results..." | What drives you |

### **Results & Leadership**
| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `hadSalesTarget` | String | ❌ | "yes" | "yes" or "no" |
| `targetPerformance` | String | ❌ | "120% of target" | Performance details |
| `teamMotivation` | String | ❌ | "Team building..." | How you motivate |
| `leadershipStyle` | String | ❌ | "Collaborative..." | Your approach |
| `challenges` | String | ❌ | "Tight deadlines..." | Challenges faced |

### **Culture & Fit**
| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `difficultClients` | String | ❌ | "Listen and empathize..." | Client handling |
| `crossDepartment` | String | ❌ | "Worked with finance..." | Cross-dept work |
| `whyJoin` | String | ❌ | "Leader in innovation..." | Why this company |
| `availableStart` | String | ❌ | "2025-11-01" | Start date |

### **Attachments** (CV Required ✅)
| Field | Type | Required | Example | Notes |
|-------|------|----------|---------|-------|
| `cvLink` | String | ✅ | "https://drive.google.com/..." | CV/Resume URL |
| `achievementsLink` | String | ❌ | "https://..." | Achievements proof |
| `additionalDetails` | String | ❌ | "Open to travel..." | Additional info |
| `additionalDocuments` | Array | ❌ | `[{label, url}]` | Extra documents |

**additionalDocuments Array Structure:**
```json
[
  {
    "label": "Document Name",
    "url": "https://example.com/doc.pdf"
  }
]
```

---

## ✅ Success Response

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "applicationId": "APP-1697529600000-ABC123XYZ",
  "emailSent": true
}
```

**Response Details:**
- **Status Code**: `200 OK`
- **applicationId**: Unique identifier for tracking
- **emailSent**: Confirmation email delivery status

---

## ❌ Error Responses

### **Missing Required Field**
```json
{
  "success": false,
  "error": "Missing required field: fullName"
}
```
**Status Code**: `400 Bad Request`

### **Invalid Email Format**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```
**Status Code**: `400 Bad Request`

### **Server Error**
```json
{
  "success": false,
  "error": "Failed to process application. Please try again later."
}
```
**Status Code**: `500 Internal Server Error`

### **Rate Limit Exceeded**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```
**Status Code**: `429 Too Many Requests`

---

## 🔄 Complete Flow

```
User clicks Submit
  ↓
Frontend: handleSubmit() triggered
  ↓
POST /api/submit-application with formData
  ↓
Next.js API Route validates data
  ↓
Forwards to Backend: POST /api/applications/submit
  ↓
Backend validates & generates applicationId
  ↓
Saves to MongoDB
  ↓
Sends confirmation email to applicant
  ↓
Sends notification email to admin
  ↓
Returns success response
  ↓
Frontend shows success modal
```

---

## 🧪 Testing Examples

### **Using cURL:**

```bash
curl -X POST http://localhost:3002/api/submit-application \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+254700000000",
    "location": "Nairobi",
    "eligibleToWork": "yes",
    "cvLink": "https://example.com/cv.pdf"
  }'
```

### **Using JavaScript/Fetch:**

```javascript
const formData = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+254700000000",
  location: "Nairobi",
  eligibleToWork: "yes",
  hasDegree: "yes",
  degreeDetails: "BSc Computer Science",
  yearsExperience: "2-3",
  cvLink: "https://example.com/cv.pdf",
  // ... other fields
};

fetch('/api/submit-application', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

### **Using Postman:**

1. **Method**: `POST`
2. **URL**: `http://localhost:3002/api/submit-application`
3. **Headers**: 
   - `Content-Type: application/json`
4. **Body** (raw JSON): Paste the complete JSON structure above

---

## 📧 What Happens After Submission

### **1. Application Saved**
- Stored in MongoDB with unique `applicationId`
- Status set to `"pending"`
- Timestamp recorded

### **2. Emails Sent**

**To Applicant:**
- Subject: "Application Received - Technical Sales Supervisor Position"
- Contains: Application ID, submission confirmation, next steps
- From: Accord Medical HR

**To Admin:**
- Subject: "New Application - Technical Sales Supervisor"
- Contains: Applicant details, quick review link
- To: customerservice@accordmedical.co.ke

### **3. Admin Dashboard Updated**
- Application appears in admin panel
- Visible in "Pending Review" status
- Searchable and filterable

---

## 🔒 Security Features

- ✅ Rate limiting: Max submissions per IP
- ✅ Input validation on both frontend and backend
- ✅ Email format validation
- ✅ Required field enforcement
- ✅ XSS protection via headers
- ✅ CORS configured

---

## 💡 Tips for Integration

1. **Always validate on frontend** before submitting
2. **Show loading state** during submission
3. **Handle all error cases** gracefully
4. **Display success message** with application ID
5. **Clear form** or redirect after success
6. **Implement retry logic** for network failures
7. **Store application ID** for user reference

---

## 📱 Mobile Considerations

- Works on all devices
- Responsive design
- Touch-friendly submit button
- Mobile-optimized forms
- Works on slow networks

---

## 🆘 Troubleshooting

**Issue**: "Failed to submit application"
- **Solution**: Check network connection, verify backend is running

**Issue**: "Missing required field" error
- **Solution**: Ensure fullName, email, phone, location, eligibleToWork, and cvLink are provided

**Issue**: Email not sent
- **Solution**: Check SMTP configuration in backend `.env` file

**Issue**: Rate limit exceeded
- **Solution**: Wait 15 minutes before resubmitting

---

## 📞 Support

For API issues or questions:
- Email: customerservice@accordmedical.co.ke
- Check logs: `server/server.js` console output
- Review: `POSTMAN_TESTING_GUIDE.md`
