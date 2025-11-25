"""Database models for organization-service"""

from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Boolean, JSON, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from uuid import uuid4
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.postgres import Base


class Organization(Base):
    """Organization model"""
    
    __tablename__ = "organizations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    legal_name = Column(String(255), nullable=True)
    ein = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    phone = Column(String(20), nullable=True)
    email = Column(String(255), nullable=True)
    website = Column(String(255), nullable=True)
    hrbp_email = Column(String(255), nullable=True)
    settings = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    departments = relationship("Department", back_populates="organization")
    locations = relationship("Location", back_populates="organization")
    teams = relationship("Team", back_populates="organization")


class Department(Base):
    """Department model"""
    
    __tablename__ = "departments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    code = Column(String(50), nullable=True)
    manager_id = Column(UUID(as_uuid=True), nullable=True)
    parent_department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id"), nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    organization = relationship("Organization", back_populates="departments")


class Location(Base):
    """Location/Office model"""
    
    __tablename__ = "locations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(50), nullable=True)
    zip_code = Column(String(20), nullable=True)
    country = Column(String(100), nullable=True)
    is_headquarters = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    organization = relationship("Organization", back_populates="locations")


class Team(Base):
    """Team model"""
    
    __tablename__ = "teams"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id"), nullable=True)
    name = Column(String(255), nullable=False)
    lead_id = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    organization = relationship("Organization", back_populates="teams")


# ========== ENTERPRISE: BENEFITS ADMIN MODELS ==========

class BenefitPlan(Base):
    """Benefit plan model"""
    
    __tablename__ = "benefit_plans"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    plan_type = Column(String(50), nullable=False)  # health, dental, vision, retirement, etc.
    provider = Column(String(255), nullable=True)
    plan_code = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    eligibility_rules = Column(JSON, nullable=True)
    coverage_details = Column(JSON, nullable=True)
    effective_date = Column(Date, nullable=False)
    expiration_date = Column(Date, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class BenefitEnrollment(Base):
    """Benefit enrollment model"""
    
    __tablename__ = "benefit_enrollments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    benefit_plan_id = Column(UUID(as_uuid=True), ForeignKey("benefit_plans.id"), nullable=False)
    enrollment_date = Column(Date, nullable=False)
    coverage_start_date = Column(Date, nullable=False)
    coverage_end_date = Column(Date, nullable=True)
    dependents_count = Column(String(10), default="0")
    dependents_info = Column(JSON, nullable=True)
    status = Column(String(50), default="active")  # active, cancelled, terminated
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


# ========== ENTERPRISE: ITSM AGENT MODELS ==========

class ITTicket(Base):
    """IT service ticket model"""
    
    __tablename__ = "it_tickets"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    ticket_number = Column(String(50), unique=True, nullable=False)
    requester_id = Column(UUID(as_uuid=True), nullable=False)
    assignee_id = Column(UUID(as_uuid=True), nullable=True)
    category = Column(String(100), nullable=False)  # hardware, software, access, network, etc.
    priority = Column(String(20), default="medium")  # low, medium, high, critical
    status = Column(String(50), default="open")  # open, in_progress, resolved, closed
    subject = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    resolution = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    resolved_at = Column(DateTime, nullable=True)


class IdentityRequest(Base):
    """IT identity request model"""
    
    __tablename__ = "identity_requests"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    employee_id = Column(UUID(as_uuid=True), nullable=False)
    request_type = Column(String(50), nullable=False)  # new_user, access_change, termination, etc.
    requested_systems = Column(JSON, nullable=True)  # List of systems/applications
    requested_permissions = Column(JSON, nullable=True)
    approver_id = Column(UUID(as_uuid=True), nullable=True)
    status = Column(String(50), default="pending")  # pending, approved, rejected, completed
    approval_workflow = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    completed_at = Column(DateTime, nullable=True)
