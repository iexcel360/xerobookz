"""Repository for immigration-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime

from ..models.db_models import Contractor, EORWorkflow, GlobalPayout
from ..schemas.request import ContractorCreate, EORWorkflowCreate, GlobalPayoutCreate


class ImmigrationRepository:
    """Immigration repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_contractor(self, data: ContractorCreate, tenant_id: UUID) -> Contractor:
        """Create contractor"""
        contractor = Contractor(
            tenant_id=tenant_id,
            name=data.name,
            country_code=data.country_code,
            contract_type=data.contract_type,
            start_date=datetime.fromisoformat(data.start_date).date(),
            end_date=datetime.fromisoformat(data.end_date).date() if data.end_date else None,
            hourly_rate=data.hourly_rate,
            monthly_rate=data.monthly_rate,
            currency=data.currency
        )
        self.db.add(contractor)
        self.db.commit()
        self.db.refresh(contractor)
        return contractor
    
    def get_contractors(
        self,
        tenant_id: UUID,
        country_code: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Contractor]:
        """Get contractors"""
        query = self.db.query(Contractor).filter(Contractor.tenant_id == tenant_id)
        if country_code:
            query = query.filter(Contractor.country_code == country_code)
        if status:
            query = query.filter(Contractor.status == status)
        return query.all()
    
    def create_eor_workflow(self, data: EORWorkflowCreate, tenant_id: UUID) -> EORWorkflow:
        """Create EOR workflow"""
        workflow = EORWorkflow(
            tenant_id=tenant_id,
            contractor_id=data.contractor_id,
            country_code=data.country_code,
            workflow_type=data.workflow_type,
            workflow_data=data.workflow_data
        )
        self.db.add(workflow)
        self.db.commit()
        self.db.refresh(workflow)
        return workflow
    
    def create_global_payout(self, data: GlobalPayoutCreate, tenant_id: UUID) -> GlobalPayout:
        """Create global payout"""
        payout = GlobalPayout(
            tenant_id=tenant_id,
            contractor_id=data.contractor_id,
            amount=data.amount,
            currency=data.currency,
            payout_date=datetime.fromisoformat(data.payout_date).date(),
            payment_method=data.payment_method
        )
        self.db.add(payout)
        self.db.commit()
        self.db.refresh(payout)
        return payout

