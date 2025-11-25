"""Business logic for payment-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..schemas.request import CorporateCardCreate, CorporateCardLimitUpdate, CorporateCardMerchantUpdate
from ..schemas.response import CorporateCardResponse
from ..repositories.repo import PaymentRepository
from ..events.producers import EventProducer


class PaymentService:
    """Payment service - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = PaymentRepository(db)
        self.event_producer = EventProducer()
    
    async def create_corporate_card(
        self,
        data: CorporateCardCreate,
        tenant_id: UUID
    ) -> CorporateCardResponse:
        """Create corporate card"""
        card = self.repo.create_corporate_card(data, tenant_id)
        return CorporateCardResponse.model_validate(card)
    
    async def get_corporate_cards(
        self,
        tenant_id: UUID,
        employee_id: UUID | None = None
    ) -> list[CorporateCardResponse]:
        """Get corporate cards"""
        cards = self.repo.get_corporate_cards(tenant_id, employee_id)
        return [CorporateCardResponse.model_validate(c) for c in cards]
    
    async def update_card_limits(
        self,
        card_id: UUID,
        data: CorporateCardLimitUpdate,
        tenant_id: UUID
    ) -> CorporateCardResponse | None:
        """Update card limits"""
        card = self.repo.update_card_limits(card_id, data, tenant_id)
        if not card:
            return None
        return CorporateCardResponse.model_validate(card)
    
    async def update_card_merchants(
        self,
        card_id: UUID,
        data: CorporateCardMerchantUpdate,
        tenant_id: UUID
    ) -> CorporateCardResponse | None:
        """Update card merchant restrictions"""
        card = self.repo.update_card_merchants(card_id, data, tenant_id)
        if not card:
            return None
        return CorporateCardResponse.model_validate(card)

