"""Database models for workflow-service"""

from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey, Date, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from uuid import uuid4
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.postgres import Base


class BaseModel(Base):
    """Base model with tenant support"""
    __abstract__ = True
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


# ========== ENTERPRISE: PERFORMANCE MANAGEMENT MODELS ==========

class OKR(BaseModel):
    """OKR model"""
    
    __tablename__ = "okrs"
    
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    cycle_id = Column(UUID(as_uuid=True), nullable=True)
    objective = Column(Text, nullable=False)
    key_results = Column(JSON, nullable=True)
    status = Column(String(50), default="draft")  # draft, active, completed
    progress = Column(String(10), default="0")  # 0-100


class OneOnOne(BaseModel):
    """One-on-one meeting model"""
    
    __tablename__ = "one_on_ones"
    
    employee_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    manager_id = Column(UUID(as_uuid=True), nullable=False)
    scheduled_at = Column(DateTime, nullable=False)
    agenda = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(50), default="scheduled")  # scheduled, completed, cancelled


# ========== ENTERPRISE: PM AGENT MODELS ==========

class Project(BaseModel):
    """Project model"""
    
    __tablename__ = "projects"
    
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="planning")  # planning, active, completed, cancelled
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    project_manager_id = Column(UUID(as_uuid=True), nullable=True)
    
    tasks = relationship("Task", back_populates="project")
    sprints = relationship("Sprint", back_populates="project")


class Task(BaseModel):
    """Task model"""
    
    __tablename__ = "tasks"
    
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    assignee_id = Column(UUID(as_uuid=True), nullable=True)
    status = Column(String(50), default="todo")  # todo, in_progress, done
    priority = Column(String(20), default="medium")  # low, medium, high
    due_date = Column(Date, nullable=True)
    
    project = relationship("Project", back_populates="tasks")


class Sprint(BaseModel):
    """Sprint model"""
    
    __tablename__ = "sprints"
    
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False)
    name = Column(String(255), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    goal = Column(Text, nullable=True)
    status = Column(String(50), default="planned")  # planned, active, completed
    
    project = relationship("Project", back_populates="sprints")
