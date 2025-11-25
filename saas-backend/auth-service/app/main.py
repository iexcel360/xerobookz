"""Main FastAPI application for auth-service"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id

from .config import settings
from .api.routes import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events"""
    # Startup
    yield
    # Shutdown


app = FastAPI(
    title="XeroBookz Auth Service",
    description="Authentication and Authorization Service",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def tenant_middleware(request: Request, call_next):
    """Multi-tenancy middleware"""
    # Skip tenant check for health check
    if request.url.path in ["/health", "/docs", "/openapi.json"]:
        return await call_next(request)
    
    try:
        tenant_id = get_tenant_id(request)
        request.state.tenant_id = tenant_id
    except HTTPException:
        # Allow some endpoints without tenant
        if request.url.path.startswith("/auth/login") or request.url.path.startswith("/auth/refresh"):
            pass
        else:
            raise
    
    response = await call_next(request)
    return response


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": settings.SERVICE_NAME}


app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

