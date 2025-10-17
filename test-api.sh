#!/bin/bash

# Test API Health Check
echo "🔍 Testing API Health..."
curl -s https://api.codewithseth.co.ke/api/health | json_pp

echo -e "\n\n"

# Test Application Statistics (requires login first)
echo "🔐 Testing Admin Login..."
TOKEN=$(curl -s -X POST https://api.codewithseth.co.ke/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customerservice@accordmedical.co.ke",
    "password": "customer2026"
  }' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed"
  exit 1
fi

echo "✅ Login successful! Token: ${TOKEN:0:20}..."

echo -e "\n\n"

# Get Statistics
echo "📊 Getting Application Statistics..."
curl -s https://api.codewithseth.co.ke/api/applications/statistics \
  -H "Authorization: Bearer $TOKEN" | json_pp

echo -e "\n\n"

# Get All Applications
echo "📋 Getting All Applications..."
curl -s "https://api.codewithseth.co.ke/api/applications?limit=5" \
  -H "Authorization: Bearer $TOKEN" | json_pp

echo -e "\n\n✅ API Test Complete!"
