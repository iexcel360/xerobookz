"""Event bus schemas"""

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Any, Dict, Optional
from ..models.enums import EventType


class EventEnvelope(BaseModel):
    """Standard event envelope for event bus"""
    
    event_id: UUID = Field(default_factory=lambda: __import__("uuid").uuid4())
    event_type: EventType = Field(..., description="Event type")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    tenant_id: UUID = Field(..., description="Tenant identifier")
    initiated_by: Optional[UUID] = Field(None, description="User who initiated the event")
    correlation_id: Optional[UUID] = Field(None, description="Correlation ID for tracing")
    payload: Dict[str, Any] = Field(..., description="Event payload")

