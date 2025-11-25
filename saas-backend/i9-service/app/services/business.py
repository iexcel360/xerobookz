"""Business logic for i9-service"""

from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..models.db_models import I9Form
from ..schemas.request import I9CreateRequest, I9Section1Update, I9Section2Update
from ..schemas.response import I9FormResponse
from ..repositories.repo import I9Repository
from ..events.producers import EventProducer


class I9Service:
    """I-9 service"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = I9Repository(db)
        self.event_producer = EventProducer()
    
    async def create_i9_form(
        self,
        data: I9CreateRequest,
        tenant_id: UUID
    ) -> I9FormResponse:
        """Create I-9 form"""
        i9_form = self.repo.create_i9_form(data.employee_id, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.I9_CREATED,
            tenant_id=tenant_id,
            payload={"i9_id": str(i9_form.id), "employee_id": str(data.employee_id)}
        )
        await self.event_producer.publish(event)
        
        return I9FormResponse.model_validate(i9_form)
    
    async def get_i9_form(
        self,
        i9_id: UUID,
        tenant_id: UUID
    ) -> I9FormResponse | None:
        """Get I-9 form"""
        i9_form = self.repo.get_i9_form(i9_id, tenant_id)
        if not i9_form:
            return None
        return I9FormResponse.model_validate(i9_form)
    
    async def update_section1(
        self,
        i9_id: UUID,
        data: I9Section1Update,
        tenant_id: UUID
    ) -> I9FormResponse | None:
        """Update Section 1"""
        i9_form = self.repo.update_section1(i9_id, data, tenant_id)
        if not i9_form:
            return None
        
        i9_form.status = "section1_complete"
        i9_form.section1_completed_at = datetime.utcnow()
        self.db.commit()
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.I9_UPDATED,
            tenant_id=tenant_id,
            payload={"i9_id": str(i9_id), "section": "section1"}
        )
        await self.event_producer.publish(event)
        
        return I9FormResponse.model_validate(i9_form)
    
    async def update_section2(
        self,
        i9_id: UUID,
        data: I9Section2Update,
        tenant_id: UUID
    ) -> I9FormResponse | None:
        """Update Section 2"""
        i9_form = self.repo.update_section2(i9_id, data, tenant_id)
        if not i9_form:
            return None
        
        i9_form.status = "section2_complete"
        i9_form.section2_completed_at = datetime.utcnow()
        self.db.commit()
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.I9_UPDATED,
            tenant_id=tenant_id,
            payload={"i9_id": str(i9_id), "section": "section2"}
        )
        await self.event_producer.publish(event)
        
        return I9FormResponse.model_validate(i9_form)
    
    async def trigger_reverification(
        self,
        i9_id: UUID,
        tenant_id: UUID
    ) -> I9FormResponse | None:
        """Trigger reverification"""
        i9_form = self.repo.get_i9_form(i9_id, tenant_id)
        if not i9_form:
            return None
        
        i9_form.reverification_required = True
        self.db.commit()
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.I9_AUDIT_TRIGGERED,
            tenant_id=tenant_id,
            payload={"i9_id": str(i9_id), "action": "reverification"}
        )
        await self.event_producer.publish(event)
        
        return I9FormResponse.model_validate(i9_form)

