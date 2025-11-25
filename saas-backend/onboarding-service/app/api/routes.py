"""API routes for onboarding-service - Extended for Enterprise"""

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import (
    HRAgentActionRequest, HRAgentPolicyGuidanceRequest, HRAgentAutoFillRequest,
    JobPostingCreate, ApplicationCreate, InterviewCreate, OfferLetterCreate
)
from ..schemas.response import (
    HRAgentActionResponse, HRAgentPolicyGuidanceResponse, HRAgentAutoFillResponse,
    JobPostingResponse, ApplicationResponse, InterviewResponse, OfferLetterResponse
)
from ..services.business import OnboardingService

router = APIRouter(prefix="/onboarding", tags=["onboarding"])


# ========== ENTERPRISE: HR AGENT ENDPOINTS ==========

@router.post("/hr-agent/action", response_model=APIResponse[HRAgentActionResponse])
async def hr_agent_action(
    action_data: HRAgentActionRequest,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """HR Agent action"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    result = await service.hr_agent_action(action_data, tenant_id)
    return APIResponse.success_response(data=result, message="HR Agent action completed")


@router.post("/hr-agent/policy-guidance", response_model=APIResponse[HRAgentPolicyGuidanceResponse])
async def hr_agent_policy_guidance(
    guidance_data: HRAgentPolicyGuidanceRequest,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """HR Agent policy guidance"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    result = await service.hr_agent_policy_guidance(guidance_data, tenant_id)
    return APIResponse.success_response(data=result, message="Policy guidance provided")


@router.post("/hr-agent/auto-fill", response_model=APIResponse[HRAgentAutoFillResponse])
async def hr_agent_auto_fill(
    auto_fill_data: HRAgentAutoFillRequest,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """HR Agent form auto-fill"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    result = await service.hr_agent_auto_fill(auto_fill_data, tenant_id)
    return APIResponse.success_response(data=result, message="Form auto-filled")


# ========== ENTERPRISE: RECRUITING ENDPOINTS ==========

@router.post("/recruiting/job-postings", response_model=APIResponse[JobPostingResponse])
async def create_job_posting(
    posting_data: JobPostingCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create job posting"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    posting = await service.create_job_posting(posting_data, tenant_id)
    return APIResponse.success_response(data=posting, message="Job posting created")


@router.get("/recruiting/job-postings", response_model=APIResponse[list[JobPostingResponse]])
async def get_job_postings(
    request: Request,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get job postings"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    postings = await service.get_job_postings(tenant_id, status)
    return APIResponse.success_response(data=postings)


@router.post("/recruiting/applications", response_model=APIResponse[ApplicationResponse])
async def create_application(
    application_data: ApplicationCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create application"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    application = await service.create_application(application_data, tenant_id)
    return APIResponse.success_response(data=application, message="Application created")


@router.get("/recruiting/applications", response_model=APIResponse[list[ApplicationResponse]])
async def get_applications(
    request: Request,
    job_posting_id: UUID = None,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get applications"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    applications = await service.get_applications(tenant_id, job_posting_id, status)
    return APIResponse.success_response(data=applications)


@router.post("/recruiting/interviews", response_model=APIResponse[InterviewResponse])
async def create_interview(
    interview_data: InterviewCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create interview"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    interview = await service.create_interview(interview_data, tenant_id)
    return APIResponse.success_response(data=interview, message="Interview scheduled")


@router.post("/recruiting/offers", response_model=APIResponse[OfferLetterResponse])
async def create_offer_letter(
    offer_data: OfferLetterCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create offer letter"""
    tenant_id = get_tenant_id(request)
    service = OnboardingService(db)
    offer = await service.create_offer_letter(offer_data, tenant_id)
    return APIResponse.success_response(data=offer, message="Offer letter created")
