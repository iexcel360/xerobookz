"""Request schemas"""

from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID


class UserProfileCreate(BaseModel):
    user_id: UUID
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    employee_id: Optional[UUID] = None


class UserProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    profile_picture_url: Optional[str] = None
    employee_id: Optional[UUID] = None

