"""Response schemas for workflow-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime, date


class OKRResponse(BaseModel):
    """OKR response"""
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    cycle_id: Optional[UUID]
    objective: str
    key_results: Optional[Dict[str, Any]]
    status: str
    progress: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class OneOnOneResponse(BaseModel):
    """One-on-one response"""
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    manager_id: UUID
    scheduled_at: datetime
    agenda: Optional[str]
    notes: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ProjectResponse(BaseModel):
    """Project response"""
    id: UUID
    tenant_id: UUID
    name: str
    description: Optional[str]
    status: str
    start_date: Optional[date]
    end_date: Optional[date]
    project_manager_id: Optional[UUID]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class TaskResponse(BaseModel):
    """Task response"""
    id: UUID
    tenant_id: UUID
    project_id: UUID
    title: str
    description: Optional[str]
    assignee_id: Optional[UUID]
    status: str
    priority: str
    due_date: Optional[date]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class SprintResponse(BaseModel):
    """Sprint response"""
    id: UUID
    tenant_id: UUID
    project_id: UUID
    name: str
    start_date: date
    end_date: date
    goal: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

