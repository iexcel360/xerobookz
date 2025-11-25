"""Repository for marketing-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime

from ..models.db_models import (
    Course, CourseAssignment, Certificate,
    Survey, SurveyResponse,
    CRMContact, CRMLead, CRMOpportunity
)
from ..schemas.request import (
    CourseCreate, CourseAssignmentCreate,
    SurveyCreate, SurveyResponseCreate,
    CRMContactCreate, CRMLeadCreate, CRMOpportunityCreate
)


class MarketingRepository:
    """Marketing repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    # LMS Methods
    def create_course(self, data: CourseCreate, tenant_id: UUID) -> Course:
        """Create course"""
        course = Course(
            tenant_id=tenant_id,
            title=data.title,
            description=data.description,
            category=data.category,
            duration=data.duration
        )
        self.db.add(course)
        self.db.commit()
        self.db.refresh(course)
        return course
    
    def get_courses(self, tenant_id: UUID, status: Optional[str] = None) -> List[Course]:
        """Get courses"""
        query = self.db.query(Course).filter(Course.tenant_id == tenant_id)
        if status:
            query = query.filter(Course.status == status)
        return query.all()
    
    def create_course_assignment(self, data: CourseAssignmentCreate, tenant_id: UUID) -> CourseAssignment:
        """Create course assignment"""
        assignment = CourseAssignment(
            tenant_id=tenant_id,
            course_id=data.course_id,
            employee_id=data.employee_id,
            assigned_at=datetime.now()
        )
        self.db.add(assignment)
        self.db.commit()
        self.db.refresh(assignment)
        return assignment
    
    # Survey Methods
    def create_survey(self, data: SurveyCreate, tenant_id: UUID) -> Survey:
        """Create survey"""
        survey = Survey(
            tenant_id=tenant_id,
            title=data.title,
            description=data.description,
            questions=data.questions
        )
        self.db.add(survey)
        self.db.commit()
        self.db.refresh(survey)
        return survey
    
    def get_surveys(self, tenant_id: UUID, status: Optional[str] = None) -> List[Survey]:
        """Get surveys"""
        query = self.db.query(Survey).filter(Survey.tenant_id == tenant_id)
        if status:
            query = query.filter(Survey.status == status)
        return query.all()
    
    def create_survey_response(self, data: SurveyResponseCreate, tenant_id: UUID) -> SurveyResponse:
        """Create survey response"""
        response = SurveyResponse(
            tenant_id=tenant_id,
            survey_id=data.survey_id,
            employee_id=data.employee_id,
            responses=data.responses,
            submitted_at=datetime.now()
        )
        self.db.add(response)
        self.db.commit()
        self.db.refresh(response)
        return response
    
    # CRM Methods
    def create_crm_contact(self, data: CRMContactCreate, tenant_id: UUID) -> CRMContact:
        """Create CRM contact"""
        contact = CRMContact(
            tenant_id=tenant_id,
            name=data.name,
            email=data.email,
            phone=data.phone,
            company=data.company,
            title=data.title
        )
        self.db.add(contact)
        self.db.commit()
        self.db.refresh(contact)
        return contact
    
    def create_crm_lead(self, data: CRMLeadCreate, tenant_id: UUID) -> CRMLead:
        """Create CRM lead"""
        lead = CRMLead(
            tenant_id=tenant_id,
            contact_id=data.contact_id,
            source=data.source
        )
        self.db.add(lead)
        self.db.commit()
        self.db.refresh(lead)
        return lead
    
    def create_crm_opportunity(self, data: CRMOpportunityCreate, tenant_id: UUID) -> CRMOpportunity:
        """Create CRM opportunity"""
        opportunity = CRMOpportunity(
            tenant_id=tenant_id,
            lead_id=data.lead_id,
            value=data.value,
            stage=data.stage,
            probability=data.probability
        )
        self.db.add(opportunity)
        self.db.commit()
        self.db.refresh(opportunity)
        return opportunity

