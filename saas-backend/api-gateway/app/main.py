"""API Gateway - Entry point to all services"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import httpx
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../shared-libs"))
from shared_libs.auth.middleware import get_tenant_id, get_current_user
from shared_libs.auth.jwt import verify_token
from shared_libs.database.redis import get_redis_client
from .config import settings

# Service routing configuration
SERVICE_ROUTES = {
    "auth": "http://auth-service:8001",
    "users": "http://user-service:8002",
    "organization": "http://organization-service:8003",
    "employees": "http://employee-service:8004",
    "documents": "http://document-service:8005",
    "i9": "http://i9-service:8006",
    "everify": "http://e-verify-service:8007",
    "i9-audit": "http://i9-audit-service:8008",
    "paf": "http://paf-service:8009",
    "soc": "http://soc-predictor-service:8010",
    "immigration": "http://immigration-service:8011",
    "lca": "http://lca-service:8012",
    "timesheets": "http://timesheet-service:8013",
    "leave": "http://leave-service:8014",
    "notifications": "http://notification-service:8015",
    "audit": "http://audit-service:8016",
    "safety": "http://safety-service:8017",
    "onboarding": "http://onboarding-service:8018",
    "workflow": "http://workflow-service:8019",
    "invoice": "http://invoice-service:8020",
    "payments": "http://payment-service:8021",
    "finance": "http://finance-dashboard-service:8022",
    "marketing": "http://marketing-service:8023",
    "ess": "http://ess-service:8024",
    "ai": "http://ai-service:8025",
}


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title="XeroBookz API Gateway",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


@app.middleware("http")
async def gateway_middleware(request: Request, call_next):
    """Gateway middleware for routing, auth, and rate limiting"""
    
    # Skip for health and docs
    if request.url.path in ["/health", "/docs", "/openapi.json"]:
        return await call_next(request)
    
    # Extract service from path
    path_parts = request.url.path.strip("/").split("/")
    if not path_parts:
        return await call_next(request)
    
    service_name = path_parts[0]
    
    # Verify tenant
    try:
        tenant_id = get_tenant_id(request)
        request.state.tenant_id = tenant_id
    except HTTPException:
        # Allow auth endpoints without tenant
        if service_name == "auth" and path_parts[1] in ["login", "refresh"]:
            pass
        else:
            raise
    
    # Verify JWT for non-auth endpoints
    if service_name != "auth":
        user = get_current_user(request)
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")
        request.state.user = user
    
    # Rate limiting
    redis_client = get_redis_client()
    rate_limit_key = f"ratelimit:{tenant_id}:{user.get('sub') if 'user' in request.state else 'anonymous'}:{service_name}"
    current = redis_client.incr(rate_limit_key)
    if current == 1:
        redis_client.expire(rate_limit_key, 60)  # 1 minute window
    if current > 100:  # 100 requests per minute
        return JSONResponse(
            status_code=429,
            content={"error": "Rate limit exceeded"}
        )
    
    # Route to service
    if service_name in SERVICE_ROUTES:
        service_url = SERVICE_ROUTES[service_name]
        target_path = "/" + "/".join(path_parts[1:]) if len(path_parts) > 1 else "/"
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.request(
                    method=request.method,
                    url=f"{service_url}{target_path}",
                    headers=dict(request.headers),
                    params=dict(request.query_params),
                    content=await request.body()
                )
                return JSONResponse(
                    content=response.json(),
                    status_code=response.status_code
                )
            except httpx.RequestError as e:
                return JSONResponse(
                    status_code=503,
                    content={"error": "Service unavailable", "details": str(e)}
                )
    
    return await call_next(request)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": settings.SERVICE_NAME}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
