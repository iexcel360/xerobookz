#!/bin/bash

set -e

echo "🚀 Starting XeroBookz Local Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install Docker Compose."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
fi

# Start services
echo "🐳 Starting Docker containers..."
if docker compose version &> /dev/null; then
    docker compose up -d
else
    docker-compose up -d
fi

echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check service health
echo "🔍 Checking service health..."
if docker compose version &> /dev/null; then
    docker compose ps
else
    docker-compose ps
fi

echo ""
echo "✅ XeroBookz is starting up!"
echo ""
echo "📊 Service URLs:"
echo "   - API Gateway:     http://localhost:8000"
echo "   - RabbitMQ UI:     http://localhost:15672 (user: xerobookz, pass: xerobookz_dev)"
echo "   - PostgreSQL:      localhost:5432"
echo "   - MongoDB:         localhost:27017"
echo "   - Redis:           localhost:6379"
echo ""
echo "📝 To view logs: docker compose logs -f [service-name]"
echo "🛑 To stop:      docker compose down"
echo ""

