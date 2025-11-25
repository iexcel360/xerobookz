# Starting XeroBookz Frontend

## Quick Start

### Option 1: Start All Apps (Recommended)

```bash
cd xerobookz-frontend
./start-all.sh
```

This will:
- Install dependencies for all apps
- Build shared packages (ui-shared, api-clients)
- Start all 3 web apps on different ports

**URLs:**
- Admin Web: http://localhost:3000
- Employer Web: http://localhost:3001
- ESS Web: http://localhost:3002

### Option 2: Start Individual Apps

```bash
# Admin Web only
./start-admin.sh

# Employer Web only
./start-employer.sh

# ESS Web only
./start-ess.sh
```

## Prerequisites

- Node.js 18+ installed
- npm or yarn installed
- Backend API running on http://localhost:8000 (or update .env.local)

## First Time Setup

1. **Install shared packages:**
```bash
cd ui-shared
npm install
npm run build

cd ../api-clients
npm install
npm run build
```

2. **Install app dependencies:**
```bash
cd admin-web
npm install

cd ../employer-web
npm install

cd ../ess-web
npm install
```

## Environment Variables

Each app needs `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

The startup scripts create this automatically if it doesn't exist.

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Module Not Found Errors

```bash
# Rebuild shared packages
cd ui-shared && npm run build
cd ../api-clients && npm run build
```

### API Connection Errors

Make sure backend is running:
```bash
# Check if API Gateway is running
curl http://localhost:8000/health
```

### TypeScript Errors

```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Stop All Frontend Apps

```bash
./stop-frontend.sh
```

Or manually:
```bash
# Find Next.js processes
ps aux | grep "next dev"

# Kill them
pkill -f "next dev"
```

## Development Tips

1. **Hot Reload**: All apps support hot reload - just save files
2. **Logs**: Check individual log files or terminal output
3. **API**: Make sure backend is running on port 8000
4. **Ports**: Each app runs on a different port to avoid conflicts

## Next Steps

1. Start backend databases: `cd ../xerobookz-infrastructure/docker-compose && ./start-databases.sh`
2. Start backend services (run directly with Python)
3. Start frontend: `./start-all.sh`
4. Open browsers and test!

