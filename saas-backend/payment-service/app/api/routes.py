"""API routes for payment-service - Extended for Enterprise"""

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import CorporateCardCreate, CorporateCardLimitUpdate, CorporateCardMerchantUpdate
from ..schemas.response import CorporateCardResponse
from ..services.business import PaymentService

router = APIRouter(prefix="/payment", tags=["payment"])


# ========== ENTERPRISE: CORPORATE CARDS ENDPOINTS ==========

@router.post("/corporate-cards", response_model=APIResponse[CorporateCardResponse])
async def create_corporate_card(
    card_data: CorporateCardCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create corporate card"""
    tenant_id = get_tenant_id(request)
    service = PaymentService(db)
    card = await service.create_corporate_card(card_data, tenant_id)
    return APIResponse.success_response(data=card, message="Corporate card created")


@router.get("/corporate-cards", response_model=APIResponse[list[CorporateCardResponse]])
async def get_corporate_cards(
    request: Request,
    employee_id: UUID = None,
    db: Session = Depends(get_db_session)
):
    """Get corporate cards"""
    tenant_id = get_tenant_id(request)
    service = PaymentService(db)
    cards = await service.get_corporate_cards(tenant_id, employee_id)
    return APIResponse.success_response(data=cards)


@router.post("/corporate-cards/{card_id}/limits", response_model=APIResponse[CorporateCardResponse])
async def update_card_limits(
    card_id: UUID,
    limit_data: CorporateCardLimitUpdate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Update corporate card limits"""
    tenant_id = get_tenant_id(request)
    service = PaymentService(db)
    card = await service.update_card_limits(card_id, limit_data, tenant_id)
    if not card:
        return APIResponse.error_response("NOT_FOUND", "Corporate card not found")
    return APIResponse.success_response(data=card, message="Card limits updated")


@router.post("/corporate-cards/{card_id}/merchants", response_model=APIResponse[CorporateCardResponse])
async def update_card_merchants(
    card_id: UUID,
    merchant_data: CorporateCardMerchantUpdate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Update corporate card merchant restrictions"""
    tenant_id = get_tenant_id(request)
    service = PaymentService(db)
    card = await service.update_card_merchants(card_id, merchant_data, tenant_id)
    if not card:
        return APIResponse.error_response("NOT_FOUND", "Corporate card not found")
    return APIResponse.success_response(data=card, message="Merchant restrictions updated")
