"""Database models for i9-service"""

from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Boolean, Date, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from uuid import uuid4
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.postgres import Base


class I9Form(Base):
    """I-9 Form model"""
    
    __tablename__ = "i9_forms"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    status = Column(String(50), default="draft")  # draft, section1_complete, section2_complete, complete
    form_version = Column(String(10), default="11/14/2016")
    section1_completed_at = Column(DateTime, nullable=True)
    section2_completed_at = Column(DateTime, nullable=True)
    reverification_required = Column(Boolean, default=False)
    reverification_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    section1 = relationship("I9Section1", back_populates="i9_form", uselist=False)
    section2 = relationship("I9Section2", back_populates="i9_form", uselist=False)
    reverifications = relationship("I9Reverification", back_populates="i9_form")
    audit_logs = relationship("I9AuditLog", back_populates="i9_form")


class I9Section1(Base):
    """I-9 Section 1 data"""
    
    __tablename__ = "i9_section1"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    i9_form_id = Column(UUID(as_uuid=True), ForeignKey("i9_forms.id"), nullable=False, unique=True)
    last_name = Column(String(100), nullable=False)
    first_name = Column(String(100), nullable=False)
    middle_initial = Column(String(10), nullable=True)
    other_last_names = Column(String(100), nullable=True)
    address = Column(Text, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    ssn = Column(String(11), nullable=True)
    citizenship_status = Column(String(50), nullable=False)
    alien_number = Column(String(20), nullable=True)
    admission_number = Column(String(20), nullable=True)
    foreign_passport_number = Column(String(50), nullable=True)
    country_of_issuance = Column(String(100), nullable=True)
    preparer_translator_used = Column(Boolean, default=False)
    preparer_name = Column(String(255), nullable=True)
    preparer_address = Column(Text, nullable=True)
    employee_signature = Column(Text, nullable=True)  # Base64 signature
    employee_signature_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    i9_form = relationship("I9Form", back_populates="section1")


class I9Section2(Base):
    """I-9 Section 2 data"""
    
    __tablename__ = "i9_section2"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    i9_form_id = Column(UUID(as_uuid=True), ForeignKey("i9_forms.id"), nullable=False, unique=True)
    document_a = Column(Boolean, default=False)
    document_b = Column(Boolean, default=False)
    document_c = Column(Boolean, default=False)
    document_title = Column(String(255), nullable=True)
    document_number = Column(String(100), nullable=True)
    document_issuing_authority = Column(String(255), nullable=True)
    document_expiration_date = Column(Date, nullable=True)
    first_day_of_employment = Column(Date, nullable=False)
    employer_name = Column(String(255), nullable=False)
    employer_address = Column(Text, nullable=False)
    employer_city = Column(String(100), nullable=True)
    employer_state = Column(String(50), nullable=True)
    employer_zip = Column(String(20), nullable=True)
    authorized_representative_name = Column(String(255), nullable=True)
    authorized_representative_title = Column(String(100), nullable=True)
    authorized_representative_signature = Column(Text, nullable=True)
    authorized_representative_signature_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    i9_form = relationship("I9Form", back_populates="section2")


class I9Reverification(Base):
    """I-9 Reverification records"""
    
    __tablename__ = "i9_reverification"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    i9_form_id = Column(UUID(as_uuid=True), ForeignKey("i9_forms.id"), nullable=False)
    reverification_date = Column(Date, nullable=False)
    document_title = Column(String(255), nullable=True)
    document_number = Column(String(100), nullable=True)
    document_expiration_date = Column(Date, nullable=True)
    authorized_representative_name = Column(String(255), nullable=True)
    authorized_representative_signature = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())
    
    i9_form = relationship("I9Form", back_populates="reverifications")


class I9AuditLog(Base):
    """I-9 audit log"""
    
    __tablename__ = "i9_audit_log"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    i9_form_id = Column(UUID(as_uuid=True), ForeignKey("i9_forms.id"), nullable=False)
    action = Column(String(100), nullable=False)
    changes = Column(Text, nullable=True)  # JSON
    changed_by = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime, default=func.now())
    
    i9_form = relationship("I9Form", back_populates="audit_logs")
