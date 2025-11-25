"""Response schemas for immigration-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime, date
from decimal import Decimal


class ContractorResponse(BaseModel):
    """Contractor response"""
    id: UUID
    tenant_id: UUID
    name: str
    country_code: str
    contract_type: str
    start_date: date
    end_date: Optional[date]
    hourly_rate: Optional[Decimal]
    monthly_rate: Optional[Decimal]
    currency: str
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class EORWorkflowResponse(BaseModel):
    """EOR workflow response"""
    id: UUID
    tenant_id: UUID
    contractor_id: UUID
    country_code: str
    workflow_type: str
    status: str
    workflow_data: Optional[Dict[str, Any]]
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class GlobalPayoutResponse(BaseModel):
    """Global payout response"""
    id: UUID
    tenant_id: UUID
    contractor_id: UUID
    amount: Decimal
    currency: str
    payout_date: date
    payment_method: Optional[str]
    status: str
    transaction_id: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

