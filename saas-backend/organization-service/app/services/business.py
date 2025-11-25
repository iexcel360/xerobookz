"""Business logic for organization-service"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from ..models.db_models import Organization, Department
from ..schemas.request import (
    OrganizationCreate, OrganizationUpdate, DepartmentCreate,
    BenefitPlanCreate, BenefitEnrollmentCreate,
    ITTicketCreate, IdentityRequestCreate
)
from ..schemas.response import (
    OrganizationResponse, DepartmentResponse,
    BenefitPlanResponse, BenefitEnrollmentResponse,
    ITTicketResponse, IdentityRequestResponse
)
from ..repositories.repo import OrganizationRepository
from ..events.producers import EventProducer
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope


class OrganizationService:
    """Organization service"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = OrganizationRepository(db)
        self.event_producer = EventProducer()
    
    async def get_organization(self, tenant_id: UUID) -> OrganizationResponse | None:
        """Get organization for tenant"""
        org = self.repo.get_organization(tenant_id)
        if not org:
            return None
        return OrganizationResponse.model_validate(org)
    
    async def create_organization(
        self,
        data: OrganizationCreate,
        tenant_id: UUID
    ) -> OrganizationResponse:
        """Create organization"""
        org = self.repo.create_organization(data, tenant_id)
        return OrganizationResponse.model_validate(org)
    
    async def update_organization(
        self,
        data: OrganizationUpdate,
        tenant_id: UUID
    ) -> OrganizationResponse | None:
        """Update organization"""
        org = self.repo.update_organization(data, tenant_id)
        if not org:
            return None
        return OrganizationResponse.model_validate(org)
    
    async def get_departments(self, tenant_id: UUID) -> list[DepartmentResponse]:
        """Get all departments"""
        depts = self.repo.get_departments(tenant_id)
        return [DepartmentResponse.model_validate(d) for d in depts]
    
    async def create_department(
        self,
        data: DepartmentCreate,
        tenant_id: UUID
    ) -> DepartmentResponse:
        """Create department"""
        dept = self.repo.create_department(data, tenant_id)
        return DepartmentResponse.model_validate(dept)
    
    # ========== ENTERPRISE: BENEFITS ADMIN METHODS ==========
    
    async def create_benefit_plan(
        self,
        data: BenefitPlanCreate,
        tenant_id: UUID
    ) -> BenefitPlanResponse:
        """Create benefit plan"""
        plan = self.repo.create_benefit_plan(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.BENEFIT_ENROLLED,  # Using existing event
            tenant_id=tenant_id,
            payload={"benefit_plan_id": str(plan.id), "plan_type": plan.plan_type}
        )
        await self.event_producer.publish(event)
        
        return BenefitPlanResponse.model_validate(plan)
    
    async def get_benefit_plans(
        self,
        tenant_id: UUID,
        plan_type: str | None = None,
        is_active: bool | None = None
    ) -> list[BenefitPlanResponse]:
        """Get benefit plans"""
        plans = self.repo.get_benefit_plans(tenant_id, plan_type, is_active)
        return [BenefitPlanResponse.model_validate(p) for p in plans]
    
    async def create_benefit_enrollment(
        self,
        data: BenefitEnrollmentCreate,
        tenant_id: UUID
    ) -> BenefitEnrollmentResponse:
        """Create benefit enrollment"""
        enrollment = self.repo.create_benefit_enrollment(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.BENEFIT_ENROLLED,
            tenant_id=tenant_id,
            payload={"employee_id": str(data.employee_id), "enrollment_id": str(enrollment.id)}
        )
        await self.event_producer.publish(event)
        
        return BenefitEnrollmentResponse.model_validate(enrollment)
    
    async def get_benefit_enrollments(
        self,
        tenant_id: UUID,
        employee_id: UUID | None = None
    ) -> list[BenefitEnrollmentResponse]:
        """Get benefit enrollments"""
        enrollments = self.repo.get_benefit_enrollments(tenant_id, employee_id)
        return [BenefitEnrollmentResponse.model_validate(e) for e in enrollments]
    
    # ========== ENTERPRISE: ITSM AGENT METHODS ==========
    
    async def create_it_ticket(
        self,
        data: ITTicketCreate,
        tenant_id: UUID
    ) -> ITTicketResponse:
        """Create IT ticket"""
        ticket = self.repo.create_it_ticket(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.IT_TICKET_CREATED,
            tenant_id=tenant_id,
            payload={"ticket_id": str(ticket.id), "ticket_number": ticket.ticket_number}
        )
        await self.event_producer.publish(event)
        
        return ITTicketResponse.model_validate(ticket)
    
    async def get_it_tickets(
        self,
        tenant_id: UUID,
        status: str | None = None,
        assignee_id: UUID | None = None
    ) -> list[ITTicketResponse]:
        """Get IT tickets"""
        tickets = self.repo.get_it_tickets(tenant_id, status, assignee_id)
        return [ITTicketResponse.model_validate(t) for t in tickets]
    
    async def create_identity_request(
        self,
        data: IdentityRequestCreate,
        tenant_id: UUID
    ) -> IdentityRequestResponse:
        """Create identity request"""
        request = self.repo.create_identity_request(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.IDENTITY_REQUESTED,
            tenant_id=tenant_id,
            payload={"employee_id": str(data.employee_id), "request_id": str(request.id)}
        )
        await self.event_producer.publish(event)
        
        return IdentityRequestResponse.model_validate(request)
    
    async def get_identity_requests(
        self,
        tenant_id: UUID,
        employee_id: UUID | None = None,
        status: str | None = None
    ) -> list[IdentityRequestResponse]:
        """Get identity requests"""
        requests = self.repo.get_identity_requests(tenant_id, employee_id, status)
        return [IdentityRequestResponse.model_validate(r) for r in requests]

