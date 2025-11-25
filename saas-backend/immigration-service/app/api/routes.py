"""API routes for immigration-service - Extended for Enterprise"""

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import ContractorCreate, EORWorkflowCreate, GlobalPayoutCreate
from ..schemas.response import ContractorResponse, EORWorkflowResponse, GlobalPayoutResponse
from ..services.business import ImmigrationService

router = APIRouter(prefix="/immigration", tags=["immigration"])


# ========== ENTERPRISE: GLOBAL CONTRACTORS + EOR ENDPOINTS ==========

@router.post("/contractors", response_model=APIResponse[ContractorResponse])
async def create_contractor(
    contractor_data: ContractorCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create contractor"""
    tenant_id = get_tenant_id(request)
    service = ImmigrationService(db)
    contractor = await service.create_contractor(contractor_data, tenant_id)
    return APIResponse.success_response(data=contractor, message="Contractor created")


@router.get("/contractors", response_model=APIResponse[list[ContractorResponse]])
async def get_contractors(
    request: Request,
    country_code: str = None,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get contractors"""
    tenant_id = get_tenant_id(request)
    service = ImmigrationService(db)
    contractors = await service.get_contractors(tenant_id, country_code, status)
    return APIResponse.success_response(data=contractors)


@router.post("/eor/workflows", response_model=APIResponse[EORWorkflowResponse])
async def create_eor_workflow(
    workflow_data: EORWorkflowCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create EOR workflow"""
    tenant_id = get_tenant_id(request)
    service = ImmigrationService(db)
    workflow = await service.create_eor_workflow(workflow_data, tenant_id)
    return APIResponse.success_response(data=workflow, message="EOR workflow started")


@router.post("/eor/payouts", response_model=APIResponse[GlobalPayoutResponse])
async def create_global_payout(
    payout_data: GlobalPayoutCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create global payout"""
    tenant_id = get_tenant_id(request)
    service = ImmigrationService(db)
    payout = await service.create_global_payout(payout_data, tenant_id)
    return APIResponse.success_response(data=payout, message="Global payout processed")
