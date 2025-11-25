"""Request schemas"""

from pydantic import BaseModel
from typing import Optional
from uuid import UUID


class DocumentUploadRequest(BaseModel):
    document_type: str
    related_entity_id: Optional[UUID] = None
    related_entity_type: Optional[str] = None
    classification_tags: Optional[list[str]] = None

