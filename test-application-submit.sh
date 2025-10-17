#!/bin/bash

# Job Application API Testing Script
# Usage: ./test-application-submit.sh

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================"
echo "Job Application Submission API Test"
echo "========================================"
echo ""

# API Configuration
API_URL="http://localhost:3002/api/submit-application"
# For production, use: API_URL="https://api.codewithseth.co.ke/api/applications/submit"

echo -e "${YELLOW}Testing API:${NC} $API_URL"
echo ""

# Test 1: Minimal Required Fields Only
echo -e "${YELLOW}Test 1:${NC} Submitting with minimal required fields..."
response1=$(curl -s -w "\n%{http_code}" -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+254700000000",
    "location": "Nairobi",
    "eligibleToWork": "yes",
    "cvLink": "https://example.com/cv.pdf"
  }')

http_code1=$(echo "$response1" | tail -n1)
body1=$(echo "$response1" | sed '$d')

if [ "$http_code1" = "200" ]; then
  echo -e "${GREEN}✓ Success${NC} - Status: $http_code1"
  echo "Response: $body1"
else
  echo -e "${RED}✗ Failed${NC} - Status: $http_code1"
  echo "Response: $body1"
fi
echo ""

# Test 2: Complete Application
echo -e "${YELLOW}Test 2:${NC} Submitting complete application..."
response2=$(curl -s -w "\n%{http_code}" -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d @application-template.json)

http_code2=$(echo "$response2" | tail -n1)
body2=$(echo "$response2" | sed '$d')

if [ "$http_code2" = "200" ]; then
  echo -e "${GREEN}✓ Success${NC} - Status: $http_code2"
  echo "Response: $body2"
else
  echo -e "${RED}✗ Failed${NC} - Status: $http_code2"
  echo "Response: $body2"
fi
echo ""

# Test 3: Missing Required Field (should fail)
echo -e "${YELLOW}Test 3:${NC} Testing validation - missing email (should fail)..."
response3=$(curl -s -w "\n%{http_code}" -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phone": "+254700000000",
    "location": "Nairobi",
    "eligibleToWork": "yes",
    "cvLink": "https://example.com/cv.pdf"
  }')

http_code3=$(echo "$response3" | tail -n1)
body3=$(echo "$response3" | sed '$d')

if [ "$http_code3" = "400" ]; then
  echo -e "${GREEN}✓ Validation working correctly${NC} - Status: $http_code3"
  echo "Response: $body3"
else
  echo -e "${RED}✗ Validation not working${NC} - Status: $http_code3"
  echo "Response: $body3"
fi
echo ""

# Test 4: Invalid Email Format (should fail)
echo -e "${YELLOW}Test 4:${NC} Testing email validation - invalid format (should fail)..."
response4=$(curl -s -w "\n%{http_code}" -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "invalid-email",
    "phone": "+254700000000",
    "location": "Nairobi",
    "eligibleToWork": "yes",
    "cvLink": "https://example.com/cv.pdf"
  }')

http_code4=$(echo "$response4" | tail -n1)
body4=$(echo "$response4" | sed '$d')

if [ "$http_code4" = "400" ]; then
  echo -e "${GREEN}✓ Email validation working${NC} - Status: $http_code4"
  echo "Response: $body4"
else
  echo -e "${RED}✗ Email validation not working${NC} - Status: $http_code4"
  echo "Response: $body4"
fi
echo ""

echo "========================================"
echo "Test Summary"
echo "========================================"
echo "Total Tests: 4"

success_count=0
[ "$http_code1" = "200" ] && ((success_count++))
[ "$http_code2" = "200" ] && ((success_count++))
[ "$http_code3" = "400" ] && ((success_count++))
[ "$http_code4" = "400" ] && ((success_count++))

echo -e "Passed: ${GREEN}$success_count${NC}"
echo -e "Failed: ${RED}$((4 - success_count))${NC}"
echo ""
