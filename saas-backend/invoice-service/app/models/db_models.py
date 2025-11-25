"""Database models for invoice-service"""

from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey, Date, JSON, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from uuid import uuid4
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.postgres import Base


class BaseModel(Base):
    """Base model with tenant support"""
    __abstract__ = True
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


# ========== ENTERPRISE: EXPENSE MANAGEMENT MODELS ==========

class ExpenseClaim(BaseModel):
    """Expense claim model"""
    
    __tablename__ = "expense_claims"
    
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    total_amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(10), default="USD")
    status = Column(String(50), default="draft")  # draft, submitted, approved, reimbursed
    submitted_at = Column(DateTime, nullable=True)
    approved_at = Column(DateTime, nullable=True)
    approved_by = Column(UUID(as_uuid=True), nullable=True)
    
    receipts = relationship("ExpenseReceipt", back_populates="expense_claim")


class ExpenseReceipt(BaseModel):
    """Expense receipt model"""
    
    __tablename__ = "expense_receipts"
    
    expense_claim_id = Column(UUID(as_uuid=True), ForeignKey("expense_claims.id"), nullable=False)
    receipt_url = Column(String(500), nullable=True)
    amount = Column(Numeric(10, 2), nullable=False)
    merchant = Column(String(255), nullable=True)
    date = Column(Date, nullable=True)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    
    expense_claim = relationship("ExpenseClaim", back_populates="receipts")


# ========== ENTERPRISE: BILL PAY MODELS ==========

class Vendor(BaseModel):
    """Vendor model"""
    
    __tablename__ = "vendors"
    
    name = Column(String(255), nullable=False)
    contact_info = Column(JSON, nullable=True)
    tax_id = Column(String(50), nullable=True)
    payment_terms = Column(String(100), nullable=True)
    
    payables = relationship("Payable", back_populates="vendor")


class Payable(BaseModel):
    """Payable model"""
    
    __tablename__ = "payables"
    
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    invoice_number = Column(String(100), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    due_date = Column(Date, nullable=False)
    status = Column(String(50), default="pending")  # pending, approved, paid
    paid_at = Column(DateTime, nullable=True)
    
    vendor = relationship("Vendor", back_populates="payables")


# ========== ENTERPRISE: TRAVEL MODELS ==========

class TravelRequest(BaseModel):
    """Travel request model"""
    
    __tablename__ = "travel_requests"
    
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    destination = Column(String(255), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    purpose = Column(Text, nullable=True)
    estimated_cost = Column(Numeric(10, 2), nullable=True)
    status = Column(String(50), default="pending")  # pending, approved, rejected, completed
    approved_by = Column(UUID(as_uuid=True), nullable=True)
    approved_at = Column(DateTime, nullable=True)
