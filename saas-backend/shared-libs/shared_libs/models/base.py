"""Base Pydantic models with tenant support"""

from pydantic import BaseModel as PydanticBaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime


class BaseModel(PydanticBaseModel):
    """Base model with common fields"""
    
    class Config:
        from_attributes = True
        json_encoders = {
            UUID: str,
            datetime: lambda v: v.isoformat() if v else None,
        }


class TenantBaseModel(BaseModel):
    """Base model with tenant_id"""
    
    tenant_id: UUID = Field(..., description="Tenant identifier")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

