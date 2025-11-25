"""Response schemas"""

from pydantic import BaseModel
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import datetime


class OrganizationResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    name: str
    legal_name: Optional[str]
    ein: Optional[str]
    address: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    website: Optional[str]
    hrbp_email: Optional[str]
    settings: Optional[Dict[str, Any]]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class DepartmentResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    organization_id: UUID
    name: str
    code: Optional[str]
    manager_id: Optional[UUID]
    parent_department_id: Optional[UUID]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# ========== ENTERPRISE: BENEFITS ADMIN RESPONSE SCHEMAS ==========

class BenefitPlanResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    name: str
    plan_type: str
    provider: Optional[str]
    plan_code: Optional[str]
    description: Optional[str]
    eligibility_rules: Optional[Dict[str, Any]]
    coverage_details: Optional[Dict[str, Any]]
    effective_date: date
    expiration_date: Optional[date]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class BenefitEnrollmentResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    benefit_plan_id: UUID
    enrollment_date: date
    coverage_start_date: date
    coverage_end_date: Optional[date]
    dependents_count: int
    dependents_info: Optional[Dict[str, Any]]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# ========== ENTERPRISE: ITSM AGENT RESPONSE SCHEMAS ==========

class ITTicketResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    ticket_number: str
    requester_id: UUID
    assignee_id: Optional[UUID]
    category: str
    priority: str
    status: str
    subject: str
    description: Optional[str]
    resolution: Optional[str]
    created_at: datetime
    updated_at: datetime
    resolved_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class IdentityRequestResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    employee_id: UUID
    request_type: str
    requested_systems: Optional[Dict[str, Any]]
    requested_permissions: Optional[Dict[str, Any]]
    approver_id: Optional[UUID]
    status: str
    approval_workflow: Optional[Dict[str, Any]]
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True

