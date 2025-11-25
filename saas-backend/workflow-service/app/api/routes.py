"""API routes for workflow-service - Extended for Enterprise"""

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from uuid import UUID
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.response import APIResponse
from shared_libs.auth.middleware import get_tenant_id
from shared_libs.database.postgres import get_db_session

from ..schemas.request import OKRCreate, OneOnOneCreate, ProjectCreate, TaskCreate, SprintCreate
from ..schemas.response import OKRResponse, OneOnOneResponse, ProjectResponse, TaskResponse, SprintResponse
from ..services.business import WorkflowService

router = APIRouter(prefix="/workflow", tags=["workflow"])


# ========== ENTERPRISE: PERFORMANCE MANAGEMENT ENDPOINTS ==========

@router.post("/performance/okrs", response_model=APIResponse[OKRResponse])
async def create_okr(
    okr_data: OKRCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create OKR"""
    tenant_id = get_tenant_id(request)
    service = WorkflowService(db)
    okr = await service.create_okr(okr_data, tenant_id)
    return APIResponse.success_response(data=okr, message="OKR created")


@router.get("/performance/okrs", response_model=APIResponse[list[OKRResponse]])
async def get_okrs(
    request: Request,
    employee_id: UUID = None,
    db: Session = Depends(get_db_session)
):
    """Get OKRs"""
    tenant_id = get_tenant_id(request)
    service = WorkflowService(db)
    okrs = await service.get_okrs(tenant_id, employee_id)
    return APIResponse.success_response(data=okrs)


@router.post("/performance/one-on-ones", response_model=APIResponse[OneOnOneResponse])
async def create_one_on_one(
    one_on_one_data: OneOnOneCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create one-on-one"""
    tenant_id = get_tenant_id(request)
    service = WorkflowService(db)
    one_on_one = await service.create_one_on_one(one_on_one_data, tenant_id)
    return APIResponse.success_response(data=one_on_one, message="One-on-one scheduled")


# ========== ENTERPRISE: PM AGENT ENDPOINTS ==========

@router.post("/projects", response_model=APIResponse[ProjectResponse])
async def create_project(
    project_data: ProjectCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create project"""
    tenant_id = get_tenant_id(request)
    service = WorkflowService(db)
    project = await service.create_project(project_data, tenant_id)
    return APIResponse.success_response(data=project, message="Project created")


@router.get("/projects", response_model=APIResponse[list[ProjectResponse]])
async def get_projects(
    request: Request,
    status: str = None,
    db: Session = Depends(get_db_session)
):
    """Get projects"""
    tenant_id = get_tenant_id(request)
    service = WorkflowService(db)
    projects = await service.get_projects(tenant_id, status)
    return APIResponse.success_response(data=projects)


@router.post("/projects/{project_id}/tasks", response_model=APIResponse[TaskResponse])
async def create_task(
    project_id: UUID,
    task_data: TaskCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create task"""
    tenant_id = get_tenant_id(request)
    service = WorkflowService(db)
    task = await service.create_task(project_id, task_data, tenant_id)
    return APIResponse.success_response(data=task, message="Task created")


@router.post("/projects/{project_id}/sprints", response_model=APIResponse[SprintResponse])
async def create_sprint(
    project_id: UUID,
    sprint_data: SprintCreate,
    request: Request,
    db: Session = Depends(get_db_session)
):
    """Create sprint"""
    tenant_id = get_tenant_id(request)
    service = WorkflowService(db)
    sprint = await service.create_sprint(project_id, sprint_data, tenant_id)
    return APIResponse.success_response(data=sprint, message="Sprint created")
