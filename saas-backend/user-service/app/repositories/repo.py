"""Repository for user-service"""

from sqlalchemy.orm import Session
from sqlalchemy import and_
from uuid import UUID
from typing import Optional

from ..models.db_models import UserProfile
from ..schemas.request import UserProfileCreate, UserProfileUpdate


class UserRepository:
    """User repository"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_profiles_by_tenant(self, tenant_id: UUID) -> list[UserProfile]:
        """Get all profiles for tenant"""
        return self.db.query(UserProfile).filter(
            UserProfile.tenant_id == tenant_id
        ).all()
    
    def get_profile_by_user_id(
        self,
        user_id: UUID,
        tenant_id: UUID
    ) -> Optional[UserProfile]:
        """Get profile by user ID"""
        return self.db.query(UserProfile).filter(
            and_(
                UserProfile.user_id == user_id,
                UserProfile.tenant_id == tenant_id
            )
        ).first()
    
    def create_profile(
        self,
        data: UserProfileCreate,
        tenant_id: UUID
    ) -> UserProfile:
        """Create user profile"""
        profile = UserProfile(
            user_id=data.user_id,
            tenant_id=tenant_id,
            first_name=data.first_name,
            last_name=data.last_name,
            phone=data.phone,
            employee_id=data.employee_id
        )
        self.db.add(profile)
        self.db.commit()
        self.db.refresh(profile)
        return profile
    
    def update_profile(
        self,
        user_id: UUID,
        data: UserProfileUpdate,
        tenant_id: UUID
    ) -> Optional[UserProfile]:
        """Update user profile"""
        profile = self.get_profile_by_user_id(user_id, tenant_id)
        if not profile:
            return None
        
        if data.first_name is not None:
            profile.first_name = data.first_name
        if data.last_name is not None:
            profile.last_name = data.last_name
        if data.phone is not None:
            profile.phone = data.phone
        if data.profile_picture_url is not None:
            profile.profile_picture_url = data.profile_picture_url
        if data.employee_id is not None:
            profile.employee_id = data.employee_id
        
        self.db.commit()
        self.db.refresh(profile)
        return profile
    
    def delete_profile(self, user_id: UUID, tenant_id: UUID):
        """Delete user profile"""
        profile = self.get_profile_by_user_id(user_id, tenant_id)
        if profile:
            self.db.delete(profile)
            self.db.commit()

