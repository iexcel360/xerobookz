"""Business logic for immigration-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..schemas.request import ContractorCreate, EORWorkflowCreate, GlobalPayoutCreate
from ..schemas.response import ContractorResponse, EORWorkflowResponse, GlobalPayoutResponse
from ..repositories.repo import ImmigrationRepository
from ..events.producers import EventProducer


class ImmigrationService:
    """Immigration service - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = ImmigrationRepository(db)
        self.event_producer = EventProducer()
    
    async def create_contractor(
        self,
        data: ContractorCreate,
        tenant_id: UUID
    ) -> ContractorResponse:
        """Create contractor"""
        contractor = self.repo.create_contractor(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.CONTRACTOR_CREATED,
            tenant_id=tenant_id,
            payload={"contractor_id": str(contractor.id), "country_code": contractor.country_code}
        )
        await self.event_producer.publish(event)
        
        return ContractorResponse.model_validate(contractor)
    
    async def get_contractors(
        self,
        tenant_id: UUID,
        country_code: str | None = None,
        status: str | None = None
    ) -> list[ContractorResponse]:
        """Get contractors"""
        contractors = self.repo.get_contractors(tenant_id, country_code, status)
        return [ContractorResponse.model_validate(c) for c in contractors]
    
    async def create_eor_workflow(
        self,
        data: EORWorkflowCreate,
        tenant_id: UUID
    ) -> EORWorkflowResponse:
        """Create EOR workflow"""
        workflow = self.repo.create_eor_workflow(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.EOR_WORKFLOW_STARTED,
            tenant_id=tenant_id,
            payload={"workflow_id": str(workflow.id), "contractor_id": str(data.contractor_id)}
        )
        await self.event_producer.publish(event)
        
        return EORWorkflowResponse.model_validate(workflow)
    
    async def create_global_payout(
        self,
        data: GlobalPayoutCreate,
        tenant_id: UUID
    ) -> GlobalPayoutResponse:
        """Create global payout"""
        payout = self.repo.create_global_payout(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.GLOBAL_PAYOUT_PROCESSED,
            tenant_id=tenant_id,
            payload={"payout_id": str(payout.id), "contractor_id": str(data.contractor_id)}
        )
        await self.event_producer.publish(event)
        
        return GlobalPayoutResponse.model_validate(payout)

