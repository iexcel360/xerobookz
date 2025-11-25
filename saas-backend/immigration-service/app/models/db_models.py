"""Database models for immigration-service"""

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


# ========== ENTERPRISE: GLOBAL CONTRACTORS + EOR MODELS ==========

class Contractor(BaseModel):
    """Global contractor model"""
    
    __tablename__ = "contractors"
    
    name = Column(String(255), nullable=False)
    country_code = Column(String(3), nullable=False)  # ISO country code
    contract_type = Column(String(50), nullable=False)  # independent, fixed_term, etc.
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    hourly_rate = Column(Numeric(10, 2), nullable=True)
    monthly_rate = Column(Numeric(10, 2), nullable=True)
    currency = Column(String(10), default="USD")
    status = Column(String(50), default="active")  # active, terminated, completed
    
    workflows = relationship("EORWorkflow", back_populates="contractor")
    payouts = relationship("GlobalPayout", back_populates="contractor")


class EORWorkflow(BaseModel):
    """EOR (Employer of Record) workflow model"""
    
    __tablename__ = "eor_workflows"
    
    contractor_id = Column(UUID(as_uuid=True), ForeignKey("contractors.id"), nullable=False)
    country_code = Column(String(3), nullable=False)
    workflow_type = Column(String(50), nullable=False)  # onboarding, payroll, compliance, offboarding
    status = Column(String(50), default="pending")  # pending, in_progress, completed, failed
    workflow_data = Column(JSON, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    contractor = relationship("Contractor", back_populates="workflows")


class GlobalPayout(BaseModel):
    """Global payout model"""
    
    __tablename__ = "global_payouts"
    
    contractor_id = Column(UUID(as_uuid=True), ForeignKey("contractors.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(10), nullable=False)
    payout_date = Column(Date, nullable=False)
    payment_method = Column(String(50), nullable=True)  # bank_transfer, wire, etc.
    status = Column(String(50), default="pending")  # pending, processing, completed, failed
    transaction_id = Column(String(100), nullable=True)
    
    contractor = relationship("Contractor", back_populates="payouts")
