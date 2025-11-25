"""Response schemas for AI service"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List


class DocumentExtractionResponse(BaseModel):
    success: bool
    extracted_data: Dict[str, Any] = Field(..., description="Extracted structured data")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score")
    document_type: Optional[str] = None
    message: Optional[str] = None


class OCRResponse(BaseModel):
    success: bool
    text: str = Field(..., description="Extracted text")
    confidence: float = Field(..., ge=0.0, le=1.0)
    language: Optional[str] = None
    message: Optional[str] = None


class ClassificationResponse(BaseModel):
    success: bool
    category: str = Field(..., description="Classified category")
    confidence: float = Field(..., ge=0.0, le=1.0)
    alternatives: Optional[List[Dict[str, float]]] = None
    message: Optional[str] = None


class FormFillResponse(BaseModel):
    success: bool
    filled_data: Dict[str, Any] = Field(..., description="Filled form data")
    confidence: float = Field(..., ge=0.0, le=1.0)
    suggestions: Optional[List[str]] = None
    message: Optional[str] = None


class TextAnalysisResponse(BaseModel):
    success: bool
    analysis: Dict[str, Any] = Field(..., description="Analysis results")
    confidence: float = Field(..., ge=0.0, le=1.0)
    message: Optional[str] = None


class AutoCompleteResponse(BaseModel):
    success: bool
    suggestions: List[str] = Field(..., description="Autocomplete suggestions")
    confidence: float = Field(..., ge=0.0, le=1.0)
    message: Optional[str] = None

