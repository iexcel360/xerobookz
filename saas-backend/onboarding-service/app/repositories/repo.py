"""Repository for onboarding-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime

from ..models.db_models import JobPosting, Application, Interview, OfferLetter
from ..schemas.request import (
    JobPostingCreate, ApplicationCreate, InterviewCreate, OfferLetterCreate
)


class OnboardingRepository:
    """Onboarding repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    # ========== ENTERPRISE: RECRUITING METHODS ==========
    
    def create_job_posting(
        self,
        data: JobPostingCreate,
        tenant_id: UUID
    ) -> JobPosting:
        """Create job posting"""
        posting = JobPosting(
            tenant_id=tenant_id,
            title=data.title,
            department_id=data.department_id,
            job_code=data.job_code,
            description=data.description,
            requirements=data.requirements,
            location=data.location,
            employment_type=data.employment_type,
            salary_range=data.salary_range
        )
        self.db.add(posting)
        self.db.commit()
        self.db.refresh(posting)
        return posting
    
    def get_job_postings(
        self,
        tenant_id: UUID,
        status: Optional[str] = None
    ) -> List[JobPosting]:
        """Get job postings"""
        query = self.db.query(JobPosting).filter(JobPosting.tenant_id == tenant_id)
        if status:
            query = query.filter(JobPosting.status == status)
        return query.order_by(JobPosting.created_at.desc()).all()
    
    def create_application(
        self,
        data: ApplicationCreate,
        tenant_id: UUID
    ) -> Application:
        """Create application"""
        application = Application(
            tenant_id=tenant_id,
            job_posting_id=data.job_posting_id,
            candidate_name=data.candidate_name,
            candidate_email=data.candidate_email,
            candidate_phone=data.candidate_phone,
            resume_url=data.resume_url,
            cover_letter=data.cover_letter,
            source=data.source
        )
        self.db.add(application)
        self.db.commit()
        self.db.refresh(application)
        return application
    
    def get_applications(
        self,
        tenant_id: UUID,
        job_posting_id: Optional[UUID] = None,
        status: Optional[str] = None
    ) -> List[Application]:
        """Get applications"""
        query = self.db.query(Application).filter(Application.tenant_id == tenant_id)
        if job_posting_id:
            query = query.filter(Application.job_posting_id == job_posting_id)
        if status:
            query = query.filter(Application.status == status)
        return query.order_by(Application.created_at.desc()).all()
    
    def create_interview(
        self,
        data: InterviewCreate,
        tenant_id: UUID
    ) -> Interview:
        """Create interview"""
        interview = Interview(
            tenant_id=tenant_id,
            application_id=data.application_id,
            interviewer_id=data.interviewer_id,
            scheduled_at=datetime.fromisoformat(data.scheduled_at),
            interview_type=data.interview_type,
            location=data.location
        )
        self.db.add(interview)
        self.db.commit()
        self.db.refresh(interview)
        return interview
    
    def create_offer_letter(
        self,
        data: OfferLetterCreate,
        tenant_id: UUID
    ) -> OfferLetter:
        """Create offer letter"""
        offer = OfferLetter(
            tenant_id=tenant_id,
            application_id=data.application_id,
            offer_details=data.offer_details
        )
        self.db.add(offer)
        self.db.commit()
        self.db.refresh(offer)
        return offer

