"""Business logic for invoice-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope
from shared_libs.ai.client import get_ai_client

from ..schemas.request import (
    ExpenseClaimCreate, ExpenseReceiptCreate,
    VendorCreate, PayableCreate, TravelRequestCreate
)
from ..schemas.response import (
    ExpenseClaimResponse, ExpenseReceiptResponse,
    VendorResponse, PayableResponse, TravelRequestResponse
)
from ..repositories.repo import InvoiceRepository
from ..events.producers import EventProducer


class InvoiceService:
    """Invoice service - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = InvoiceRepository(db)
        self.event_producer = EventProducer()
        self.ai_client = get_ai_client()
    
    async def create_expense_claim(
        self,
        data: ExpenseClaimCreate,
        tenant_id: UUID
    ) -> ExpenseClaimResponse:
        """Create expense claim"""
        claim = self.repo.create_expense_claim(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.EXPENSE_SUBMITTED,
            tenant_id=tenant_id,
            payload={"claim_id": str(claim.id), "employee_id": str(data.employee_id)}
        )
        await self.event_producer.publish(event)
        
        return ExpenseClaimResponse.model_validate(claim)
    
    async def get_expense_claims(
        self,
        tenant_id: UUID,
        employee_id: UUID | None = None,
        status: str | None = None
    ) -> list[ExpenseClaimResponse]:
        """Get expense claims"""
        claims = self.repo.get_expense_claims(tenant_id, employee_id, status)
        return [ExpenseClaimResponse.model_validate(c) for c in claims]
    
    async def approve_expense_claim(
        self,
        claim_id: UUID,
        approver_id: UUID,
        tenant_id: UUID
    ) -> ExpenseClaimResponse | None:
        """Approve expense claim"""
        claim = self.repo.approve_expense_claim(claim_id, approver_id, tenant_id)
        if not claim:
            return None
        
        event = EventEnvelope(
            event_type=EventType.EXPENSE_APPROVED,
            tenant_id=tenant_id,
            payload={"claim_id": str(claim_id)}
        )
        await self.event_producer.publish(event)
        
        return ExpenseClaimResponse.model_validate(claim)
    
    async def process_expense_receipt(
        self,
        receipt_content: bytes,
        filename: str,
        tenant_id: UUID
    ) -> dict:
        """Process expense receipt with AI"""
        try:
            result = await self.ai_client.process_expense_receipt(receipt_content, filename)
            return result.get("expense_data", {})
        except Exception as e:
            return {"error": str(e)}
    
    async def create_vendor(
        self,
        data: VendorCreate,
        tenant_id: UUID
    ) -> VendorResponse:
        """Create vendor"""
        vendor = self.repo.create_vendor(data, tenant_id)
        return VendorResponse.model_validate(vendor)
    
    async def create_payable(
        self,
        data: PayableCreate,
        tenant_id: UUID
    ) -> PayableResponse:
        """Create payable"""
        payable = self.repo.create_payable(data, tenant_id)
        return PayableResponse.model_validate(payable)
    
    async def create_travel_request(
        self,
        data: TravelRequestCreate,
        tenant_id: UUID
    ) -> TravelRequestResponse:
        """Create travel request"""
        request = self.repo.create_travel_request(data, tenant_id)
        return TravelRequestResponse.model_validate(request)
    
    async def get_travel_requests(
        self,
        tenant_id: UUID,
        employee_id: UUID | None = None,
        status: str | None = None
    ) -> list[TravelRequestResponse]:
        """Get travel requests"""
        requests = self.repo.get_travel_requests(tenant_id, employee_id, status)
        return [TravelRequestResponse.model_validate(r) for r in requests]

