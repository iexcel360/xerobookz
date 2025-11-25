"""Response schemas"""

from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime


class UserResponse(BaseModel):
    """User response schema"""
    
    id: UUID
    email: str
    is_active: bool
    is_verified: bool
    mfa_enabled: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """Token response schema"""
    
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class RoleResponse(BaseModel):
    """Role response schema"""
    
    id: UUID
    name: str
    description: Optional[str]
    tenant_id: Optional[UUID]
    created_at: datetime
    
    class Config:
        from_attributes = True

