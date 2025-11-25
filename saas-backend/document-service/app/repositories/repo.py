"""Repository for document-service"""

from sqlalchemy.orm import Session
from sqlalchemy import and_
from uuid import UUID
from typing import Optional
import json

from ..models.db_models import DocumentMetadata


class DocumentRepository:
    """Document repository"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_metadata(
        self,
        gridfs_file_id: str,
        filename: str,
        content_type: str,
        file_size: int,
        document_type: str,
        tenant_id: UUID,
        uploaded_by: UUID = None,
        related_entity_id: UUID = None,
        related_entity_type: str = None
    ) -> DocumentMetadata:
        """Create document metadata"""
        metadata = DocumentMetadata(
            tenant_id=tenant_id,
            gridfs_file_id=gridfs_file_id,
            filename=filename,
            content_type=content_type,
            file_size=file_size,
            document_type=document_type,
            uploaded_by=uploaded_by,
            related_entity_id=related_entity_id,
            related_entity_type=related_entity_type
        )
        self.db.add(metadata)
        self.db.commit()
        self.db.refresh(metadata)
        return metadata
    
    def get_metadata(
        self,
        document_id: UUID,
        tenant_id: UUID
    ) -> Optional[DocumentMetadata]:
        """Get document metadata"""
        return self.db.query(DocumentMetadata).filter(
            and_(
                DocumentMetadata.id == document_id,
                DocumentMetadata.tenant_id == tenant_id
            )
        ).first()
    
    def delete_metadata(
        self,
        document_id: UUID,
        tenant_id: UUID
    ):
        """Delete document metadata"""
        metadata = self.get_metadata(document_id, tenant_id)
        if metadata:
            self.db.delete(metadata)
            self.db.commit()

