#!/bin/bash

echo "🎨 Restarting XeroBookz with Modern UI..."
echo ""

# Stop any running Next.js servers
echo "Stopping existing servers..."
pkill -f "next-server" || true
sleep 2

# Rebuild ui-shared
echo "📦 Rebuilding ui-shared package..."
cd ui-shared
npm run build
cd ..

# Clear Next.js caches
echo "🧹 Clearing Next.js caches..."
cd admin-web && rm -rf .next && cd ..
cd employer-web && rm -rf .next && cd ..
cd ess-web && rm -rf .next && cd ..

echo ""
echo "✅ Ready! Now start the apps:"
echo ""
echo "   Terminal 1: cd admin-web && npm run dev"
echo "   Terminal 2: cd employer-web && npm run dev"
echo "   Terminal 3: cd ess-web && npm run dev"
echo ""
echo "   Or use: ./start-all.sh"
echo ""
echo "💡 Tip: Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)"
echo "   to clear cached styles after restarting."

