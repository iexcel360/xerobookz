"""Request schemas for finance-dashboard-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from decimal import Decimal


class PayrollRunCreate(BaseModel):
    """Create payroll run"""
    run_date: str  # ISO date string
    pay_period_start: str  # ISO date string
    pay_period_end: str  # ISO date string
    notes: Optional[str] = None


class HeadcountPlanCreate(BaseModel):
    """Create headcount plan"""
    plan_name: str
    fiscal_year: str
    department_id: Optional[UUID] = None
    planned_headcount: int
    budget: Optional[Decimal] = None
    projections: Optional[Dict[str, Any]] = None

