"""Request schemas for immigration-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from decimal import Decimal
from datetime import date


class ContractorCreate(BaseModel):
    """Create contractor"""
    name: str
    country_code: str
    contract_type: str
    start_date: str  # ISO date string
    end_date: Optional[str] = None  # ISO date string
    hourly_rate: Optional[Decimal] = None
    monthly_rate: Optional[Decimal] = None
    currency: str = "USD"


class EORWorkflowCreate(BaseModel):
    """Create EOR workflow"""
    contractor_id: UUID
    country_code: str
    workflow_type: str
    workflow_data: Optional[Dict[str, Any]] = None


class GlobalPayoutCreate(BaseModel):
    """Create global payout"""
    contractor_id: UUID
    amount: Decimal
    currency: str
    payout_date: str  # ISO date string
    payment_method: Optional[str] = None

