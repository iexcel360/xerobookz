"""API routes for auth-service"""

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import UserCreate, UserLogin, RoleCreate, AssignRoleRequest
from ..schemas.response import UserResponse, TokenResponse, RoleResponse
from ..services.business import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()


@router.post("/login", response_model=APIResponse[TokenResponse])
async def login(
    login_data: UserLogin,
    db: Session = Depends(get_db_session)
):
    """User login endpoint"""
    service = AuthService(db)
    result = await service.login(
        email=login_data.email,
        password=login_data.password,
        tenant_id=login_data.tenant_id,
        mfa_code=login_data.mfa_code
    )
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return APIResponse.success_response(data=result, message="Login successful")


@router.post("/refresh", response_model=APIResponse[TokenResponse])
async def refresh_token(
    refresh_token: str,
    db: Session = Depends(get_db_session)
):
    """Refresh access token"""
    service = AuthService(db)
    result = await service.refresh_token(refresh_token)
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    return APIResponse.success_response(data=result, message="Token refreshed")


@router.post("/logout")
async def logout(
    token: str = Depends(security),
    db: Session = Depends(get_db_session)
):
    """User logout"""
    service = AuthService(db)
    await service.logout(token.credentials)
    return APIResponse.success_response(message="Logged out successfully")


@router.get("/me", response_model=APIResponse[UserResponse])
async def get_current_user(
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get current user info"""
    from shared_libs.auth.middleware import get_current_user as get_user
    
    user_payload = get_user(request)
    if not user_payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    service = AuthService(db)
    user = await service.get_user_by_id(UUID(user_payload.get("sub")))
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return APIResponse.success_response(data=user, message="User retrieved")


@router.get("/roles", response_model=APIResponse[List[RoleResponse]])
async def get_roles(
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get all roles"""
    tenant_id = get_tenant_id(request)
    
    service = AuthService(db)
    roles = await service.get_roles(tenant_id)
    return APIResponse.success_response(data=roles, message="Roles retrieved")


@router.post("/roles", response_model=APIResponse[RoleResponse])
async def create_role(
    role_data: RoleCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create a new role"""
    tenant_id = get_tenant_id(request)
    
    service = AuthService(db)
    role = await service.create_role(
        name=role_data.name,
        description=role_data.description,
        tenant_id=role_data.tenant_id or tenant_id
    )
    
    return APIResponse.success_response(data=role, message="Role created")


@router.post("/assign-role", response_model=APIResponse)
async def assign_role(
    assign_data: AssignRoleRequest,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Assign role to user"""
    tenant_id = get_tenant_id(request)
    
    service = AuthService(db)
    await service.assign_role(
        user_id=assign_data.user_id,
        role_id=assign_data.role_id,
        tenant_id=tenant_id
    )
    
    return APIResponse.success_response(message="Role assigned")

