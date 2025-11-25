#!/bin/bash

echo "🔄 Restarting XeroBookz Local Development Environment..."

if docker compose version &> /dev/null; then
    docker compose restart
else
    docker-compose restart
fi

echo "✅ Services restarted."

