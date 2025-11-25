"""Repository for workflow-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime

from ..models.db_models import OKR, OneOnOne, Project, Task, Sprint
from ..schemas.request import OKRCreate, OneOnOneCreate, ProjectCreate, TaskCreate, SprintCreate


class WorkflowRepository:
    """Workflow repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_okr(self, data: OKRCreate, tenant_id: UUID) -> OKR:
        """Create OKR"""
        okr = OKR(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            cycle_id=data.cycle_id,
            objective=data.objective,
            key_results=data.key_results
        )
        self.db.add(okr)
        self.db.commit()
        self.db.refresh(okr)
        return okr
    
    def get_okrs(self, tenant_id: UUID, employee_id: Optional[UUID] = None) -> List[OKR]:
        """Get OKRs"""
        query = self.db.query(OKR).filter(OKR.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(OKR.employee_id == employee_id)
        return query.all()
    
    def create_one_on_one(self, data: OneOnOneCreate, tenant_id: UUID) -> OneOnOne:
        """Create one-on-one"""
        one_on_one = OneOnOne(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            manager_id=data.manager_id,
            scheduled_at=datetime.fromisoformat(data.scheduled_at),
            agenda=data.agenda
        )
        self.db.add(one_on_one)
        self.db.commit()
        self.db.refresh(one_on_one)
        return one_on_one
    
    def create_project(self, data: ProjectCreate, tenant_id: UUID) -> Project:
        """Create project"""
        project = Project(
            tenant_id=tenant_id,
            name=data.name,
            description=data.description,
            start_date=datetime.fromisoformat(data.start_date).date() if data.start_date else None,
            end_date=datetime.fromisoformat(data.end_date).date() if data.end_date else None,
            project_manager_id=data.project_manager_id
        )
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project
    
    def get_projects(self, tenant_id: UUID, status: Optional[str] = None) -> List[Project]:
        """Get projects"""
        query = self.db.query(Project).filter(Project.tenant_id == tenant_id)
        if status:
            query = query.filter(Project.status == status)
        return query.all()
    
    def create_task(self, data: TaskCreate, tenant_id: UUID) -> Task:
        """Create task"""
        task = Task(
            tenant_id=tenant_id,
            project_id=data.project_id,
            title=data.title,
            description=data.description,
            assignee_id=data.assignee_id,
            priority=data.priority,
            due_date=datetime.fromisoformat(data.due_date).date() if data.due_date else None
        )
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task
    
    def create_sprint(self, data: SprintCreate, tenant_id: UUID) -> Sprint:
        """Create sprint"""
        sprint = Sprint(
            tenant_id=tenant_id,
            project_id=data.project_id,
            name=data.name,
            start_date=datetime.fromisoformat(data.start_date).date(),
            end_date=datetime.fromisoformat(data.end_date).date(),
            goal=data.goal
        )
        self.db.add(sprint)
        self.db.commit()
        self.db.refresh(sprint)
        return sprint

