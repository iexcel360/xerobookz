#!/bin/bash

echo "🏥 Checking XeroBookz Service Health..."
echo ""

# Check API Gateway
echo "Checking API Gateway..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ API Gateway: Healthy"
else
    echo "❌ API Gateway: Unhealthy"
fi

# Check PostgreSQL
echo "Checking PostgreSQL..."
if docker exec xerobookz-postgres pg_isready -U xerobookz > /dev/null 2>&1; then
    echo "✅ PostgreSQL: Healthy"
else
    echo "❌ PostgreSQL: Unhealthy"
fi

# Check MongoDB
echo "Checking MongoDB..."
if docker exec xerobookz-mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB: Healthy"
else
    echo "❌ MongoDB: Unhealthy"
fi

# Check Redis
echo "Checking Redis..."
if docker exec xerobookz-redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis: Healthy"
else
    echo "❌ Redis: Unhealthy"
fi

# Check RabbitMQ
echo "Checking RabbitMQ..."
if curl -s -u xerobookz:xerobookz_dev http://localhost:15672/api/overview > /dev/null; then
    echo "✅ RabbitMQ: Healthy"
else
    echo "❌ RabbitMQ: Unhealthy"
fi

echo ""
echo "📊 Container Status:"
if docker compose version &> /dev/null; then
    docker compose ps
else
    docker-compose ps
fi

