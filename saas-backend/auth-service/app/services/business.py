"""Business logic for auth-service"""

from sqlalchemy.orm import Session
from sqlalchemy import and_
from uuid import UUID
from datetime import datetime, timedelta
import bcrypt
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.auth.jwt import encode_jwt, decode_jwt
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..models.db_models import User, Role, TenantUser, Tenant
from ..schemas.response import TokenResponse, UserResponse, RoleResponse
from ..repositories.repo import AuthRepository
from ..events.producers import EventProducer


class AuthService:
    """Authentication service"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = AuthRepository(db)
        self.event_producer = EventProducer()
    
    async def login(
        self,
        email: str,
        password: str,
        tenant_id: UUID,
        mfa_code: str = None
    ) -> TokenResponse | None:
        """Authenticate user and return tokens"""
        user = self.repo.get_user_by_email(email)
        if not user:
            return None
        
        # Check password
        if not bcrypt.checkpw(password.encode(), user.password_hash.encode()):
            return None
        
        # Check tenant membership
        tenant_user = self.repo.get_tenant_user(user.id, tenant_id)
        if not tenant_user or not tenant_user.is_active:
            return None
        
        # Check MFA if enabled
        if user.mfa_enabled:
            if not mfa_code:
                return None
            # TODO: Implement MFA verification
        
        # Generate tokens
        access_token = encode_jwt({
            "sub": str(user.id),
            "email": user.email,
            "tenant_id": str(tenant_id),
            "type": "access"
        })
        
        refresh_token = encode_jwt({
            "sub": str(user.id),
            "tenant_id": str(tenant_id),
            "type": "refresh"
        }, expires_in=timedelta(days=30))
        
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=24 * 3600
        )
    
    async def refresh_token(self, refresh_token: str) -> TokenResponse | None:
        """Refresh access token"""
        payload = decode_jwt(refresh_token)
        if not payload or payload.get("type") != "refresh":
            return None
        
        user_id = UUID(payload.get("sub"))
        tenant_id = UUID(payload.get("tenant_id"))
        
        user = self.repo.get_user_by_id(user_id)
        if not user:
            return None
        
        # Generate new access token
        access_token = encode_jwt({
            "sub": str(user.id),
            "email": user.email,
            "tenant_id": str(tenant_id),
            "type": "access"
        })
        
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=24 * 3600
        )
    
    async def logout(self, token: str):
        """Logout user (invalidate token)"""
        # TODO: Implement token blacklisting in Redis
        pass
    
    async def get_user_by_id(self, user_id: UUID) -> UserResponse | None:
        """Get user by ID"""
        user = self.repo.get_user_by_id(user_id)
        if not user:
            return None
        return UserResponse.model_validate(user)
    
    async def get_roles(self, tenant_id: UUID) -> list[RoleResponse]:
        """Get all roles for tenant"""
        roles = self.repo.get_roles_by_tenant(tenant_id)
        return [RoleResponse.model_validate(role) for role in roles]
    
    async def create_role(
        self,
        name: str,
        description: str = None,
        tenant_id: UUID = None
    ) -> RoleResponse:
        """Create a new role"""
        role = self.repo.create_role(name, description, tenant_id)
        return RoleResponse.model_validate(role)
    
    async def assign_role(
        self,
        user_id: UUID,
        role_id: UUID,
        tenant_id: UUID
    ):
        """Assign role to user"""
        self.repo.assign_role_to_user(user_id, role_id, tenant_id)

