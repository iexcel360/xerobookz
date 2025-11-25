"""Business logic for user-service"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..models.db_models import UserProfile
from ..schemas.request import UserProfileCreate, UserProfileUpdate
from ..schemas.response import UserProfileResponse
from ..repositories.repo import UserRepository
from ..events.producers import EventProducer


class UserService:
    """User service"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = UserRepository(db)
        self.event_producer = EventProducer()
    
    async def get_users(self, tenant_id: UUID) -> list[UserProfileResponse]:
        """Get all users for tenant"""
        profiles = self.repo.get_profiles_by_tenant(tenant_id)
        return [UserProfileResponse.model_validate(p) for p in profiles]
    
    async def create_profile(
        self,
        data: UserProfileCreate,
        tenant_id: UUID
    ) -> UserProfileResponse:
        """Create user profile"""
        profile = self.repo.create_profile(data, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.USER_UPDATED,
            tenant_id=tenant_id,
            initiated_by=data.user_id,
            payload={"user_id": str(data.user_id), "action": "profile_created"}
        )
        await self.event_producer.publish(event)
        
        return UserProfileResponse.model_validate(profile)
    
    async def get_user_by_id(
        self,
        user_id: UUID,
        tenant_id: UUID
    ) -> UserProfileResponse | None:
        """Get user by ID"""
        profile = self.repo.get_profile_by_user_id(user_id, tenant_id)
        if not profile:
            return None
        return UserProfileResponse.model_validate(profile)
    
    async def update_profile(
        self,
        user_id: UUID,
        data: UserProfileUpdate,
        tenant_id: UUID
    ) -> UserProfileResponse | None:
        """Update user profile"""
        profile = self.repo.update_profile(user_id, data, tenant_id)
        if not profile:
            return None
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.USER_UPDATED,
            tenant_id=tenant_id,
            initiated_by=user_id,
            payload={"user_id": str(user_id), "action": "profile_updated"}
        )
        await self.event_producer.publish(event)
        
        return UserProfileResponse.model_validate(profile)
    
    async def delete_profile(self, user_id: UUID, tenant_id: UUID):
        """Delete user profile"""
        self.repo.delete_profile(user_id, tenant_id)

