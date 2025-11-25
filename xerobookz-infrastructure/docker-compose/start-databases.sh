#!/bin/bash

set -e

echo "🚀 Starting XeroBookz Databases Only..."

# Check Docker
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Stop any existing
echo "🧹 Cleaning up..."
docker compose -f docker-compose.fixed.yml down 2>/dev/null || true

# Start databases
echo "📦 Starting databases..."
docker compose -f docker-compose.fixed.yml up -d

echo "⏳ Waiting for databases to initialize (15 seconds)..."
sleep 15

# Check health
echo ""
echo "🔍 Checking database health..."

# PostgreSQL
if docker exec xerobookz-postgres pg_isready -U xerobookz > /dev/null 2>&1; then
    echo "✅ PostgreSQL: Healthy on port 5432"
else
    echo "⚠️  PostgreSQL: Starting..."
fi

# MongoDB
if docker exec xerobookz-mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB: Healthy on port 27017"
else
    echo "⚠️  MongoDB: Starting..."
fi

# Redis
if docker exec xerobookz-redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis: Healthy on port 6379"
else
    echo "⚠️  MongoDB: Starting..."
fi

# RabbitMQ
if curl -s -u xerobookz:xerobookz_dev http://localhost:15672/api/overview > /dev/null 2>&1; then
    echo "✅ RabbitMQ: Healthy on ports 5672, 15672"
else
    echo "⚠️  RabbitMQ: Starting..."
fi

echo ""
echo "📊 Container Status:"
docker compose -f docker-compose.fixed.yml ps

echo ""
echo "✅ Databases are running!"
echo ""
echo "📝 Next Steps:"
echo "   1. Test connections manually"
echo "   2. Start services: cd ../../saas-backend && python -m uvicorn auth-service.app.main:app --port 8001"
echo "   3. Or use the full docker-compose.yml (may need Dockerfile fixes)"
echo ""
echo "🔗 Service URLs:"
echo "   - RabbitMQ UI: http://localhost:15672 (user: xerobookz, pass: xerobookz_dev)"
echo "   - PostgreSQL:  localhost:5432"
echo "   - MongoDB:     localhost:27017"
echo "   - Redis:       localhost:6379"
echo ""

