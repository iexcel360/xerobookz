"""API routes for AI service"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from ..services.ai_service import AIService
from ..schemas.request import (
    DocumentExtractionRequest,
    TextAnalysisRequest,
    FormFillRequest,
    ClassificationRequest,
    OCRRequest,
    AutoCompleteRequest
)
from ..schemas.response import (
    DocumentExtractionResponse,
    TextAnalysisResponse,
    FormFillResponse,
    ClassificationResponse,
    OCRResponse,
    AutoCompleteResponse
)

router = APIRouter(prefix="/ai", tags=["AI"])

ai_service = AIService()


@router.post("/extract-document", response_model=DocumentExtractionResponse)
async def extract_document_data(
    request: Request,
    file: UploadFile = File(...),
    document_type: Optional[str] = None
):
    """Extract structured data from uploaded document"""
    tenant_id = request.state.tenant_id
    content = await file.read()
    
    result = await ai_service.extract_document_data(
        content=content,
        filename=file.filename,
        document_type=document_type,
        tenant_id=tenant_id
    )
    
    return DocumentExtractionResponse(**result)


@router.post("/ocr", response_model=OCRResponse)
async def ocr_document(
    request: Request,
    file: UploadFile = File(...),
    language: Optional[str] = "en"
):
    """Perform OCR on uploaded document"""
    tenant_id = request.state.tenant_id
    content = await file.read()
    
    result = await ai_service.perform_ocr(
        content=content,
        filename=file.filename,
        language=language,
        tenant_id=tenant_id
    )
    
    return OCRResponse(**result)


@router.post("/classify-document", response_model=ClassificationResponse)
async def classify_document(
    request: Request,
    file: UploadFile = File(...)
):
    """Classify document type automatically"""
    tenant_id = request.state.tenant_id
    content = await file.read()
    
    result = await ai_service.classify_document(
        content=content,
        filename=file.filename,
        tenant_id=tenant_id
    )
    
    return ClassificationResponse(**result)


@router.post("/fill-form", response_model=FormFillResponse)
async def fill_form_automatically(
    request: Request,
    form_request: FormFillRequest
):
    """Automatically fill form fields using AI"""
    tenant_id = request.state.tenant_id
    
    result = await ai_service.fill_form(
        form_type=form_request.form_type,
        context=form_request.context,
        partial_data=form_request.partial_data,
        tenant_id=tenant_id
    )
    
    return FormFillResponse(**result)


@router.post("/analyze-text", response_model=TextAnalysisResponse)
async def analyze_text(
    request: Request,
    text_request: TextAnalysisRequest
):
    """Analyze text for sentiment, entities, key information"""
    tenant_id = request.state.tenant_id
    
    result = await ai_service.analyze_text(
        text=text_request.text,
        analysis_type=text_request.analysis_type,
        tenant_id=tenant_id
    )
    
    return TextAnalysisResponse(**result)


@router.post("/autocomplete", response_model=AutoCompleteResponse)
async def autocomplete(
    request: Request,
    autocomplete_request: AutoCompleteRequest
):
    """Provide AI-powered autocomplete suggestions"""
    tenant_id = request.state.tenant_id
    
    result = await ai_service.autocomplete(
        field_type=autocomplete_request.field_type,
        partial_input=autocomplete_request.partial_input,
        context=autocomplete_request.context,
        tenant_id=tenant_id
    )
    
    return AutoCompleteResponse(**result)


@router.post("/process-i9")
async def process_i9_document(
    request: Request,
    file: UploadFile = File(...)
):
    """Process I-9 document and extract all required fields"""
    tenant_id = request.state.tenant_id
    content = await file.read()
    
    result = await ai_service.process_i9_document(
        content=content,
        filename=file.filename,
        tenant_id=tenant_id
    )
    
    return result


@router.post("/process-timesheet")
async def process_timesheet(
    request: Request,
    file: UploadFile = File(...),
    employee_id: Optional[str] = None
):
    """Process timesheet image/document and extract time entries"""
    tenant_id = request.state.tenant_id
    content = await file.read()
    
    result = await ai_service.process_timesheet(
        content=content,
        filename=file.filename,
        employee_id=employee_id,
        tenant_id=tenant_id
    )
    
    return result


@router.post("/process-expense-receipt")
async def process_expense_receipt(
    request: Request,
    file: UploadFile = File(...)
):
    """Process expense receipt and extract expense details"""
    tenant_id = request.state.tenant_id
    content = await file.read()
    
    result = await ai_service.process_expense_receipt(
        content=content,
        filename=file.filename,
        tenant_id=tenant_id
    )
    
    return result


@router.post("/suggest-soc-code")
async def suggest_soc_code(
    request: Request,
    job_title: str,
    job_description: Optional[str] = None
):
    """Suggest SOC code based on job title and description"""
    tenant_id = request.state.tenant_id
    
    result = await ai_service.suggest_soc_code(
        job_title=job_title,
        job_description=job_description,
        tenant_id=tenant_id
    )
    
    return result


@router.post("/generate-onboarding-checklist")
async def generate_onboarding_checklist(
    request: Request,
    employee_data: Dict[str, Any],
    job_role: str
):
    """Generate personalized onboarding checklist using AI"""
    tenant_id = request.state.tenant_id
    
    result = await ai_service.generate_onboarding_checklist(
        employee_data=employee_data,
        job_role=job_role,
        tenant_id=tenant_id
    )
    
    return result

