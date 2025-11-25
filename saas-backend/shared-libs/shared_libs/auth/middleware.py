"""Authentication middleware utilities"""

from fastapi import Request, HTTPException, Header
from typing import Optional
from uuid import UUID
from shared_libs.auth.jwt import verify_token


TENANT_HEADER = "X-Tenant-ID"
AUTHORIZATION_HEADER = "Authorization"


def get_tenant_id(request: Request) -> UUID:
    """Extract tenant ID from request header"""
    tenant_id = request.headers.get(TENANT_HEADER)
    if not tenant_id:
        raise HTTPException(
            status_code=400,
            detail="Missing X-Tenant-ID header"
        )
    try:
        return UUID(tenant_id)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid tenant ID format"
        )


def get_current_user(request: Request) -> Optional[dict]:
    """Extract current user from JWT token"""
    auth_header = request.headers.get(AUTHORIZATION_HEADER)
    if not auth_header:
        return None
    
    if not auth_header.startswith("Bearer "):
        return None
    
    token = auth_header.split(" ")[1]
    payload = verify_token(token)
    return payload

