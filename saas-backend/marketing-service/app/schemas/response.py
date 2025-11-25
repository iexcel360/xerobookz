"""Response schemas for marketing-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from decimal import Decimal


class CourseResponse(BaseModel):
    """Course response"""
    id: UUID
    tenant_id: UUID
    title: str
    description: Optional[str]
    category: Optional[str]
    duration: Optional[int]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class CourseAssignmentResponse(BaseModel):
    """Course assignment response"""
    id: UUID
    tenant_id: UUID
    course_id: UUID
    employee_id: UUID
    assigned_at: datetime
    completed_at: Optional[datetime]
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class SurveyResponse(BaseModel):
    """Survey response"""
    id: UUID
    tenant_id: UUID
    title: str
    description: Optional[str]
    questions: Optional[Dict[str, Any]]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class SurveyResponseDataResponse(BaseModel):
    """Survey response data response"""
    id: UUID
    tenant_id: UUID
    survey_id: UUID
    employee_id: UUID
    responses: Optional[Dict[str, Any]]
    submitted_at: datetime
    created_at: datetime
    
    class Config:
        from_attributes = True


class CRMContactResponse(BaseModel):
    """CRM contact response"""
    id: UUID
    tenant_id: UUID
    name: str
    email: Optional[str]
    phone: Optional[str]
    company: Optional[str]
    title: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class CRMLeadResponse(BaseModel):
    """CRM lead response"""
    id: UUID
    tenant_id: UUID
    contact_id: Optional[UUID]
    source: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class CRMOpportunityResponse(BaseModel):
    """CRM opportunity response"""
    id: UUID
    tenant_id: UUID
    lead_id: Optional[UUID]
    value: Optional[Decimal]
    stage: str
    probability: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

