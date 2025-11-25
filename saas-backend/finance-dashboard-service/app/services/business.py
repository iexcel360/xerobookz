"""Business logic for finance-dashboard-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..schemas.request import PayrollRunCreate, HeadcountPlanCreate
from ..schemas.response import PayrollRunResponse, PayrollEntryResponse, HeadcountPlanResponse
from ..repositories.repo import FinanceRepository
from ..events.producers import EventProducer


class FinanceService:
    """Finance service - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = FinanceRepository(db)
        self.event_producer = EventProducer()
    
    async def create_payroll_run(
        self,
        data: PayrollRunCreate,
        tenant_id: UUID
    ) -> PayrollRunResponse:
        """Create payroll run"""
        run = self.repo.create_payroll_run(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.PAYROLL_RUN_STARTED,
            tenant_id=tenant_id,
            payload={"payroll_run_id": str(run.id), "run_date": str(run.run_date)}
        )
        await self.event_producer.publish(event)
        
        return PayrollRunResponse.model_validate(run)
    
    async def get_payroll_runs(
        self,
        tenant_id: UUID,
        status: str | None = None
    ) -> list[PayrollRunResponse]:
        """Get payroll runs"""
        runs = self.repo.get_payroll_runs(tenant_id, status)
        return [PayrollRunResponse.model_validate(r) for r in runs]
    
    async def get_payroll_entries_for_employee(
        self,
        tenant_id: UUID,
        employee_id: UUID
    ) -> list[PayrollEntryResponse]:
        """Get payroll entries for employee"""
        entries = self.repo.get_payroll_entries_for_employee(tenant_id, employee_id)
        return [PayrollEntryResponse.model_validate(e) for e in entries]
    
    async def create_headcount_plan(
        self,
        data: HeadcountPlanCreate,
        tenant_id: UUID
    ) -> HeadcountPlanResponse:
        """Create headcount plan"""
        plan = self.repo.create_headcount_plan(data, tenant_id)
        return HeadcountPlanResponse.model_validate(plan)
    
    async def get_headcount_plans(
        self,
        tenant_id: UUID,
        fiscal_year: str | None = None
    ) -> list[HeadcountPlanResponse]:
        """Get headcount plans"""
        plans = self.repo.get_headcount_plans(tenant_id, fiscal_year)
        return [HeadcountPlanResponse.model_validate(p) for p in plans]
    
    async def get_headcount_projections(
        self,
        tenant_id: UUID,
        fiscal_year: str
    ) -> dict:
        """Get headcount projections"""
        plans = self.repo.get_headcount_plans(tenant_id, fiscal_year)
        projections = {}
        for plan in plans:
            if plan.projections:
                projections[str(plan.id)] = plan.projections
        return projections

