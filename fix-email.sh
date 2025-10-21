#!/bin/bash

# Quick Fix Script for Email Not Sending Issue
# This script will start the backend server locally so emails can be sent

echo "========================================"
echo "🔧 Email Fix - Starting Local Backend"
echo "========================================"
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found"
    echo "Please create .env file with required environment variables"
    exit 1
fi

# Create or update .env.local for frontend
echo "📝 Configuring frontend to use local backend..."
echo "NEXT_PUBLIC_API_URL=https://api.codewithseth.co.ke" > .env.local

# Check if backend server is already running
if curl -s https://api.codewithseth.co.ke/api/health > /dev/null 2>&1; then
    echo "✅ Backend server is already running on port 5000"
else
    echo "🚀 Starting backend server..."
    echo ""
    echo "📧 Email sending will now work through your local network"
    echo "Press Ctrl+C to stop the server"
    echo ""
    echo "In another terminal, run: npm run dev"
    echo "Then visit: http://localhost:3002"
    echo ""
    echo "========================================"
    echo ""
    
    # Start the backend server
    npm run server:dev
fi
