"""Request schemas"""

from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from uuid import UUID
from datetime import date


class OrganizationCreate(BaseModel):
    name: str
    legal_name: Optional[str] = None
    ein: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    hrbp_email: Optional[EmailStr] = None
    settings: Optional[Dict[str, Any]] = None


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    legal_name: Optional[str] = None
    ein: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    hrbp_email: Optional[EmailStr] = None
    settings: Optional[Dict[str, Any]] = None


class DepartmentCreate(BaseModel):
    organization_id: UUID
    name: str
    code: Optional[str] = None
    manager_id: Optional[UUID] = None
    parent_department_id: Optional[UUID] = None


# ========== ENTERPRISE: BENEFITS ADMIN REQUEST SCHEMAS ==========

class BenefitPlanCreate(BaseModel):
    name: str
    plan_type: str
    provider: Optional[str] = None
    plan_code: Optional[str] = None
    description: Optional[str] = None
    eligibility_rules: Optional[Dict[str, Any]] = None
    coverage_details: Optional[Dict[str, Any]] = None
    effective_date: str  # ISO date string
    expiration_date: Optional[str] = None


class BenefitEnrollmentCreate(BaseModel):
    employee_id: UUID
    benefit_plan_id: UUID
    enrollment_date: str  # ISO date string
    coverage_start_date: str  # ISO date string
    coverage_end_date: Optional[str] = None
    dependents_count: int = 0
    dependents_info: Optional[Dict[str, Any]] = None


# ========== ENTERPRISE: ITSM AGENT REQUEST SCHEMAS ==========

class ITTicketCreate(BaseModel):
    requester_id: UUID
    assignee_id: Optional[UUID] = None
    category: str
    priority: str = "medium"
    subject: str
    description: Optional[str] = None


class IdentityRequestCreate(BaseModel):
    employee_id: UUID
    request_type: str
    requested_systems: Optional[Dict[str, Any]] = None
    requested_permissions: Optional[Dict[str, Any]] = None
    approver_id: Optional[UUID] = None

