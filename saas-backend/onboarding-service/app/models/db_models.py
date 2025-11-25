"""Database models for onboarding-service"""

from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey, Date, JSON, Enum as SQLEnum
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


# ========== ENTERPRISE: RECRUITING MODELS ==========

class JobPosting(BaseModel):
    """Job posting model"""
    
    __tablename__ = "job_postings"
    
    title = Column(String(255), nullable=False)
    department_id = Column(UUID(as_uuid=True), nullable=True)
    job_code = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    location = Column(String(255), nullable=True)
    employment_type = Column(String(50), nullable=True)  # full_time, part_time, contract
    salary_range = Column(String(100), nullable=True)
    status = Column(String(50), default="draft")  # draft, published, closed
    posted_at = Column(DateTime, nullable=True)
    closed_at = Column(DateTime, nullable=True)
    
    applications = relationship("Application", back_populates="job_posting")


class Application(BaseModel):
    """Job application model"""
    
    __tablename__ = "applications"
    
    job_posting_id = Column(UUID(as_uuid=True), ForeignKey("job_postings.id"), nullable=False)
    candidate_name = Column(String(255), nullable=False)
    candidate_email = Column(String(255), nullable=False)
    candidate_phone = Column(String(20), nullable=True)
    resume_url = Column(String(500), nullable=True)
    cover_letter = Column(Text, nullable=True)
    status = Column(String(50), default="submitted")  # submitted, screening, interview, offer, rejected
    source = Column(String(100), nullable=True)  # website, referral, etc.
    
    job_posting = relationship("JobPosting", back_populates="applications")
    interviews = relationship("Interview", back_populates="application")
    offer = relationship("OfferLetter", back_populates="application", uselist=False)


class Interview(BaseModel):
    """Interview model"""
    
    __tablename__ = "interviews"
    
    application_id = Column(UUID(as_uuid=True), ForeignKey("applications.id"), nullable=False)
    interviewer_id = Column(UUID(as_uuid=True), nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    interview_type = Column(String(50), nullable=False)  # phone, video, onsite
    location = Column(String(255), nullable=True)
    status = Column(String(50), default="scheduled")  # scheduled, completed, cancelled
    notes = Column(Text, nullable=True)
    rating = Column(String(50), nullable=True)
    
    application = relationship("Application", back_populates="interviews")


class OfferLetter(BaseModel):
    """Offer letter model"""
    
    __tablename__ = "offer_letters"
    
    application_id = Column(UUID(as_uuid=True), ForeignKey("applications.id"), nullable=False)
    offer_details = Column(JSON, nullable=True)  # salary, start_date, benefits, etc.
    status = Column(String(50), default="draft")  # draft, sent, accepted, rejected
    sent_at = Column(DateTime, nullable=True)
    responded_at = Column(DateTime, nullable=True)
    
    application = relationship("Application", back_populates="offer")
