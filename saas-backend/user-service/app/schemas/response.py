"""Response schemas"""

from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserProfileResponse(BaseModel):
    id: UUID
    user_id: UUID
    tenant_id: UUID
    first_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    profile_picture_url: Optional[str]
    employee_id: Optional[UUID]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

