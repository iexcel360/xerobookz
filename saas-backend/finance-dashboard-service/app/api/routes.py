"""API routes for finance-dashboard-service - Extended for Enterprise"""

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import PayrollRunCreate, HeadcountPlanCreate
from ..schemas.response import PayrollRunResponse, PayrollEntryResponse, HeadcountPlanResponse
from ..services.business import FinanceService

router = APIRouter(prefix="/finance", tags=["finance"])


# ========== ENTERPRISE: PAYROLL ENDPOINTS ==========

@router.post("/payroll/run", response_model=APIResponse[PayrollRunResponse])
async def create_payroll_run(
    run_data: PayrollRunCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create payroll run"""
    tenant_id = get_tenant_id(request)
    service = FinanceService(db)
    run = await service.create_payroll_run(run_data, tenant_id)
    return APIResponse.success_response(data=run, message="Payroll run created")


@router.get("/payroll/runs", response_model=APIResponse[list[PayrollRunResponse]])
async def get_payroll_runs(
    request: Request,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get payroll runs"""
    tenant_id = get_tenant_id(request)
    service = FinanceService(db)
    runs = await service.get_payroll_runs(tenant_id, status)
    return APIResponse.success_response(data=runs)


@router.get("/payroll/employees/{employee_id}", response_model=APIResponse[list[PayrollEntryResponse]])
async def get_employee_payroll(
    employee_id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get payroll entries for employee"""
    tenant_id = get_tenant_id(request)
    service = FinanceService(db)
    entries = await service.get_payroll_entries_for_employee(tenant_id, employee_id)
    return APIResponse.success_response(data=entries)


# ========== ENTERPRISE: HEADCOUNT PLANNING ENDPOINTS ==========

@router.post("/headcount/plan", response_model=APIResponse[HeadcountPlanResponse])
async def create_headcount_plan(
    plan_data: HeadcountPlanCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create headcount plan"""
    tenant_id = get_tenant_id(request)
    service = FinanceService(db)
    plan = await service.create_headcount_plan(plan_data, tenant_id)
    return APIResponse.success_response(data=plan, message="Headcount plan created")


@router.get("/headcount/plans", response_model=APIResponse[list[HeadcountPlanResponse]])
async def get_headcount_plans(
    request: Request,
    fiscal_year: str = None,
    db: Session = Depends(get_db_session)
):
    """Get headcount plans"""
    tenant_id = get_tenant_id(request)
    service = FinanceService(db)
    plans = await service.get_headcount_plans(tenant_id, fiscal_year)
    return APIResponse.success_response(data=plans)


@router.get("/headcount/projections", response_model=APIResponse[dict])
async def get_headcount_projections(
    request: Request,
    fiscal_year: str,
    db: Session = Depends(get_db_session)
):
    """Get headcount projections"""
    tenant_id = get_tenant_id(request)
    service = FinanceService(db)
    projections = await service.get_headcount_projections(tenant_id, fiscal_year)
    return APIResponse.success_response(data=projections)
