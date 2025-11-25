"""API routes for i9-service"""

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import I9CreateRequest, I9Section1Update, I9Section2Update
from ..schemas.response import I9FormResponse
from ..services.business import I9Service

router = APIRouter(prefix="/i9", tags=["i9"])


@router.post("", response_model=APIResponse[I9FormResponse])
async def create_i9(
    i9_data: I9CreateRequest,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create I-9 form"""
    tenant_id = get_tenant_id(request)
    service = I9Service(db)
    i9_form = await service.create_i9_form(i9_data, tenant_id)
    return APIResponse.success_response(data=i9_form, message="I-9 form created")


@router.get("/{id}", response_model=APIResponse[I9FormResponse])
async def get_i9(
    id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get I-9 form"""
    tenant_id = get_tenant_id(request)
    service = I9Service(db)
    i9_form = await service.get_i9_form(id, tenant_id)
    if not i9_form:
        return APIResponse.error_response("NOT_FOUND", "I-9 form not found")
    return APIResponse.success_response(data=i9_form)


@router.patch("/{id}/section1", response_model=APIResponse[I9FormResponse])
async def update_section1(
    id: UUID,
    section1_data: I9Section1Update,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Update I-9 Section 1"""
    tenant_id = get_tenant_id(request)
    service = I9Service(db)
    i9_form = await service.update_section1(id, section1_data, tenant_id)
    return APIResponse.success_response(data=i9_form, message="Section 1 updated")


@router.patch("/{id}/section2", response_model=APIResponse[I9FormResponse])
async def update_section2(
    id: UUID,
    section2_data: I9Section2Update,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Update I-9 Section 2"""
    tenant_id = get_tenant_id(request)
    service = I9Service(db)
    i9_form = await service.update_section2(id, section2_data, tenant_id)
    return APIResponse.success_response(data=i9_form, message="Section 2 updated")


@router.post("/{id}/reverify", response_model=APIResponse[I9FormResponse])
async def reverify_i9(
    id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Trigger I-9 reverification"""
    tenant_id = get_tenant_id(request)
    service = I9Service(db)
    i9_form = await service.trigger_reverification(id, tenant_id)
    return APIResponse.success_response(data=i9_form, message="Reverification triggered")
