#!/bin/bash

echo "🛑 Stopping XeroBookz Local Development Environment..."

if docker compose version &> /dev/null; then
    docker compose down
else
    docker-compose down
fi

echo "✅ All services stopped."

