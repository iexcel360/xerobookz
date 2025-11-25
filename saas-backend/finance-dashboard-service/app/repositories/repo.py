"""Repository for finance-dashboard-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime

from ..models.db_models import PayrollRun, PayrollEntry, HeadcountPlan
from ..schemas.request import PayrollRunCreate, HeadcountPlanCreate


class FinanceRepository:
    """Finance repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_payroll_run(
        self,
        data: PayrollRunCreate,
        tenant_id: UUID
    ) -> PayrollRun:
        """Create payroll run"""
        run = PayrollRun(
            tenant_id=tenant_id,
            run_date=datetime.fromisoformat(data.run_date).date(),
            pay_period_start=datetime.fromisoformat(data.pay_period_start).date(),
            pay_period_end=datetime.fromisoformat(data.pay_period_end).date(),
            notes=data.notes
        )
        self.db.add(run)
        self.db.commit()
        self.db.refresh(run)
        return run
    
    def get_payroll_runs(
        self,
        tenant_id: UUID,
        status: Optional[str] = None
    ) -> List[PayrollRun]:
        """Get payroll runs"""
        query = self.db.query(PayrollRun).filter(PayrollRun.tenant_id == tenant_id)
        if status:
            query = query.filter(PayrollRun.status == status)
        return query.order_by(PayrollRun.run_date.desc()).all()
    
    def get_payroll_entries_for_employee(
        self,
        tenant_id: UUID,
        employee_id: UUID
    ) -> List[PayrollEntry]:
        """Get payroll entries for employee"""
        return self.db.query(PayrollEntry).filter(
            PayrollEntry.tenant_id == tenant_id,
            PayrollEntry.employee_id == employee_id
        ).order_by(PayrollEntry.created_at.desc()).all()
    
    def create_headcount_plan(
        self,
        data: HeadcountPlanCreate,
        tenant_id: UUID
    ) -> HeadcountPlan:
        """Create headcount plan"""
        plan = HeadcountPlan(
            tenant_id=tenant_id,
            plan_name=data.plan_name,
            fiscal_year=data.fiscal_year,
            department_id=data.department_id,
            planned_headcount=data.planned_headcount,
            budget=data.budget,
            projections=data.projections
        )
        self.db.add(plan)
        self.db.commit()
        self.db.refresh(plan)
        return plan
    
    def get_headcount_plans(
        self,
        tenant_id: UUID,
        fiscal_year: Optional[str] = None
    ) -> List[HeadcountPlan]:
        """Get headcount plans"""
        query = self.db.query(HeadcountPlan).filter(HeadcountPlan.tenant_id == tenant_id)
        if fiscal_year:
            query = query.filter(HeadcountPlan.fiscal_year == fiscal_year)
        return query.all()

