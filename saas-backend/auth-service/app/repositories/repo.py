"""Repository for auth-service"""

from sqlalchemy.orm import Session
from sqlalchemy import and_
from uuid import UUID
import bcrypt
from typing import Optional

from ..models.db_models import User, Role, TenantUser, UserRole


class AuthRepository:
    """Authentication repository"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        return self.db.query(User).filter(User.email == email).first()
    
    def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        """Get user by ID"""
        return self.db.query(User).filter(User.id == user_id).first()
    
    def get_tenant_user(self, user_id: UUID, tenant_id: UUID) -> Optional[TenantUser]:
        """Get tenant-user association"""
        return self.db.query(TenantUser).filter(
            and_(
                TenantUser.user_id == user_id,
                TenantUser.tenant_id == tenant_id
            )
        ).first()
    
    def get_roles_by_tenant(self, tenant_id: UUID) -> list[Role]:
        """Get roles for tenant"""
        return self.db.query(Role).filter(
            Role.tenant_id == tenant_id
        ).all()
    
    def create_role(
        self,
        name: str,
        description: str = None,
        tenant_id: UUID = None
    ) -> Role:
        """Create a new role"""
        role = Role(
            name=name,
            description=description,
            tenant_id=tenant_id
        )
        self.db.add(role)
        self.db.commit()
        self.db.refresh(role)
        return role
    
    def assign_role_to_user(
        self,
        user_id: UUID,
        role_id: UUID,
        tenant_id: UUID
    ):
        """Assign role to user"""
        # Check if user belongs to tenant
        tenant_user = self.get_tenant_user(user_id, tenant_id)
        if not tenant_user:
            raise ValueError("User does not belong to tenant")
        
        # Get user and role
        user = self.get_user_by_id(user_id)
        role = self.db.query(Role).filter(Role.id == role_id).first()
        
        if not user or not role:
            raise ValueError("User or role not found")
        
        # Add role to user
        if role not in user.roles:
            user.roles.append(role)
            self.db.commit()

