"""Database models for marketing-service"""

from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey, Date, JSON, Integer, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from uuid import uuid4
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.postgres import Base


class BaseModel(Base):
    """Base model with tenant support"""
    __abstract__ = True
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


# ========== ENTERPRISE: LMS MODELS ==========

class Course(BaseModel):
    """Course model"""
    
    __tablename__ = "courses"
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    duration = Column(Integer, nullable=True)  # minutes
    status = Column(String(50), default="draft")  # draft, published, archived
    
    assignments = relationship("CourseAssignment", back_populates="course")


class CourseAssignment(BaseModel):
    """Course assignment model"""
    
    __tablename__ = "course_assignments"
    
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"), nullable=False)
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    assigned_at = Column(DateTime, nullable=False)
    completed_at = Column(DateTime, nullable=True)
    status = Column(String(50), default="assigned")  # assigned, in_progress, completed
    
    course = relationship("Course", back_populates="assignments")


class Certificate(BaseModel):
    """Certificate model"""
    
    __tablename__ = "certificates"
    
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    course_id = Column(UUID(as_uuid=True), nullable=True)
    issued_at = Column(DateTime, nullable=False)
    certificate_url = Column(String(500), nullable=True)


# ========== ENTERPRISE: SURVEYS MODELS ==========

class Survey(BaseModel):
    """Survey model"""
    
    __tablename__ = "surveys"
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    questions = Column(JSON, nullable=True)
    status = Column(String(50), default="draft")  # draft, active, closed
    
    responses = relationship("SurveyResponse", back_populates="survey")


class SurveyResponse(BaseModel):
    """Survey response model"""
    
    __tablename__ = "survey_responses"
    
    survey_id = Column(UUID(as_uuid=True), ForeignKey("surveys.id"), nullable=False)
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    responses = Column(JSON, nullable=True)
    submitted_at = Column(DateTime, nullable=False)
    
    survey = relationship("Survey", back_populates="responses")


# ========== ENTERPRISE: CRM MODELS ==========

class CRMContact(BaseModel):
    """CRM contact model"""
    
    __tablename__ = "crm_contacts"
    
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    company = Column(String(255), nullable=True)
    title = Column(String(255), nullable=True)


class CRMLead(BaseModel):
    """CRM lead model"""
    
    __tablename__ = "crm_leads"
    
    contact_id = Column(UUID(as_uuid=True), ForeignKey("crm_contacts.id"), nullable=True)
    source = Column(String(100), nullable=True)
    status = Column(String(50), default="new")  # new, qualified, converted, lost


class CRMOpportunity(BaseModel):
    """CRM opportunity model"""
    
    __tablename__ = "crm_opportunities"
    
    lead_id = Column(UUID(as_uuid=True), ForeignKey("crm_leads.id"), nullable=True)
    value = Column(Numeric(12, 2), nullable=True)
    stage = Column(String(50), default="prospecting")  # prospecting, qualification, proposal, negotiation, closed
    probability = Column(Integer, default=0)  # 0-100
