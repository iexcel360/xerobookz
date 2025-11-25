#!/bin/bash

set -e

echo "🔧 Fixing and Starting XeroBookz..."

# Check Docker
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Stop any existing containers
echo "🧹 Cleaning up existing containers..."
docker compose down -v 2>/dev/null || true

# Start with minimal setup (databases only)
echo "📦 Starting databases first..."
docker compose -f docker-compose.minimal.yml up -d

echo "⏳ Waiting for databases to be ready..."
sleep 15

# Check database health
echo "🔍 Checking database health..."
if docker exec xerobookz-postgres pg_isready -U xerobookz > /dev/null 2>&1; then
    echo "✅ PostgreSQL: Ready"
else
    echo "❌ PostgreSQL: Not ready"
fi

if docker exec xerobookz-mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB: Ready"
else
    echo "❌ MongoDB: Not ready"
fi

if docker exec xerobookz-redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis: Ready"
else
    echo "❌ Redis: Not ready"
fi

echo ""
echo "📊 Current Status:"
docker compose -f docker-compose.minimal.yml ps

echo ""
echo "✅ Databases are running!"
echo ""
echo "Next steps:"
echo "1. Test database connections"
echo "2. Start services one by one: docker compose up -d auth-service"
echo "3. Or start all: docker compose up -d"
echo ""

