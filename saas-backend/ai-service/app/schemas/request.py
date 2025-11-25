"""Request schemas for AI service"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List


class DocumentExtractionRequest(BaseModel):
    document_type: Optional[str] = Field(None, description="Type of document (i9, passport, visa, etc.)")
    extract_fields: Optional[List[str]] = Field(None, description="Specific fields to extract")


class OCRRequest(BaseModel):
    language: Optional[str] = Field("en", description="Language code for OCR")
    enhance: bool = Field(True, description="Enhance image before OCR")


class ClassificationRequest(BaseModel):
    categories: Optional[List[str]] = Field(None, description="Possible categories to classify into")


class FormFillRequest(BaseModel):
    form_type: str = Field(..., description="Type of form (i9, onboarding, timesheet, etc.)")
    context: Optional[Dict[str, Any]] = Field(None, description="Context data for form filling")
    partial_data: Optional[Dict[str, Any]] = Field(None, description="Partially filled form data")


class TextAnalysisRequest(BaseModel):
    text: str = Field(..., description="Text to analyze")
    analysis_type: str = Field(..., description="Type of analysis (sentiment, entities, summary, etc.)")


class AutoCompleteRequest(BaseModel):
    field_type: str = Field(..., description="Type of field (job_title, department, etc.)")
    partial_input: str = Field(..., description="Partial user input")
    context: Optional[Dict[str, Any]] = Field(None, description="Additional context")

