"""API routes for invoice-service - Extended for Enterprise"""

from fastapi import APIRouter, Depends, Request, UploadFile, File
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import ExpenseClaimCreate, VendorCreate, PayableCreate, TravelRequestCreate
from ..schemas.response import ExpenseClaimResponse, VendorResponse, PayableResponse, TravelRequestResponse
from ..services.business import InvoiceService

router = APIRouter(prefix="/invoice", tags=["invoice"])


# ========== ENTERPRISE: EXPENSE MANAGEMENT ENDPOINTS ==========

@router.post("/expenses/claims", response_model=APIResponse[ExpenseClaimResponse])
async def create_expense_claim(
    claim_data: ExpenseClaimCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create expense claim"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    claim = await service.create_expense_claim(claim_data, tenant_id)
    return APIResponse.success_response(data=claim, message="Expense claim created")


@router.get("/expenses/claims", response_model=APIResponse[list[ExpenseClaimResponse]])
async def get_expense_claims(
    request: Request,
    employee_id: UUID = None,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get expense claims"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    claims = await service.get_expense_claims(tenant_id, employee_id, status)
    return APIResponse.success_response(data=claims)


@router.post("/expenses/{claim_id}/approve", response_model=APIResponse[ExpenseClaimResponse])
async def approve_expense_claim(
    claim_id: UUID,
    request: Request,
    approver_id: UUID,
    db: Session = Depends(get_db_session)
):
    """Approve expense claim"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    claim = await service.approve_expense_claim(claim_id, approver_id, tenant_id)
    if not claim:
        return APIResponse.error_response("NOT_FOUND", "Expense claim not found")
    return APIResponse.success_response(data=claim, message="Expense claim approved")


@router.post("/expenses/process-receipt", response_model=APIResponse[dict])
async def process_expense_receipt(
    file: UploadFile = File(...),
    request: Request = None,
    db: Session = Depends(get_db_session)
):
    """Process expense receipt with AI"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    content = await file.read()
    result = await service.process_expense_receipt(content, file.filename, tenant_id)
    return APIResponse.success_response(data=result, message="Receipt processed")


# ========== ENTERPRISE: BILL PAY ENDPOINTS ==========

@router.post("/billpay/vendors", response_model=APIResponse[VendorResponse])
async def create_vendor(
    vendor_data: VendorCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create vendor"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    vendor = await service.create_vendor(vendor_data, tenant_id)
    return APIResponse.success_response(data=vendor, message="Vendor created")


@router.post("/billpay/invoices", response_model=APIResponse[PayableResponse])
async def create_payable(
    payable_data: PayableCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create payable"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    payable = await service.create_payable(payable_data, tenant_id)
    return APIResponse.success_response(data=payable, message="Payable created")


# ========== ENTERPRISE: TRAVEL ENDPOINTS ==========

@router.post("/travel/requests", response_model=APIResponse[TravelRequestResponse])
async def create_travel_request(
    travel_data: TravelRequestCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create travel request"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    travel_request = await service.create_travel_request(travel_data, tenant_id)
    return APIResponse.success_response(data=travel_request, message="Travel request created")


@router.get("/travel/requests", response_model=APIResponse[list[TravelRequestResponse]])
async def get_travel_requests(
    request: Request,
    employee_id: UUID = None,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get travel requests"""
    tenant_id = get_tenant_id(request)
    service = InvoiceService(db)
    requests = await service.get_travel_requests(tenant_id, employee_id, status)
    return APIResponse.success_response(data=requests)
