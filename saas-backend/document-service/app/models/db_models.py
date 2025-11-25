"""Database models for document-service - uses MongoDB GridFS"""

# Document service primarily uses MongoDB GridFS
# This file contains metadata models stored in PostgreSQL

from sqlalchemy import Column, String, DateTime, Text, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from uuid import uuid4
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.postgres import Base


class DocumentMetadata(Base):
    """Document metadata stored in PostgreSQL"""
    
    __tablename__ = "document_metadata"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    gridfs_file_id = Column(String(255), nullable=False)  # MongoDB GridFS file ID
    filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=True)
    file_size = Column(Integer, nullable=False)
    document_type = Column(String(50), nullable=False)  # i9, paf, h1b, etc.
    classification_tags = Column(Text, nullable=True)  # JSON array
    thumbnail_url = Column(String(500), nullable=True)
    ocr_status = Column(String(50), default="pending")  # pending, processing, completed, failed
    virus_scan_status = Column(String(50), default="pending")
    uploaded_by = Column(UUID(as_uuid=True), nullable=True)
    related_entity_id = Column(UUID(as_uuid=True), nullable=True)  # employee_id, i9_id, etc.
    related_entity_type = Column(String(50), nullable=True)
    storage_path = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class OCRResult(Base):
    """OCR processing results"""
    
    __tablename__ = "ocr_results"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    document_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    extracted_text = Column(Text, nullable=True)
    ocr_data = Column(Text, nullable=True)  # JSON with structured data
    confidence_score = Column(String(10), nullable=True)
    processing_time = Column(Integer, nullable=True)  # milliseconds
    created_at = Column(DateTime, default=func.now())
