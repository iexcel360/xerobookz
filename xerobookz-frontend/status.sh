#!/bin/bash

echo "📊 XeroBookz Frontend Status"
echo ""

# Check Admin Web
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Admin Web:     http://localhost:3000 (Running)"
else
    echo "❌ Admin Web:     Not running"
fi

# Check Employer Web
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Employer Web:  http://localhost:3001 (Running)"
else
    echo "❌ Employer Web:  Not running"
fi

# Check ESS Web
if curl -s http://localhost:3002 > /dev/null 2>&1; then
    echo "✅ ESS Web:       http://localhost:3002 (Running)"
else
    echo "❌ ESS Web:       Not running"
fi

echo ""
echo "📝 Next.js Processes:"
ps aux | grep "next dev" | grep -v grep | awk '{print "   PID:", $2, "Port:", $NF}'

echo ""
echo "📋 Log Files:"
ls -lh *.log 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'

