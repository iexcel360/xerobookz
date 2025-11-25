"""Request schemas for marketing-service - Extended for Enterprise"""

from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any, List
from uuid import UUID
from decimal import Decimal


class CourseCreate(BaseModel):
    """Create course"""
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[int] = None


class CourseAssignmentCreate(BaseModel):
    """Create course assignment"""
    course_id: UUID
    employee_id: UUID


class SurveyCreate(BaseModel):
    """Create survey"""
    title: str
    description: Optional[str] = None
    questions: Optional[Dict[str, Any]] = None


class SurveyResponseCreate(BaseModel):
    """Create survey response"""
    survey_id: UUID
    employee_id: UUID
    responses: Dict[str, Any]


class CRMContactCreate(BaseModel):
    """Create CRM contact"""
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    title: Optional[str] = None


class CRMLeadCreate(BaseModel):
    """Create CRM lead"""
    contact_id: Optional[UUID] = None
    source: Optional[str] = None


class CRMOpportunityCreate(BaseModel):
    """Create CRM opportunity"""
    lead_id: Optional[UUID] = None
    value: Optional[Decimal] = None
    stage: str = "prospecting"
    probability: int = 0

