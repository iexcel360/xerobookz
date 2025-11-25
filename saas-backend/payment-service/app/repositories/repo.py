"""Repository for payment-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime

from ..models.db_models import CorporateCard
from ..schemas.request import CorporateCardCreate, CorporateCardLimitUpdate, CorporateCardMerchantUpdate


class PaymentRepository:
    """Payment repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_corporate_card(self, data: CorporateCardCreate, tenant_id: UUID) -> CorporateCard:
        """Create corporate card"""
        # Generate masked card number
        card_number = f"****-****-****-{str(tenant_id.hex[:4]).upper()}"
        
        card = CorporateCard(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            card_number=card_number,
            card_type=data.card_type,
            spending_limit=data.spending_limit,
            monthly_limit=data.monthly_limit,
            merchant_restrictions=data.merchant_restrictions,
            category_restrictions=data.category_restrictions,
            issued_at=datetime.now()
        )
        self.db.add(card)
        self.db.commit()
        self.db.refresh(card)
        return card
    
    def get_corporate_cards(
        self,
        tenant_id: UUID,
        employee_id: Optional[UUID] = None
    ) -> List[CorporateCard]:
        """Get corporate cards"""
        query = self.db.query(CorporateCard).filter(CorporateCard.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(CorporateCard.employee_id == employee_id)
        return query.all()
    
    def update_card_limits(
        self,
        card_id: UUID,
        data: CorporateCardLimitUpdate,
        tenant_id: UUID
    ) -> Optional[CorporateCard]:
        """Update card limits"""
        card = self.db.query(CorporateCard).filter(
            CorporateCard.id == card_id,
            CorporateCard.tenant_id == tenant_id
        ).first()
        if not card:
            return None
        
        if data.spending_limit is not None:
            card.spending_limit = data.spending_limit
        if data.monthly_limit is not None:
            card.monthly_limit = data.monthly_limit
        
        self.db.commit()
        self.db.refresh(card)
        return card
    
    def update_card_merchants(
        self,
        card_id: UUID,
        data: CorporateCardMerchantUpdate,
        tenant_id: UUID
    ) -> Optional[CorporateCard]:
        """Update card merchant restrictions"""
        card = self.db.query(CorporateCard).filter(
            CorporateCard.id == card_id,
            CorporateCard.tenant_id == tenant_id
        ).first()
        if not card:
            return None
        
        card.merchant_restrictions = data.merchant_restrictions
        self.db.commit()
        self.db.refresh(card)
        return card

