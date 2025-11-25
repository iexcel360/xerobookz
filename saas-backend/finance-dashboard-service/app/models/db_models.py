"""Database models for finance-dashboard-service"""

from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey, Date, JSON, Numeric, Integer
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


# ========== ENTERPRISE: PAYROLL MODELS ==========

class PayrollRun(BaseModel):
    """Payroll run model"""
    
    __tablename__ = "payroll_runs"
    
    run_date = Column(Date, nullable=False)
    pay_period_start = Column(Date, nullable=False)
    pay_period_end = Column(Date, nullable=False)
    status = Column(String(50), default="pending")  # pending, processing, completed, failed
    total_amount = Column(Numeric(10, 2), nullable=True)
    employee_count = Column(Integer, default=0)
    notes = Column(Text, nullable=True)
    
    entries = relationship("PayrollEntry", back_populates="payroll_run")


class PayrollEntry(BaseModel):
    """Payroll entry model"""
    
    __tablename__ = "payroll_entries"
    
    payroll_run_id = Column(UUID(as_uuid=True), ForeignKey("payroll_runs.id"), nullable=False)
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    gross_pay = Column(Numeric(10, 2), nullable=False)
    deductions = Column(JSON, nullable=True)
    taxes = Column(JSON, nullable=True)
    net_pay = Column(Numeric(10, 2), nullable=False)
    pay_frequency = Column(String(50), nullable=True)
    
    payroll_run = relationship("PayrollRun", back_populates="entries")


# ========== ENTERPRISE: HEADCOUNT PLANNING MODELS ==========

class HeadcountPlan(BaseModel):
    """Headcount plan model"""
    
    __tablename__ = "headcount_plans"
    
    plan_name = Column(String(255), nullable=False)
    fiscal_year = Column(String(10), nullable=False)
    department_id = Column(UUID(as_uuid=True), nullable=True)
    planned_headcount = Column(Integer, nullable=False)
    current_headcount = Column(Integer, default=0)
    budget = Column(Numeric(12, 2), nullable=True)
    projections = Column(JSON, nullable=True)  # Monthly/quarterly projections
    status = Column(String(50), default="draft")  # draft, approved, active
