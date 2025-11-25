#!/bin/bash

set -e

echo "🚀 Starting XeroBookz Frontend Applications..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install shared packages first
echo ""
echo "📦 Installing shared packages..."

echo "  → Installing ui-shared..."
cd ui-shared
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run build
cd ..

echo "  → Installing api-clients..."
cd api-clients
if [ ! -d "node_modules" ]; then
    npm install
fi
npm run build
cd ..

# Start admin-web
echo ""
echo "🌐 Starting Admin Web (port 3000)..."
cd admin-web
if [ ! -d "node_modules" ]; then
    echo "  → Installing dependencies..."
    npm install
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    echo "✅ Created .env.local"
fi

# Start in background
npm run dev > ../admin-web.log 2>&1 &
ADMIN_PID=$!
echo "  → Admin Web started (PID: $ADMIN_PID)"
cd ..

# Start employer-web
echo ""
echo "🌐 Starting Employer Web (port 3001)..."
cd employer-web
if [ ! -d "node_modules" ]; then
    echo "  → Installing dependencies..."
    npm install
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    echo "✅ Created .env.local"
fi

# Start in background
PORT=3001 npm run dev > ../employer-web.log 2>&1 &
EMPLOYER_PID=$!
echo "  → Employer Web started (PID: $EMPLOYER_PID)"
cd ..

# Start ess-web
echo ""
echo "🌐 Starting ESS Web (port 3002)..."
cd ess-web
if [ ! -d "node_modules" ]; then
    echo "  → Installing dependencies..."
    npm install
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    echo "✅ Created .env.local"
fi

# Start in background
PORT=3002 npm run dev > ../ess-web.log 2>&1 &
ESS_PID=$!
echo "  → ESS Web started (PID: $ESS_PID)"
cd ..

# Save PIDs
echo "$ADMIN_PID" > .frontend-pids
echo "$EMPLOYER_PID" >> .frontend-pids
echo "$ESS_PID" >> .frontend-pids

echo ""
echo "✅ All frontend applications are starting!"
echo ""
echo "📊 Application URLs:"
echo "   - Admin Web:    http://localhost:3000"
echo "   - Employer Web: http://localhost:3001"
echo "   - ESS Web:      http://localhost:3002"
echo ""
echo "📝 Logs:"
echo "   - Admin:    tail -f admin-web.log"
echo "   - Employer: tail -f employer-web.log"
echo "   - ESS:      tail -f ess-web.log"
echo ""
echo "🛑 To stop all: ./stop-frontend.sh"
echo ""

