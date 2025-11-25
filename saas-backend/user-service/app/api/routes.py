"""API routes for user-service"""

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import UserProfileCreate, UserProfileUpdate
from ..schemas.response import UserProfileResponse
from ..services.business import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=APIResponse[list[UserProfileResponse]])
async def get_users(
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get all users for tenant"""
    tenant_id = get_tenant_id(request)
    service = UserService(db)
    users = await service.get_users(tenant_id)
    return APIResponse.success_response(data=users)


@router.post("", response_model=APIResponse[UserProfileResponse])
async def create_user(
    user_data: UserProfileCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create user profile"""
    tenant_id = get_tenant_id(request)
    service = UserService(db)
    user = await service.create_profile(user_data, tenant_id)
    return APIResponse.success_response(data=user, message="User profile created")


@router.get("/{id}", response_model=APIResponse[UserProfileResponse])
async def get_user(
    id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get user by ID"""
    tenant_id = get_tenant_id(request)
    service = UserService(db)
    user = await service.get_user_by_id(id, tenant_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return APIResponse.success_response(data=user)


@router.patch("/{id}", response_model=APIResponse[UserProfileResponse])
async def update_user(
    id: UUID,
    user_data: UserProfileUpdate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Update user profile"""
    tenant_id = get_tenant_id(request)
    service = UserService(db)
    user = await service.update_profile(id, user_data, tenant_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return APIResponse.success_response(data=user, message="User profile updated")


@router.delete("/{id}", response_model=APIResponse)
async def delete_user(
    id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Delete user profile"""
    tenant_id = get_tenant_id(request)
    service = UserService(db)
    await service.delete_profile(id, tenant_id)
    return APIResponse.success_response(message="User profile deleted")

