"""API routes for audit-service"""

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("")
async def list_items(request: Request, db: Session = Depends(get_db_session)):
    """List items"""
    tenant_id = get_tenant_id(request)
    return APIResponse.success_response(data=[], message="Items retrieved")
