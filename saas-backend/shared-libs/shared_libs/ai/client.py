"""AI client for calling AI service from other microservices"""

import httpx
import os
from typing import Dict, Any, Optional, List
import base64


class AIClient:
    """Client for calling AI service"""
    
    def __init__(self, ai_service_url: Optional[str] = None):
        self.base_url = ai_service_url or os.getenv("AI_SERVICE_URL", "http://ai-service:8025")
    
    async def extract_document(self, content: bytes, filename: str, document_type: Optional[str] = None) -> Dict[str, Any]:
        """Extract data from document"""
        async with httpx.AsyncClient(timeout=120.0) as client:
            files = {"file": (filename, content)}
            data = {}
            if document_type:
                data["document_type"] = document_type
            
            response = await client.post(
                f"{self.base_url}/ai/extract-document",
                files=files,
                data=data
            )
            response.raise_for_status()
            return response.json()
    
    async def perform_ocr(self, content: bytes, filename: str, language: str = "en") -> Dict[str, Any]:
        """Perform OCR on document"""
        async with httpx.AsyncClient(timeout=120.0) as client:
            files = {"file": (filename, content)}
            data = {"language": language}
            
            response = await client.post(
                f"{self.base_url}/ai/ocr",
                files=files,
                data=data
            )
            response.raise_for_status()
            return response.json()
    
    async def classify_document(self, content: bytes, filename: str) -> Dict[str, Any]:
        """Classify document type"""
        async with httpx.AsyncClient(timeout=120.0) as client:
            files = {"file": (filename, content)}
            
            response = await client.post(
                f"{self.base_url}/ai/classify-document",
                files=files
            )
            response.raise_for_status()
            return response.json()
    
    async def fill_form(self, form_type: str, context: Optional[Dict] = None, partial_data: Optional[Dict] = None) -> Dict[str, Any]:
        """Fill form automatically"""
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self.base_url}/ai/fill-form",
                json={
                    "form_type": form_type,
                    "context": context or {},
                    "partial_data": partial_data or {}
                }
            )
            response.raise_for_status()
            return response.json()
    
    async def process_i9(self, content: bytes, filename: str) -> Dict[str, Any]:
        """Process I-9 document"""
        async with httpx.AsyncClient(timeout=120.0) as client:
            files = {"file": (filename, content)}
            
            response = await client.post(
                f"{self.base_url}/ai/process-i9",
                files=files
            )
            response.raise_for_status()
            return response.json()
    
    async def process_timesheet(self, content: bytes, filename: str, employee_id: Optional[str] = None) -> Dict[str, Any]:
        """Process timesheet"""
        async with httpx.AsyncClient(timeout=120.0) as client:
            files = {"file": (filename, content)}
            data = {}
            if employee_id:
                data["employee_id"] = employee_id
            
            response = await client.post(
                f"{self.base_url}/ai/process-timesheet",
                files=files,
                data=data
            )
            response.raise_for_status()
            return response.json()
    
    async def process_expense_receipt(self, content: bytes, filename: str) -> Dict[str, Any]:
        """Process expense receipt"""
        async with httpx.AsyncClient(timeout=120.0) as client:
            files = {"file": (filename, content)}
            
            response = await client.post(
                f"{self.base_url}/ai/process-expense-receipt",
                files=files
            )
            response.raise_for_status()
            return response.json()
    
    async def suggest_soc_code(self, job_title: str, job_description: Optional[str] = None) -> Dict[str, Any]:
        """Suggest SOC code"""
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.base_url}/ai/suggest-soc-code",
                json={
                    "job_title": job_title,
                    "job_description": job_description
                }
            )
            response.raise_for_status()
            return response.json()
    
    async def generate_onboarding_checklist(self, employee_data: Dict[str, Any], job_role: str) -> Dict[str, Any]:
        """Generate onboarding checklist"""
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.base_url}/ai/generate-onboarding-checklist",
                json={
                    "employee_data": employee_data,
                    "job_role": job_role
                }
            )
            response.raise_for_status()
            return response.json()


# Singleton instance
_ai_client: Optional[AIClient] = None


def get_ai_client() -> AIClient:
    """Get singleton AI client instance"""
    global _ai_client
    if _ai_client is None:
        _ai_client = AIClient()
    return _ai_client

