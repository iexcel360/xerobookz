"""Response schemas for finance-dashboard-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from uuid import UUID
from datetime import datetime, date
from decimal import Decimal


class PayrollRunResponse(BaseModel):
    """Payroll run response"""
    id: UUID
    tenant_id: UUID
    run_date: date
    pay_period_start: date
    pay_period_end: date
    status: str
    total_amount: Optional[Decimal]
    employee_count: int
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class PayrollEntryResponse(BaseModel):
    """Payroll entry response"""
    id: UUID
    tenant_id: UUID
    payroll_run_id: UUID
    employee_id: UUID
    gross_pay: Decimal
    deductions: Optional[Dict[str, Any]]
    taxes: Optional[Dict[str, Any]]
    net_pay: Decimal
    pay_frequency: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


class HeadcountPlanResponse(BaseModel):
    """Headcount plan response"""
    id: UUID
    tenant_id: UUID
    plan_name: str
    fiscal_year: str
    department_id: Optional[UUID]
    planned_headcount: int
    current_headcount: int
    budget: Optional[Decimal]
    projections: Optional[Dict[str, Any]]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

