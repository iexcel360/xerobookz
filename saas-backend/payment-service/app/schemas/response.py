"""Response schemas for payment-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from decimal import Decimal


class CorporateCardResponse(BaseModel):
    """Corporate card response"""
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    card_number: str
    card_type: str
    spending_limit: Optional[Decimal]
    monthly_limit: Optional[Decimal]
    merchant_restrictions: Optional[Dict[str, Any]]
    category_restrictions: Optional[Dict[str, Any]]
    status: str
    issued_at: datetime
    expires_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

