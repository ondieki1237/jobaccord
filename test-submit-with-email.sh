#!/bin/bash

echo "========================================"
echo "Testing Application Submission with Email"
echo "========================================"
echo ""

# Wait for server to be ready
echo "Waiting for server to be ready..."
sleep 3

# Test application submission
echo "Submitting test application..."
echo ""

response=$(curl -s -X POST https://api.codewithseth.co.ke/api/applications/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Email Test User",
    "email": "eucabethmoraam1102@gmail.com",
    "phone": "+254729115000",
    "location": "Nairobi, Kenya",
    "eligibleToWork": "yes",
    "cvLink": "https://drive.google.com/file/d/test123/view",
    "hasDegree": "yes",
    "degreeDetails": "BSc Computer Science",
    "yearsExperience": "2-3",
    "hasSupervised": "yes",
    "leadershipDescription": "Led a team of 5 developers",
    "equipmentExperience": "Medical devices",
    "majorSaleDescription": "Closed a major deal",
    "strengths": ["Sales", "Leadership"],
    "crmProficiency": "4",
    "trainingExample": "Trained new hires",
    "motivation": "Passionate about healthcare",
    "hadSalesTarget": "yes",
    "targetPerformance": "120% of target",
    "teamMotivation": "Team building activities",
    "leadershipStyle": "Collaborative",
    "challenges": "Managing deadlines",
    "difficultClients": "Listen and empathize",
    "crossDepartment": "Worked with finance",
    "whyJoin": "Leader in innovation",
    "availableStart": "2025-11-01",
    "achievementsLink": "",
    "additionalDetails": "Open to travel",
    "additionalDocuments": []
  }')

echo "Response:"
echo "$response" | jq '.'
echo ""
echo "========================================"
echo "Check the server terminal for detailed email logs"
echo "Look for:"
echo "  - ✅ Confirmation email sent"
echo "  - ✅ Admin notification sent"
echo "  OR"
echo "  - ❌ Email sending error"
echo "========================================"
