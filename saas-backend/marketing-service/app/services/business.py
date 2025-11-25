"""Business logic for marketing-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..schemas.request import (
    CourseCreate, CourseAssignmentCreate,
    SurveyCreate, SurveyResponseCreate,
    CRMContactCreate, CRMLeadCreate, CRMOpportunityCreate
)
from ..schemas.response import (
    CourseResponse, CourseAssignmentResponse,
    SurveyResponse, SurveyResponseDataResponse,
    CRMContactResponse, CRMLeadResponse, CRMOpportunityResponse
)
from ..repositories.repo import MarketingRepository
from ..events.producers import EventProducer


class MarketingService:
    """Marketing service - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = MarketingRepository(db)
        self.event_producer = EventProducer()
    
    # LMS Methods
    async def create_course(self, data: CourseCreate, tenant_id: UUID) -> CourseResponse:
        """Create course"""
        course = self.repo.create_course(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.COURSE_ASSIGNED,  # Using existing event
            tenant_id=tenant_id,
            payload={"course_id": str(course.id)}
        )
        await self.event_producer.publish(event)
        
        return CourseResponse.model_validate(course)
    
    async def get_courses(self, tenant_id: UUID, status: str | None = None) -> list[CourseResponse]:
        """Get courses"""
        courses = self.repo.get_courses(tenant_id, status)
        return [CourseResponse.model_validate(c) for c in courses]
    
    async def create_course_assignment(self, data: CourseAssignmentCreate, tenant_id: UUID) -> CourseAssignmentResponse:
        """Create course assignment"""
        assignment = self.repo.create_course_assignment(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.COURSE_ASSIGNED,
            tenant_id=tenant_id,
            payload={"assignment_id": str(assignment.id), "employee_id": str(data.employee_id)}
        )
        await self.event_producer.publish(event)
        
        return CourseAssignmentResponse.model_validate(assignment)
    
    # Survey Methods
    async def create_survey(self, data: SurveyCreate, tenant_id: UUID) -> SurveyResponse:
        """Create survey"""
        survey = self.repo.create_survey(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.SURVEY_CREATED,
            tenant_id=tenant_id,
            payload={"survey_id": str(survey.id)}
        )
        await self.event_producer.publish(event)
        
        return SurveyResponse.model_validate(survey)
    
    async def get_surveys(self, tenant_id: UUID, status: str | None = None) -> list[SurveyResponse]:
        """Get surveys"""
        surveys = self.repo.get_surveys(tenant_id, status)
        return [SurveyResponse.model_validate(s) for s in surveys]
    
    async def create_survey_response(self, survey_id: UUID, data: SurveyResponseCreate, tenant_id: UUID) -> SurveyResponseDataResponse:
        """Create survey response"""
        response = self.repo.create_survey_response(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.SURVEY_RESPONSE_SUBMITTED,
            tenant_id=tenant_id,
            payload={"response_id": str(response.id), "survey_id": str(survey_id)}
        )
        await self.event_producer.publish(event)
        
        return SurveyResponseDataResponse.model_validate(response)
    
    # CRM Methods
    async def create_crm_contact(self, data: CRMContactCreate, tenant_id: UUID) -> CRMContactResponse:
        """Create CRM contact"""
        contact = self.repo.create_crm_contact(data, tenant_id)
        return CRMContactResponse.model_validate(contact)
    
    async def create_crm_lead(self, data: CRMLeadCreate, tenant_id: UUID) -> CRMLeadResponse:
        """Create CRM lead"""
        lead = self.repo.create_crm_lead(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.LEAD_CREATED,
            tenant_id=tenant_id,
            payload={"lead_id": str(lead.id)}
        )
        await self.event_producer.publish(event)
        
        return CRMLeadResponse.model_validate(lead)
    
    async def create_crm_opportunity(self, data: CRMOpportunityCreate, tenant_id: UUID) -> CRMOpportunityResponse:
        """Create CRM opportunity"""
        opportunity = self.repo.create_crm_opportunity(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.OPPORTUNITY_CREATED,
            tenant_id=tenant_id,
            payload={"opportunity_id": str(opportunity.id)}
        )
        await self.event_producer.publish(event)
        
        return CRMOpportunityResponse.model_validate(opportunity)

