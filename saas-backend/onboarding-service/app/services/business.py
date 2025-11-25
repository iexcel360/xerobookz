"""Business logic for onboarding-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope
from shared_libs.ai.client import get_ai_client

from ..schemas.request import (
    HRAgentActionRequest, HRAgentPolicyGuidanceRequest, HRAgentAutoFillRequest,
    JobPostingCreate, ApplicationCreate, InterviewCreate, OfferLetterCreate
)
from ..schemas.response import (
    HRAgentActionResponse, HRAgentPolicyGuidanceResponse, HRAgentAutoFillResponse,
    JobPostingResponse, ApplicationResponse, InterviewResponse, OfferLetterResponse
)
from ..repositories.repo import OnboardingRepository
from ..events.producers import EventProducer


class OnboardingService:
    """Onboarding service - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = OnboardingRepository(db)
        self.event_producer = EventProducer()
        self.ai_client = get_ai_client()
    
    # ========== ENTERPRISE: HR AGENT METHODS ==========
    
    async def hr_agent_action(
        self,
        data: HRAgentActionRequest,
        tenant_id: UUID
    ) -> HRAgentActionResponse:
        """HR Agent action"""
        try:
            if data.action_type == "classify_document":
                result = await self.ai_client.classify_document(
                    data.input_data.get("content"),
                    data.input_data.get("filename")
                )
            elif data.action_type == "extract_data":
                result = await self.ai_client.extract_document(
                    data.input_data.get("content"),
                    data.input_data.get("filename"),
                    data.input_data.get("document_type")
                )
            else:
                result = {"success": False, "message": "Unknown action type"}
            
            return HRAgentActionResponse(
                success=result.get("success", True),
                result=result,
                confidence=result.get("confidence")
            )
        except Exception as e:
            return HRAgentActionResponse(
                success=False,
                result={},
                message=str(e)
            )
    
    async def hr_agent_policy_guidance(
        self,
        data: HRAgentPolicyGuidanceRequest,
        tenant_id: UUID
    ) -> HRAgentPolicyGuidanceResponse:
        """HR Agent policy guidance"""
        # Use AI to provide policy guidance
        # This is a simplified implementation
        answer = f"Policy guidance for: {data.question}"
        return HRAgentPolicyGuidanceResponse(
            answer=answer,
            sources=["HR Policy Handbook", "Employee Manual"],
            related_policies=["Policy 1", "Policy 2"]
        )
    
    async def hr_agent_auto_fill(
        self,
        data: HRAgentAutoFillRequest,
        tenant_id: UUID
    ) -> HRAgentAutoFillResponse:
        """HR Agent form auto-fill"""
        try:
            if data.form_type == "i9":
                result = await self.ai_client.process_i9(
                    data.document_content or b"",
                    data.document_url or ""
                )
                form_data = result.get("extracted_data", {})
            else:
                form_data = {}
            
            return HRAgentAutoFillResponse(
                form_data=form_data,
                confidence=result.get("confidence", 0.8),
                fields_filled=len(form_data),
                fields_total=10
            )
        except Exception as e:
            return HRAgentAutoFillResponse(
                form_data={},
                fields_filled=0,
                fields_total=10
            )
    
    # ========== ENTERPRISE: RECRUITING METHODS ==========
    
    async def create_job_posting(
        self,
        data: JobPostingCreate,
        tenant_id: UUID
    ) -> JobPostingResponse:
        """Create job posting"""
        posting = self.repo.create_job_posting(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.JOB_POSTING_CREATED,
            tenant_id=tenant_id,
            payload={"job_posting_id": str(posting.id), "title": posting.title}
        )
        await self.event_producer.publish(event)
        
        return JobPostingResponse.model_validate(posting)
    
    async def get_job_postings(
        self,
        tenant_id: UUID,
        status: str | None = None
    ) -> list[JobPostingResponse]:
        """Get job postings"""
        postings = self.repo.get_job_postings(tenant_id, status)
        return [JobPostingResponse.model_validate(p) for p in postings]
    
    async def create_application(
        self,
        data: ApplicationCreate,
        tenant_id: UUID
    ) -> ApplicationResponse:
        """Create application"""
        application = self.repo.create_application(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.APPLICATION_SUBMITTED,
            tenant_id=tenant_id,
            payload={"application_id": str(application.id), "job_posting_id": str(data.job_posting_id)}
        )
        await self.event_producer.publish(event)
        
        return ApplicationResponse.model_validate(application)
    
    async def get_applications(
        self,
        tenant_id: UUID,
        job_posting_id: UUID | None = None,
        status: str | None = None
    ) -> list[ApplicationResponse]:
        """Get applications"""
        applications = self.repo.get_applications(tenant_id, job_posting_id, status)
        return [ApplicationResponse.model_validate(a) for a in applications]
    
    async def create_interview(
        self,
        data: InterviewCreate,
        tenant_id: UUID
    ) -> InterviewResponse:
        """Create interview"""
        interview = self.repo.create_interview(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.INTERVIEW_SCHEDULED,
            tenant_id=tenant_id,
            payload={"interview_id": str(interview.id), "application_id": str(data.application_id)}
        )
        await self.event_producer.publish(event)
        
        return InterviewResponse.model_validate(interview)
    
    async def create_offer_letter(
        self,
        data: OfferLetterCreate,
        tenant_id: UUID
    ) -> OfferLetterResponse:
        """Create offer letter"""
        offer = self.repo.create_offer_letter(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.OFFER_EXTENDED,
            tenant_id=tenant_id,
            payload={"offer_id": str(offer.id), "application_id": str(data.application_id)}
        )
        await self.event_producer.publish(event)
        
        return OfferLetterResponse.model_validate(offer)

