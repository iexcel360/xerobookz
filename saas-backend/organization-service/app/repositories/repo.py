"""Repository for organization-service"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional

from ..models.db_models import (
    Organization, Department,
    BenefitPlan, BenefitEnrollment,
    ITTicket, IdentityRequest
)
from ..schemas.request import (
    OrganizationCreate, OrganizationUpdate, DepartmentCreate,
    BenefitPlanCreate, BenefitEnrollmentCreate,
    ITTicketCreate, IdentityRequestCreate
)
from datetime import datetime


class OrganizationRepository:
    """Organization repository"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_organization(self, tenant_id: UUID) -> Optional[Organization]:
        """Get organization by tenant"""
        return self.db.query(Organization).filter(
            Organization.tenant_id == tenant_id
        ).first()
    
    def create_organization(
        self,
        data: OrganizationCreate,
        tenant_id: UUID
    ) -> Organization:
        """Create organization"""
        org = Organization(
            tenant_id=tenant_id,
            name=data.name,
            legal_name=data.legal_name,
            ein=data.ein,
            address=data.address,
            phone=data.phone,
            email=data.email,
            website=data.website,
            hrbp_email=data.hrbp_email,
            settings=data.settings
        )
        self.db.add(org)
        self.db.commit()
        self.db.refresh(org)
        return org
    
    def update_organization(
        self,
        data: OrganizationUpdate,
        tenant_id: UUID
    ) -> Optional[Organization]:
        """Update organization"""
        org = self.get_organization(tenant_id)
        if not org:
            return None
        
        if data.name is not None:
            org.name = data.name
        if data.legal_name is not None:
            org.legal_name = data.legal_name
        if data.ein is not None:
            org.ein = data.ein
        if data.address is not None:
            org.address = data.address
        if data.phone is not None:
            org.phone = data.phone
        if data.email is not None:
            org.email = data.email
        if data.website is not None:
            org.website = data.website
        if data.hrbp_email is not None:
            org.hrbp_email = data.hrbp_email
        if data.settings is not None:
            org.settings = data.settings
        
        self.db.commit()
        self.db.refresh(org)
        return org
    
    def get_departments(self, tenant_id: UUID) -> list[Department]:
        """Get all departments for tenant"""
        return self.db.query(Department).filter(
            Department.tenant_id == tenant_id
        ).all()
    
    def create_department(
        self,
        data: DepartmentCreate,
        tenant_id: UUID
    ) -> Department:
        """Create department"""
        dept = Department(
            tenant_id=tenant_id,
            organization_id=data.organization_id,
            name=data.name,
            code=data.code,
            manager_id=data.manager_id,
            parent_department_id=data.parent_department_id
        )
        self.db.add(dept)
        self.db.commit()
        self.db.refresh(dept)
        return dept
    
    # ========== ENTERPRISE: BENEFITS ADMIN METHODS ==========
    
    def create_benefit_plan(
        self,
        data: BenefitPlanCreate,
        tenant_id: UUID
    ) -> BenefitPlan:
        """Create benefit plan"""
        plan = BenefitPlan(
            tenant_id=tenant_id,
            name=data.name,
            plan_type=data.plan_type,
            provider=data.provider,
            plan_code=data.plan_code,
            description=data.description,
            eligibility_rules=data.eligibility_rules,
            coverage_details=data.coverage_details,
            effective_date=datetime.fromisoformat(data.effective_date).date(),
            expiration_date=datetime.fromisoformat(data.expiration_date).date() if data.expiration_date else None
        )
        self.db.add(plan)
        self.db.commit()
        self.db.refresh(plan)
        return plan
    
    def get_benefit_plans(
        self,
        tenant_id: UUID,
        plan_type: Optional[str] = None,
        is_active: Optional[bool] = None
    ) -> list[BenefitPlan]:
        """Get benefit plans"""
        query = self.db.query(BenefitPlan).filter(BenefitPlan.tenant_id == tenant_id)
        if plan_type:
            query = query.filter(BenefitPlan.plan_type == plan_type)
        if is_active is not None:
            query = query.filter(BenefitPlan.is_active == is_active)
        return query.all()
    
    def create_benefit_enrollment(
        self,
        data: BenefitEnrollmentCreate,
        tenant_id: UUID
    ) -> BenefitEnrollment:
        """Create benefit enrollment"""
        enrollment = BenefitEnrollment(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            benefit_plan_id=data.benefit_plan_id,
            enrollment_date=datetime.fromisoformat(data.enrollment_date).date(),
            coverage_start_date=datetime.fromisoformat(data.coverage_start_date).date(),
            coverage_end_date=datetime.fromisoformat(data.coverage_end_date).date() if data.coverage_end_date else None,
            dependents_count=str(data.dependents_count),
            dependents_info=data.dependents_info
        )
        self.db.add(enrollment)
        self.db.commit()
        self.db.refresh(enrollment)
        return enrollment
    
    def get_benefit_enrollments(
        self,
        tenant_id: UUID,
        employee_id: Optional[UUID] = None
    ) -> list[BenefitEnrollment]:
        """Get benefit enrollments"""
        query = self.db.query(BenefitEnrollment).filter(BenefitEnrollment.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(BenefitEnrollment.employee_id == employee_id)
        return query.all()
    
    # ========== ENTERPRISE: ITSM AGENT METHODS ==========
    
    def create_it_ticket(
        self,
        data: ITTicketCreate,
        tenant_id: UUID
    ) -> ITTicket:
        """Create IT ticket"""
        # Generate ticket number
        ticket_count = self.db.query(ITTicket).filter(ITTicket.tenant_id == tenant_id).count()
        ticket_number = f"IT-{tenant_id.hex[:8].upper()}-{ticket_count + 1:06d}"
        
        ticket = ITTicket(
            tenant_id=tenant_id,
            ticket_number=ticket_number,
            requester_id=data.requester_id,
            assignee_id=data.assignee_id,
            category=data.category,
            priority=data.priority,
            subject=data.subject,
            description=data.description
        )
        self.db.add(ticket)
        self.db.commit()
        self.db.refresh(ticket)
        return ticket
    
    def get_it_tickets(
        self,
        tenant_id: UUID,
        status: Optional[str] = None,
        assignee_id: Optional[UUID] = None
    ) -> list[ITTicket]:
        """Get IT tickets"""
        query = self.db.query(ITTicket).filter(ITTicket.tenant_id == tenant_id)
        if status:
            query = query.filter(ITTicket.status == status)
        if assignee_id:
            query = query.filter(ITTicket.assignee_id == assignee_id)
        return query.order_by(ITTicket.created_at.desc()).all()
    
    def create_identity_request(
        self,
        data: IdentityRequestCreate,
        tenant_id: UUID
    ) -> IdentityRequest:
        """Create identity request"""
        request = IdentityRequest(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            request_type=data.request_type,
            requested_systems=data.requested_systems,
            requested_permissions=data.requested_permissions,
            approver_id=data.approver_id
        )
        self.db.add(request)
        self.db.commit()
        self.db.refresh(request)
        return request
    
    def get_identity_requests(
        self,
        tenant_id: UUID,
        employee_id: Optional[UUID] = None,
        status: Optional[str] = None
    ) -> list[IdentityRequest]:
        """Get identity requests"""
        query = self.db.query(IdentityRequest).filter(IdentityRequest.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(IdentityRequest.employee_id == employee_id)
        if status:
            query = query.filter(IdentityRequest.status == status)
        return query.order_by(IdentityRequest.created_at.desc()).all()

