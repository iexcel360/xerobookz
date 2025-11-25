"""Database models for payment-service"""

from sqlalchemy import Column, String, DateTime, Text, Boolean, JSON, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
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


# ========== ENTERPRISE: CORPORATE CARDS MODELS ==========

class CorporateCard(BaseModel):
    """Corporate card model"""
    
    __tablename__ = "corporate_cards"
    
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    card_number = Column(String(50), nullable=False)  # masked
    card_type = Column(String(50), nullable=False)  # virtual, physical
    spending_limit = Column(Numeric(10, 2), nullable=True)
    monthly_limit = Column(Numeric(10, 2), nullable=True)
    merchant_restrictions = Column(JSON, nullable=True)  # List of allowed/blocked merchants
    category_restrictions = Column(JSON, nullable=True)  # List of allowed/blocked categories
    status = Column(String(50), default="active")  # active, suspended, cancelled
    issued_at = Column(DateTime, nullable=False)
    expires_at = Column(DateTime, nullable=True)
