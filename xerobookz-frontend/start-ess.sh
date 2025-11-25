#!/bin/bash

set -e

echo "🌐 Starting ESS Web..."

cd ess-web

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create .env.local
if [ ! -f ".env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
fi

echo "🚀 Starting on http://localhost:3002"
PORT=3002 npm run dev

