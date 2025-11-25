"""Repository for invoice-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime

from ..models.db_models import ExpenseClaim, ExpenseReceipt, Vendor, Payable, TravelRequest
from ..schemas.request import (
    ExpenseClaimCreate, ExpenseReceiptCreate,
    VendorCreate, PayableCreate, TravelRequestCreate
)


class InvoiceRepository:
    """Invoice repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    # Expense Methods
    def create_expense_claim(self, data: ExpenseClaimCreate, tenant_id: UUID) -> ExpenseClaim:
        """Create expense claim"""
        claim = ExpenseClaim(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            total_amount=data.total_amount,
            currency=data.currency
        )
        self.db.add(claim)
        self.db.commit()
        self.db.refresh(claim)
        return claim
    
    def get_expense_claims(
        self,
        tenant_id: UUID,
        employee_id: Optional[UUID] = None,
        status: Optional[str] = None
    ) -> List[ExpenseClaim]:
        """Get expense claims"""
        query = self.db.query(ExpenseClaim).filter(ExpenseClaim.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(ExpenseClaim.employee_id == employee_id)
        if status:
            query = query.filter(ExpenseClaim.status == status)
        return query.order_by(ExpenseClaim.created_at.desc()).all()
    
    def approve_expense_claim(
        self,
        claim_id: UUID,
        approver_id: UUID,
        tenant_id: UUID
    ) -> Optional[ExpenseClaim]:
        """Approve expense claim"""
        claim = self.db.query(ExpenseClaim).filter(
            ExpenseClaim.id == claim_id,
            ExpenseClaim.tenant_id == tenant_id
        ).first()
        if not claim:
            return None
        
        claim.status = "approved"
        claim.approved_by = approver_id
        claim.approved_at = datetime.now()
        self.db.commit()
        self.db.refresh(claim)
        return claim
    
    def create_vendor(self, data: VendorCreate, tenant_id: UUID) -> Vendor:
        """Create vendor"""
        vendor = Vendor(
            tenant_id=tenant_id,
            name=data.name,
            contact_info=data.contact_info,
            tax_id=data.tax_id,
            payment_terms=data.payment_terms
        )
        self.db.add(vendor)
        self.db.commit()
        self.db.refresh(vendor)
        return vendor
    
    def create_payable(self, data: PayableCreate, tenant_id: UUID) -> Payable:
        """Create payable"""
        payable = Payable(
            tenant_id=tenant_id,
            vendor_id=data.vendor_id,
            invoice_number=data.invoice_number,
            amount=data.amount,
            due_date=datetime.fromisoformat(data.due_date).date()
        )
        self.db.add(payable)
        self.db.commit()
        self.db.refresh(payable)
        return payable
    
    def create_travel_request(self, data: TravelRequestCreate, tenant_id: UUID) -> TravelRequest:
        """Create travel request"""
        request = TravelRequest(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            destination=data.destination,
            start_date=datetime.fromisoformat(data.start_date).date(),
            end_date=datetime.fromisoformat(data.end_date).date(),
            purpose=data.purpose,
            estimated_cost=data.estimated_cost
        )
        self.db.add(request)
        self.db.commit()
        self.db.refresh(request)
        return request
    
    def get_travel_requests(
        self,
        tenant_id: UUID,
        employee_id: Optional[UUID] = None,
        status: Optional[str] = None
    ) -> List[TravelRequest]:
        """Get travel requests"""
        query = self.db.query(TravelRequest).filter(TravelRequest.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(TravelRequest.employee_id == employee_id)
        if status:
            query = query.filter(TravelRequest.status == status)
        return query.order_by(TravelRequest.start_date.desc()).all()

