"""Response schemas"""

from pydantic import BaseModel
from typing import Optional, list
from uuid import UUID
from datetime import datetime


class DocumentResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    filename: str
    content_type: Optional[str]
    file_size: int
    document_type: str
    classification_tags: Optional[list[str]]
    thumbnail_url: Optional[str]
    ocr_status: str
    virus_scan_status: str
    uploaded_by: Optional[UUID]
    related_entity_id: Optional[UUID]
    related_entity_type: Optional[str]
    storage_path: Optional[str]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

