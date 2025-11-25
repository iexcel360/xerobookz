# XeroBookz Local Setup - FIXED VERSION

## Quick Start (Recommended)

### Step 1: Start Databases Only

This is the safest way to start. It only runs the databases:

```bash
cd xerobookz-infrastructure/docker-compose
./start-databases.sh
```

This will start:
- ✅ PostgreSQL (port 5432)
- ✅ MongoDB (port 27017)  
- ✅ Redis (port 6379)
- ✅ RabbitMQ (ports 5672, 15672)

### Step 2: Verify Databases

```bash
# Check all databases are healthy
./check-health.sh

# Or manually test:
docker exec xerobookz-postgres pg_isready -U xerobookz
docker exec xerobookz-mongodb mongosh --eval "db.adminCommand('ping')"
docker exec xerobookz-redis redis-cli ping
```

### Step 3: Run Services Locally (Without Docker)

Since the microservices have Dockerfile issues with shared-libs, run them directly:

```bash
# Terminal 1 - Auth Service
cd saas-backend/auth-service
pip install -r requirements.txt
pip install -e ../shared-libs
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload

# Terminal 2 - API Gateway
cd saas-backend/api-gateway
pip install -r requirements.txt
pip install -e ../shared-libs
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 3 - Other services as needed
```

## Alternative: Fix Dockerfiles First

The Dockerfiles need to be fixed to properly include shared-libs. The issue is that Docker build context doesn't allow `../` paths.

### Option 1: Use Multi-Stage Build

Update each Dockerfile to use a build context that includes both the service and shared-libs.

### Option 2: Copy Shared-Libs During Build

Create a build script that copies shared-libs into each service before building.

## Current Status

✅ **Working**: Databases (PostgreSQL, MongoDB, Redis, RabbitMQ)  
⚠️ **Needs Fix**: Microservice Dockerfiles (shared-libs path issue)  
✅ **Workaround**: Run services directly with Python

## Service URLs

Once databases are running:

- **RabbitMQ Management**: http://localhost:15672
  - Username: `xerobookz`
  - Password: `xerobookz_dev`
- **PostgreSQL**: `localhost:5432`
  - User: `xerobookz`
  - Password: `xerobookz_dev`
  - Database: `xerobookz`
- **MongoDB**: `localhost:27017`
  - User: `xerobookz`
  - Password: `xerobookz_dev`
- **Redis**: `localhost:6379`

## Troubleshooting

See `TROUBLESHOOTING.md` for detailed solutions.

## Stop Services

```bash
# Stop databases
docker compose -f docker-compose.fixed.yml down

# Stop and remove volumes (clean slate)
docker compose -f docker-compose.fixed.yml down -v
```

