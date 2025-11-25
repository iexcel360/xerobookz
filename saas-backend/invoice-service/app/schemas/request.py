"""Request schemas for invoice-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from uuid import UUID
from decimal import Decimal
from datetime import date


class ExpenseClaimCreate(BaseModel):
    """Create expense claim"""
    employee_id: UUID
    total_amount: Decimal
    currency: str = "USD"
    receipts: Optional[List[Dict[str, Any]]] = None


class ExpenseReceiptCreate(BaseModel):
    """Create expense receipt"""
    expense_claim_id: UUID
    receipt_url: Optional[str] = None
    amount: Decimal
    merchant: Optional[str] = None
    date: Optional[str] = None  # ISO date string
    category: Optional[str] = None
    description: Optional[str] = None


class VendorCreate(BaseModel):
    """Create vendor"""
    name: str
    contact_info: Optional[Dict[str, Any]] = None
    tax_id: Optional[str] = None
    payment_terms: Optional[str] = None


class PayableCreate(BaseModel):
    """Create payable"""
    vendor_id: UUID
    invoice_number: str
    amount: Decimal
    due_date: str  # ISO date string


class TravelRequestCreate(BaseModel):
    """Create travel request"""
    employee_id: UUID
    destination: str
    start_date: str  # ISO date string
    end_date: str  # ISO date string
    purpose: Optional[str] = None
    estimated_cost: Optional[Decimal] = None

