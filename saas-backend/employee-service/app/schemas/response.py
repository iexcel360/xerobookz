"""Response schemas - Extended for Enterprise HRIS"""

from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime, date
from decimal import Decimal


class EmployeeResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_number: str
    first_name: str
    last_name: str
    email: Optional[str]
    phone: Optional[str]
    hire_date: Optional[date]
    termination_date: Optional[date]
    status: str
    department_id: Optional[UUID]
    manager_id: Optional[UUID]
    job_title: Optional[str]
    location_id: Optional[UUID]
    # HRIS Extended Fields
    job_code: Optional[str] = None
    job_family: Optional[str] = None
    employment_type: Optional[str] = None
    employee_class: Optional[str] = None
    cost_center: Optional[str] = None
    business_unit: Optional[str] = None
    division: Optional[str] = None
    country_code: Optional[str] = None
    timezone: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# ========== ENTERPRISE HRIS RESPONSE SCHEMAS ==========

class CompensationBandResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    job_code: str
    job_family: Optional[str]
    band_level: str
    country_code: str
    currency: str
    min_salary: Optional[Decimal]
    max_salary: Optional[Decimal]
    mid_point: Optional[Decimal]
    effective_date: date
    expiration_date: Optional[date]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class EmployeeCompensationResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    compensation_band_id: Optional[UUID]
    base_salary: Optional[Decimal]
    currency: str
    pay_frequency: Optional[str]
    effective_date: date
    expiration_date: Optional[date]
    bonus_target: Optional[Decimal]
    equity_grants: Optional[Dict[str, Any]]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class EmployeeBenefitResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    benefit_plan_id: UUID
    enrollment_date: date
    coverage_start_date: date
    coverage_end_date: Optional[date]
    status: str
    dependents_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class PerformanceReviewResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    reviewer_id: UUID
    review_cycle_id: Optional[UUID]
    review_type: str
    review_period_start: date
    review_period_end: date
    overall_rating: Optional[str]
    review_data: Optional[Dict[str, Any]]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class EmployeeSkillResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    skill_name: str
    skill_category: Optional[str]
    proficiency_level: Optional[str]
    years_of_experience: Optional[int]
    verified: bool
    verified_by: Optional[UUID]
    verified_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class GlobalProfileResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    country_code: str
    local_employee_id: Optional[str]
    tax_id: Optional[str]
    social_security_number: Optional[str]
    national_id: Optional[str]
    local_address: Optional[Dict[str, Any]]
    local_phone: Optional[str]
    local_emergency_contact: Optional[Dict[str, Any]]
    local_compliance_data: Optional[Dict[str, Any]]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class EmploymentHistoryResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    job_title: str
    department_id: Optional[UUID]
    manager_id: Optional[UUID]
    start_date: date
    end_date: Optional[date]
    reason_for_change: Optional[str]
    promotion: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class JobArchitectureResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    job_code: str
    job_title: str
    job_family: Optional[str]
    job_level: Optional[str]
    job_category: Optional[str]
    description: Optional[str]
    requirements: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
