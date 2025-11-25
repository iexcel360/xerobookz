"""Response schemas for invoice-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from uuid import UUID
from datetime import datetime, date
from decimal import Decimal


class ExpenseClaimResponse(BaseModel):
    """Expense claim response"""
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    total_amount: Decimal
    currency: str
    status: str
    submitted_at: Optional[datetime]
    approved_at: Optional[datetime]
    approved_by: Optional[UUID]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ExpenseReceiptResponse(BaseModel):
    """Expense receipt response"""
    id: UUID
    tenant_id: UUID
    expense_claim_id: UUID
    receipt_url: Optional[str]
    amount: Decimal
    merchant: Optional[str]
    date: Optional[date]
    category: Optional[str]
    description: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


class VendorResponse(BaseModel):
    """Vendor response"""
    id: UUID
    tenant_id: UUID
    name: str
    contact_info: Optional[Dict[str, Any]]
    tax_id: Optional[str]
    payment_terms: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class PayableResponse(BaseModel):
    """Payable response"""
    id: UUID
    tenant_id: UUID
    vendor_id: UUID
    invoice_number: str
    amount: Decimal
    due_date: date
    status: str
    paid_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class TravelRequestResponse(BaseModel):
    """Travel request response"""
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    destination: str
    start_date: date
    end_date: date
    purpose: Optional[str]
    estimated_cost: Optional[Decimal]
    status: str
    approved_by: Optional[UUID]
    approved_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

