"""Request schemas for onboarding-service - Extended for Enterprise"""

from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime


# ========== ENTERPRISE: HR AGENT REQUEST SCHEMAS ==========

class HRAgentActionRequest(BaseModel):
    """HR Agent action request"""
    action_type: str  # classify_document, extract_data, suggest_policy, etc.
    input_data: Dict[str, Any]
    context: Optional[Dict[str, Any]] = None


class HRAgentPolicyGuidanceRequest(BaseModel):
    """HR Agent policy guidance request"""
    question: str
    context: Optional[Dict[str, Any]] = None
    employee_id: Optional[UUID] = None


class HRAgentAutoFillRequest(BaseModel):
    """HR Agent form auto-fill request"""
    form_type: str  # i9, onboarding, etc.
    document_content: Optional[str] = None
    document_url: Optional[str] = None
    existing_data: Optional[Dict[str, Any]] = None


# ========== ENTERPRISE: RECRUITING REQUEST SCHEMAS ==========

class JobPostingCreate(BaseModel):
    """Create job posting"""
    title: str
    department_id: Optional[UUID] = None
    job_code: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[str] = None
    salary_range: Optional[str] = None


class ApplicationCreate(BaseModel):
    """Create job application"""
    job_posting_id: UUID
    candidate_name: str
    candidate_email: EmailStr
    candidate_phone: Optional[str] = None
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None
    source: Optional[str] = None


class InterviewCreate(BaseModel):
    """Create interview"""
    application_id: UUID
    interviewer_id: UUID
    scheduled_at: str  # ISO datetime string
    interview_type: str
    location: Optional[str] = None


class OfferLetterCreate(BaseModel):
    """Create offer letter"""
    application_id: UUID
    offer_details: Dict[str, Any]  # salary, start_date, benefits, etc.

