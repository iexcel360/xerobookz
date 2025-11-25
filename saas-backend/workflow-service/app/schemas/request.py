"""Request schemas for workflow-service - Extended for Enterprise"""

from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from uuid import UUID
from datetime import date


class OKRCreate(BaseModel):
    """Create OKR"""
    employee_id: UUID
    cycle_id: Optional[UUID] = None
    objective: str
    key_results: Optional[Dict[str, Any]] = None


class OneOnOneCreate(BaseModel):
    """Create one-on-one"""
    employee_id: UUID
    manager_id: UUID
    scheduled_at: str  # ISO datetime string
    agenda: Optional[str] = None


class ProjectCreate(BaseModel):
    """Create project"""
    name: str
    description: Optional[str] = None
    start_date: Optional[str] = None  # ISO date string
    end_date: Optional[str] = None
    project_manager_id: Optional[UUID] = None


class TaskCreate(BaseModel):
    """Create task"""
    project_id: UUID
    title: str
    description: Optional[str] = None
    assignee_id: Optional[UUID] = None
    priority: str = "medium"
    due_date: Optional[str] = None  # ISO date string


class SprintCreate(BaseModel):
    """Create sprint"""
    project_id: UUID
    name: str
    start_date: str  # ISO date string
    end_date: str  # ISO date string
    goal: Optional[str] = None

