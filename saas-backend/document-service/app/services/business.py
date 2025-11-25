"""Business logic for document-service"""

from sqlalchemy.orm import Session
from uuid import UUID
import gridfs
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.mongo import get_mongo_db
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..models.db_models import DocumentMetadata
from ..schemas.response import DocumentResponse
from ..repositories.repo import DocumentRepository
from ..events.producers import EventProducer
from ..workers.tasks import trigger_ocr_worker, trigger_virus_scan_worker


class DocumentService:
    """Document service with GridFS"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = DocumentRepository(db)
        self.mongo_db = get_mongo_db()
        self.fs = gridfs.GridFS(self.mongo_db)
        self.event_producer = EventProducer()
    
    async def upload_document(
        self,
        filename: str,
        content: bytes,
        content_type: str,
        document_type: str,
        tenant_id: UUID,
        uploaded_by: UUID = None,
        related_entity_id: UUID = None,
        related_entity_type: str = None
    ) -> DocumentResponse:
        """Upload document to GridFS"""
        # Store in GridFS
        file_id = self.fs.put(
            content,
            filename=filename,
            content_type=content_type,
            tenant_id=str(tenant_id)
        )
        
        # Create metadata record
        metadata = self.repo.create_metadata(
            gridfs_file_id=str(file_id),
            filename=filename,
            content_type=content_type,
            file_size=len(content),
            document_type=document_type,
            tenant_id=tenant_id,
            uploaded_by=uploaded_by,
            related_entity_id=related_entity_id,
            related_entity_type=related_entity_type
        )
        
        # Trigger background workers
        await trigger_ocr_worker(metadata.id, tenant_id)
        await trigger_virus_scan_worker(metadata.id, tenant_id)
        
        # Publish event
        event = EventEnvelope(
            event_type=EventType.DOCUMENT_UPLOADED,
            tenant_id=tenant_id,
            initiated_by=uploaded_by,
            payload={
                "document_id": str(metadata.id),
                "document_type": document_type,
                "filename": filename
            }
        )
        await self.event_producer.publish(event)
        
        return DocumentResponse.model_validate(metadata)
    
    async def get_document(
        self,
        document_id: UUID,
        tenant_id: UUID
    ) -> DocumentResponse | None:
        """Get document metadata"""
        metadata = self.repo.get_metadata(document_id, tenant_id)
        if not metadata:
            return None
        return DocumentResponse.model_validate(metadata)
    
    async def download_document(
        self,
        document_id: UUID,
        tenant_id: UUID
    ) -> dict | None:
        """Download document from GridFS"""
        metadata = self.repo.get_metadata(document_id, tenant_id)
        if not metadata:
            return None
        
        file_id = metadata.gridfs_file_id
        grid_file = self.fs.get(file_id)
        
        return {
            "content": grid_file,
            "filename": metadata.filename,
            "content_type": metadata.content_type or "application/octet-stream"
        }
    
    async def delete_document(
        self,
        document_id: UUID,
        tenant_id: UUID
    ):
        """Delete document from GridFS"""
        metadata = self.repo.get_metadata(document_id, tenant_id)
        if not metadata:
            return
        
        # Delete from GridFS
        self.fs.delete(metadata.gridfs_file_id)
        
        # Delete metadata
        self.repo.delete_metadata(document_id, tenant_id)

