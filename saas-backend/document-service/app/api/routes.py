"""API routes for document-service"""

from fastapi import APIRouter, Depends, Request, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import DocumentUploadRequest
from ..schemas.response import DocumentResponse
from ..services.business import DocumentService

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("/upload", response_model=APIResponse[DocumentResponse])
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = None,
    related_entity_id: UUID = None,
    related_entity_type: str = None,
    request: Request = None,
    db: Session = Depends(get_db_session)
):
    """Upload document to GridFS"""
    tenant_id = get_tenant_id(request)
    service = DocumentService(db)
    
    # Read file content
    content = await file.read()
    
    document = await service.upload_document(
        filename=file.filename,
        content=content,
        content_type=file.content_type,
        document_type=document_type or "other",
        tenant_id=tenant_id,
        uploaded_by=None,  # TODO: Get from auth
        related_entity_id=related_entity_id,
        related_entity_type=related_entity_type
    )
    
    return APIResponse.success_response(data=document, message="Document uploaded")


@router.get("/{id}", response_model=APIResponse[DocumentResponse])
async def get_document(
    id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Get document metadata"""
    tenant_id = get_tenant_id(request)
    service = DocumentService(db)
    document = await service.get_document(id, tenant_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return APIResponse.success_response(data=document)


@router.get("/{id}/download")
async def download_document(
    id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Download document from GridFS"""
    from fastapi.responses import StreamingResponse
    
    tenant_id = get_tenant_id(request)
    service = DocumentService(db)
    file_data = await service.download_document(id, tenant_id)
    
    if not file_data:
        raise HTTPException(status_code=404, detail="Document not found")
    
    return StreamingResponse(
        file_data["content"],
        media_type=file_data["content_type"],
        headers={"Content-Disposition": f'attachment; filename="{file_data["filename"]}"'}
    )


@router.delete("/{id}", response_model=APIResponse)
async def delete_document(
    id: UUID,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Delete document"""
    tenant_id = get_tenant_id(request)
    service = DocumentService(db)
    await service.delete_document(id, tenant_id)
    return APIResponse.success_response(message="Document deleted")
