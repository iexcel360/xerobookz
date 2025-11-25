"""API routes for marketing-service - Extended for Enterprise"""

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
    CourseCreate, CourseAssignmentCreate,
    SurveyCreate, SurveyResponseCreate,
    CRMContactCreate, CRMLeadCreate, CRMOpportunityCreate
)
from ..schemas.response import (
    CourseResponse, CourseAssignmentResponse,
    SurveyResponse, SurveyResponseDataResponse,
    CRMContactResponse, CRMLeadResponse, CRMOpportunityResponse
)
from ..services.business import MarketingService

router = APIRouter(prefix="/marketing", tags=["marketing"])


# ========== ENTERPRISE: LMS ENDPOINTS ==========

@router.post("/lms/courses", response_model=APIResponse[CourseResponse])
async def create_course(
    course_data: CourseCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create course"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    course = await service.create_course(course_data, tenant_id)
    return APIResponse.success_response(data=course, message="Course created")


@router.get("/lms/courses", response_model=APIResponse[list[CourseResponse]])
async def get_courses(
    request: Request,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get courses"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    courses = await service.get_courses(tenant_id, status)
    return APIResponse.success_response(data=courses)


@router.post("/lms/assignments", response_model=APIResponse[CourseAssignmentResponse])
async def create_course_assignment(
    assignment_data: CourseAssignmentCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create course assignment"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    assignment = await service.create_course_assignment(assignment_data, tenant_id)
    return APIResponse.success_response(data=assignment, message="Course assigned")


# ========== ENTERPRISE: SURVEYS ENDPOINTS ==========

@router.post("/surveys", response_model=APIResponse[SurveyResponse])
async def create_survey(
    survey_data: SurveyCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create survey"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    survey = await service.create_survey(survey_data, tenant_id)
    return APIResponse.success_response(data=survey, message="Survey created")


@router.get("/surveys", response_model=APIResponse[list[SurveyResponse]])
async def get_surveys(
    request: Request,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get surveys"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    surveys = await service.get_surveys(tenant_id, status)
    return APIResponse.success_response(data=surveys)


@router.post("/surveys/{survey_id}/responses", response_model=APIResponse[SurveyResponseDataResponse])
async def create_survey_response(
    survey_id: UUID,
    response_data: SurveyResponseCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create survey response"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    response = await service.create_survey_response(survey_id, response_data, tenant_id)
    return APIResponse.success_response(data=response, message="Survey response submitted")


# ========== ENTERPRISE: CRM ENDPOINTS ==========

@router.post("/crm/contacts", response_model=APIResponse[CRMContactResponse])
async def create_crm_contact(
    contact_data: CRMContactCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create CRM contact"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    contact = await service.create_crm_contact(contact_data, tenant_id)
    return APIResponse.success_response(data=contact, message="CRM contact created")


@router.post("/crm/leads", response_model=APIResponse[CRMLeadResponse])
async def create_crm_lead(
    lead_data: CRMLeadCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create CRM lead"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    lead = await service.create_crm_lead(lead_data, tenant_id)
    return APIResponse.success_response(data=lead, message="CRM lead created")


@router.post("/crm/opportunities", response_model=APIResponse[CRMOpportunityResponse])
async def create_crm_opportunity(
    opportunity_data: CRMOpportunityCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create CRM opportunity"""
    tenant_id = get_tenant_id(request)
    service = MarketingService(db)
    opportunity = await service.create_crm_opportunity(opportunity_data, tenant_id)
    return APIResponse.success_response(data=opportunity, message="CRM opportunity created")
