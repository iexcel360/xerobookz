"""Business logic for workflow-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

from ..schemas.request import OKRCreate, OneOnOneCreate, ProjectCreate, TaskCreate, SprintCreate
from ..schemas.response import OKRResponse, OneOnOneResponse, ProjectResponse, TaskResponse, SprintResponse
from ..repositories.repo import WorkflowRepository
from ..events.producers import EventProducer


class WorkflowService:
    """Workflow service - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
        self.repo = WorkflowRepository(db)
        self.event_producer = EventProducer()
    
    async def create_okr(self, data: OKRCreate, tenant_id: UUID) -> OKRResponse:
        """Create OKR"""
        okr = self.repo.create_okr(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.OKR_CREATED,
            tenant_id=tenant_id,
            payload={"okr_id": str(okr.id), "employee_id": str(data.employee_id)}
        )
        await self.event_producer.publish(event)
        
        return OKRResponse.model_validate(okr)
    
    async def get_okrs(self, tenant_id: UUID, employee_id: UUID | None = None) -> list[OKRResponse]:
        """Get OKRs"""
        okrs = self.repo.get_okrs(tenant_id, employee_id)
        return [OKRResponse.model_validate(o) for o in okrs]
    
    async def create_one_on_one(self, data: OneOnOneCreate, tenant_id: UUID) -> OneOnOneResponse:
        """Create one-on-one"""
        one_on_one = self.repo.create_one_on_one(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.ONE_ON_ONE_SCHEDULED,
            tenant_id=tenant_id,
            payload={"one_on_one_id": str(one_on_one.id)}
        )
        await self.event_producer.publish(event)
        
        return OneOnOneResponse.model_validate(one_on_one)
    
    async def create_project(self, data: ProjectCreate, tenant_id: UUID) -> ProjectResponse:
        """Create project"""
        project = self.repo.create_project(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.PROJECT_CREATED,
            tenant_id=tenant_id,
            payload={"project_id": str(project.id)}
        )
        await self.event_producer.publish(event)
        
        return ProjectResponse.model_validate(project)
    
    async def get_projects(self, tenant_id: UUID, status: str | None = None) -> list[ProjectResponse]:
        """Get projects"""
        projects = self.repo.get_projects(tenant_id, status)
        return [ProjectResponse.model_validate(p) for p in projects]
    
    async def create_task(self, project_id: UUID, data: TaskCreate, tenant_id: UUID) -> TaskResponse:
        """Create task"""
        task = self.repo.create_task(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.TASK_CREATED,
            tenant_id=tenant_id,
            payload={"task_id": str(task.id), "project_id": str(project_id)}
        )
        await self.event_producer.publish(event)
        
        return TaskResponse.model_validate(task)
    
    async def create_sprint(self, project_id: UUID, data: SprintCreate, tenant_id: UUID) -> SprintResponse:
        """Create sprint"""
        sprint = self.repo.create_sprint(data, tenant_id)
        
        event = EventEnvelope(
            event_type=EventType.SPRINT_CREATED,
            tenant_id=tenant_id,
            payload={"sprint_id": str(sprint.id), "project_id": str(project_id)}
        )
        await self.event_producer.publish(event)
        
        return SprintResponse.model_validate(sprint)

