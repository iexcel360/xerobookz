#!/bin/bash
set -e

echo "🔨 Building XeroBookz Admin Web for Vercel..."

# Get the root directory (assuming we're in admin-web)
ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/xerobookz-frontend"

echo "📦 Step 1: Building ui-shared package..."
cd "$FRONTEND_DIR/ui-shared"
npm install
npm run build

echo "📦 Step 2: Building api-clients package..."
cd "$FRONTEND_DIR/api-clients"
npm install
npm run build

echo "📦 Step 3: Building admin-web..."
cd "$FRONTEND_DIR/admin-web"
npm install
npm run build

echo "✅ Build completed successfully!"

