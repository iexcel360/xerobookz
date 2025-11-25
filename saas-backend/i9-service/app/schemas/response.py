"""Response schemas"""

from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime, date


class I9FormResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    status: str
    form_version: str
    section1_completed_at: Optional[datetime]
    section2_completed_at: Optional[datetime]
    reverification_required: bool
    reverification_date: Optional[date]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

