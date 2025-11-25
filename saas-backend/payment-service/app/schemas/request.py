"""Request schemas for payment-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from uuid import UUID
from decimal import Decimal
from datetime import datetime


class CorporateCardCreate(BaseModel):
    """Create corporate card"""
    employee_id: UUID
    card_type: str  # virtual, physical
    spending_limit: Optional[Decimal] = None
    monthly_limit: Optional[Decimal] = None
    merchant_restrictions: Optional[Dict[str, Any]] = None
    category_restrictions: Optional[Dict[str, Any]] = None


class CorporateCardLimitUpdate(BaseModel):
    """Update corporate card limits"""
    spending_limit: Optional[Decimal] = None
    monthly_limit: Optional[Decimal] = None


class CorporateCardMerchantUpdate(BaseModel):
    """Update corporate card merchant restrictions"""
    merchant_restrictions: Dict[str, Any]  # allowed_merchants, blocked_merchants

