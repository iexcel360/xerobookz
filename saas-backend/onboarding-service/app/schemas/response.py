"""Response schemas for onboarding-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime


# ========== ENTERPRISE: HR AGENT RESPONSE SCHEMAS ==========

class HRAgentActionResponse(BaseModel):
    """HR Agent action response"""
    success: bool
    result: Dict[str, Any]
    confidence: Optional[float] = None
    message: Optional[str] = None


class HRAgentPolicyGuidanceResponse(BaseModel):
    """HR Agent policy guidance response"""
    answer: str
    sources: Optional[list[str]] = None
    related_policies: Optional[list[str]] = None


class HRAgentAutoFillResponse(BaseModel):
    """HR Agent auto-fill response"""
    form_data: Dict[str, Any]
    confidence: Optional[float] = None
    fields_filled: int
    fields_total: int


# ========== ENTERPRISE: RECRUITING RESPONSE SCHEMAS ==========

class JobPostingResponse(BaseModel):
    """Job posting response"""
    id: UUID
    tenant_id: UUID
    title: str
    department_id: Optional[UUID]
    job_code: Optional[str]
    description: Optional[str]
    requirements: Optional[str]
    location: Optional[str]
    employment_type: Optional[str]
    salary_range: Optional[str]
    status: str
    posted_at: Optional[datetime]
    closed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ApplicationResponse(BaseModel):
    """Application response"""
    id: UUID
    tenant_id: UUID
    job_posting_id: UUID
    candidate_name: str
    candidate_email: str
    candidate_phone: Optional[str]
    resume_url: Optional[str]
    cover_letter: Optional[str]
    status: str
    source: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class InterviewResponse(BaseModel):
    """Interview response"""
    id: UUID
    tenant_id: UUID
    application_id: UUID
    interviewer_id: UUID
    scheduled_at: datetime
    interview_type: str
    location: Optional[str]
    status: str
    notes: Optional[str]
    rating: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class OfferLetterResponse(BaseModel):
    """Offer letter response"""
    id: UUID
    tenant_id: UUID
    application_id: UUID
    offer_details: Optional[Dict[str, Any]]
    status: str
    sent_at: Optional[datetime]
    responded_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

