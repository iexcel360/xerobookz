"""API routes for organization-service"""

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
    OrganizationCreate, OrganizationUpdate, DepartmentCreate,
    BenefitPlanCreate, BenefitEnrollmentCreate,
    ITTicketCreate, IdentityRequestCreate
)
from ..schemas.response import (
    OrganizationResponse, DepartmentResponse,
    BenefitPlanResponse, BenefitEnrollmentResponse,
    ITTicketResponse, IdentityRequestResponse
)
from ..services.business import OrganizationService

router = APIRouter(prefix="/organization", tags=["organization"])


@router.get("", response_model=APIResponse[OrganizationResponse])
async def get_organization(
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get organization"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    org = await service.get_organization(tenant_id)
    if not org:
        return APIResponse.error_response("NOT_FOUND", "Organization not found")
    return APIResponse.success_response(data=org)


@router.post("", response_model=APIResponse[OrganizationResponse])
async def create_organization(
    org_data: OrganizationCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create organization"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    org = await service.create_organization(org_data, tenant_id)
    return APIResponse.success_response(data=org, message="Organization created")


@router.patch("", response_model=APIResponse[OrganizationResponse])
async def update_organization(
    org_data: OrganizationUpdate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Update organization"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    org = await service.update_organization(org_data, tenant_id)
    return APIResponse.success_response(data=org, message="Organization updated")


@router.get("/departments", response_model=APIResponse[list[DepartmentResponse]])
async def get_departments(
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get all departments"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    depts = await service.get_departments(tenant_id)
    return APIResponse.success_response(data=depts)


@router.post("/departments", response_model=APIResponse[DepartmentResponse])
async def create_department(
    dept_data: DepartmentCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create department"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    dept = await service.create_department(dept_data, tenant_id)
    return APIResponse.success_response(data=dept, message="Department created")


# ========== ENTERPRISE: BENEFITS ADMIN ENDPOINTS ==========

@router.post("/benefits/plans", response_model=APIResponse[BenefitPlanResponse])
async def create_benefit_plan(
    plan_data: BenefitPlanCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create benefit plan"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    plan = await service.create_benefit_plan(plan_data, tenant_id)
    return APIResponse.success_response(data=plan, message="Benefit plan created")


@router.get("/benefits/plans", response_model=APIResponse[list[BenefitPlanResponse]])
async def get_benefit_plans(
    request: Request,
    plan_type: str = None,
    is_active: bool = None,
    db: Session = Depends(get_db_session)
):
    """Get benefit plans"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    plans = await service.get_benefit_plans(tenant_id, plan_type, is_active)
    return APIResponse.success_response(data=plans)


@router.post("/benefits/enrollments", response_model=APIResponse[BenefitEnrollmentResponse])
async def create_benefit_enrollment(
    enrollment_data: BenefitEnrollmentCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create benefit enrollment"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    enrollment = await service.create_benefit_enrollment(enrollment_data, tenant_id)
    return APIResponse.success_response(data=enrollment, message="Benefit enrollment created")


@router.get("/benefits/enrollments", response_model=APIResponse[list[BenefitEnrollmentResponse]])
async def get_benefit_enrollments(
    request: Request,
    employee_id: UUID = None,
    db: Session = Depends(get_db_session)
):
    """Get benefit enrollments"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    enrollments = await service.get_benefit_enrollments(tenant_id, employee_id)
    return APIResponse.success_response(data=enrollments)


# ========== ENTERPRISE: ITSM AGENT ENDPOINTS ==========

@router.post("/it/tickets", response_model=APIResponse[ITTicketResponse])
async def create_it_ticket(
    ticket_data: ITTicketCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create IT ticket"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    ticket = await service.create_it_ticket(ticket_data, tenant_id)
    return APIResponse.success_response(data=ticket, message="IT ticket created")


@router.get("/it/tickets", response_model=APIResponse[list[ITTicketResponse]])
async def get_it_tickets(
    request: Request,
    status: str = None,
    assignee_id: UUID = None,
    db: Session = Depends(get_db_session)
):
    """Get IT tickets"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    tickets = await service.get_it_tickets(tenant_id, status, assignee_id)
    return APIResponse.success_response(data=tickets)


@router.post("/it/identity-requests", response_model=APIResponse[IdentityRequestResponse])
async def create_identity_request(
    request_data: IdentityRequestCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create identity request"""
    tenant_id = get_tenant_id(request)
    service = OrganizationService(db)
    identity_request = await service.create_identity_request(request_data, tenant_id)
    return APIResponse.success_response(data=identity_request, message="Identity request created")
