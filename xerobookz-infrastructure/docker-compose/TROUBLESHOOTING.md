# Troubleshooting XeroBookz Local Setup

## Common Issues and Solutions

### Issue 1: Services Won't Build

**Problem**: Docker build fails for microservices

**Solution**: The services need Dockerfiles. For now, start with databases only:

```bash
# Start just databases
docker compose -f docker-compose.minimal.yml up -d

# Verify databases are running
docker compose -f docker-compose.minimal.yml ps
```

### Issue 2: Port Already in Use

**Problem**: `Error: bind: address already in use`

**Solution**: Find and stop the process using the port:

```bash
# Find process using port 8000
lsof -i :8000

# Kill the process (replace PID)
kill -9 <PID>

# Or stop all Docker containers
docker stop $(docker ps -q)
```

### Issue 3: Database Connection Errors

**Problem**: Services can't connect to databases

**Solution**: 

1. Check databases are healthy:
```bash
docker exec xerobookz-postgres pg_isready -U xerobookz
docker exec xerobookz-mongodb mongosh --eval "db.adminCommand('ping')"
docker exec xerobookz-redis redis-cli ping
```

2. Check network connectivity:
```bash
docker network ls
docker network inspect xerobookz-network
```

3. Restart databases:
```bash
docker compose restart postgres mongodb redis
```

### Issue 4: Services Crash on Startup

**Problem**: Containers exit immediately

**Solution**:

1. Check logs:
```bash
docker compose logs <service-name>
```

2. Common causes:
   - Missing environment variables
   - Database not ready (add healthcheck dependencies)
   - Missing shared-libs package

3. Start services one at a time:
```bash
# Start databases first
docker compose -f docker-compose.minimal.yml up -d

# Wait for them to be ready
sleep 10

# Start one service
docker compose up -d auth-service

# Check logs
docker compose logs -f auth-service
```

### Issue 5: Docker Compose Version Warning

**Problem**: `the attribute 'version' is obsolete`

**Solution**: Already fixed in docker-compose.yml (version removed)

### Issue 6: Shared Libraries Not Found

**Problem**: Services can't find shared-libs

**Solution**: 

1. Install shared-libs first:
```bash
cd saas-backend/shared-libs
pip install -e .
```

2. Or modify Dockerfiles to copy shared-libs:
```dockerfile
# In each service Dockerfile
COPY ../shared-libs /app/shared-libs
RUN pip install -e /app/shared-libs
```

### Issue 7: Memory Issues

**Problem**: Docker runs out of memory

**Solution**:

1. Increase Docker Desktop memory:
   - Docker Desktop → Settings → Resources → Memory (8GB+)

2. Start fewer services:
```bash
# Start only essential services
docker compose up -d postgres mongodb redis rabbitmq api-gateway auth-service
```

### Issue 8: Permission Denied

**Problem**: Scripts won't execute

**Solution**:
```bash
chmod +x *.sh
```

## Step-by-Step Recovery

If nothing works, start fresh:

```bash
# 1. Stop everything
docker compose down -v

# 2. Remove all XeroBookz containers
docker ps -a | grep xerobookz | awk '{print $1}' | xargs docker rm -f

# 3. Remove volumes
docker volume ls | grep xerobookz | awk '{print $2}' | xargs docker volume rm

# 4. Start with minimal setup
docker compose -f docker-compose.minimal.yml up -d

# 5. Verify databases
./check-health.sh

# 6. Start services one by one
docker compose up -d auth-service
docker compose logs -f auth-service
```

## Getting Help

1. Check service logs:
```bash
docker compose logs <service-name>
```

2. Check Docker status:
```bash
docker info
docker compose ps
```

3. Check network:
```bash
docker network inspect xerobookz-network
```

4. Test database connections manually:
```bash
# PostgreSQL
docker exec -it xerobookz-postgres psql -U xerobookz -d xerobookz

# MongoDB
docker exec -it xerobookz-mongodb mongosh -u xerobookz -p xerobookz_dev

# Redis
docker exec -it xerobookz-redis redis-cli
```

## Recommended Startup Sequence

1. **Start databases only** (safest):
```bash
docker compose -f docker-compose.minimal.yml up -d
```

2. **Verify databases**:
```bash
./check-health.sh
```

3. **Start services incrementally**:
```bash
# Start API Gateway first
docker compose up -d api-gateway

# Then auth service
docker compose up -d auth-service

# Then others as needed
docker compose up -d
```

