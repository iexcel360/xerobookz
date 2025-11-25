#!/bin/bash

echo "🛑 Stopping XeroBookz Frontend Applications..."

if [ -f ".frontend-pids" ]; then
    while read pid; do
        if kill -0 "$pid" 2>/dev/null; then
            echo "  → Stopping process $pid..."
            kill "$pid" 2>/dev/null || true
        fi
    done < .frontend-pids
    rm .frontend-pids
fi

# Also kill any remaining Next.js processes
pkill -f "next dev" 2>/dev/null || true

echo "✅ All frontend applications stopped."

