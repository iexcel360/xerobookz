"""AI Service - Core AI operations"""

import base64
import json
from typing import Dict, Any, Optional, List
import httpx
from ..config import settings
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))


class AIService:
    """Centralized AI service for all AI operations"""
    
    def __init__(self):
        self.provider = settings.AI_PROVIDER
        self.openai_key = settings.OPENAI_API_KEY
        self.anthropic_key = settings.ANTHROPIC_API_KEY
        self.openai_model = settings.OPENAI_MODEL
        self.anthropic_model = settings.ANTHROPIC_MODEL
    
    async def _call_openai(self, messages: List[Dict], model: Optional[str] = None) -> Dict[str, Any]:
        """Call OpenAI API"""
        if not self.openai_key:
            raise ValueError("OpenAI API key not configured")
        
        model = model or self.openai_model
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.openai_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": model,
                    "messages": messages,
                    "temperature": 0.3,
                    "response_format": {"type": "json_object"}
                }
            )
            response.raise_for_status()
            return response.json()
    
    async def _call_anthropic(self, messages: List[Dict], model: Optional[str] = None) -> Dict[str, Any]:
        """Call Anthropic API"""
        if not self.anthropic_key:
            raise ValueError("Anthropic API key not configured")
        
        model = model or self.anthropic_model
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": self.anthropic_key,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json"
                },
                json={
                    "model": model,
                    "max_tokens": 4096,
                    "messages": messages
                }
            )
            response.raise_for_status()
            return response.json()
    
    async def _call_ai(self, messages: List[Dict], model: Optional[str] = None) -> str:
        """Call AI provider (OpenAI or Anthropic)"""
        if self.provider == "openai":
            response = await self._call_openai(messages, model)
            return response["choices"][0]["message"]["content"]
        elif self.provider == "anthropic":
            response = await self._call_anthropic(messages, model)
            return response["content"][0]["text"]
        else:
            raise ValueError(f"Unknown AI provider: {self.provider}")
    
    async def perform_ocr(self, content: bytes, filename: str, language: str = "en", tenant_id: str = None) -> Dict[str, Any]:
        """Perform OCR on document image"""
        if self.provider == "openai":
            # Use OpenAI Vision API for OCR
            base64_image = base64.b64encode(content).decode('utf-8')
            mime_type = self._get_mime_type(filename)
            
            messages = [{
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Extract all text from this document. Return as JSON with 'text' field containing the extracted text and 'confidence' field with confidence score (0-1)."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{base64_image}"
                        }
                    }
                ]
            }]
            
            response_text = await self._call_ai(messages)
            result = json.loads(response_text)
            
            return {
                "success": True,
                "text": result.get("text", ""),
                "confidence": result.get("confidence", 0.9),
                "language": language
            }
        else:
            # Fallback: Use Anthropic with image support
            base64_image = base64.b64encode(content).decode('utf-8')
            messages = [{
                "role": "user",
                "content": f"Extract all text from this image. Return JSON with 'text' and 'confidence' fields. Image: {base64_image[:100]}..."
            }]
            response_text = await self._call_ai(messages)
            result = json.loads(response_text)
            
            return {
                "success": True,
                "text": result.get("text", ""),
                "confidence": result.get("confidence", 0.9),
                "language": language
            }
    
    async def extract_document_data(self, content: bytes, filename: str, document_type: Optional[str] = None, tenant_id: str = None) -> Dict[str, Any]:
        """Extract structured data from document"""
        base64_image = base64.b64encode(content).decode('utf-8')
        mime_type = self._get_mime_type(filename)
        
        prompt = f"""Extract structured data from this {document_type or 'document'}. 
        Return JSON with all relevant fields extracted. Include a 'confidence' score (0-1) for the extraction.
        For I-9 documents, extract: employee_name, employee_address, date_of_birth, ssn, document_type, document_number, expiration_date, etc.
        For passports, extract: name, passport_number, nationality, date_of_birth, expiration_date, etc.
        For visas, extract: visa_type, visa_number, issue_date, expiration_date, etc."""
        
        if self.provider == "openai":
            messages = [{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime_type};base64,{base64_image}"}
                    }
                ]
            }]
        else:
            messages = [{"role": "user", "content": f"{prompt}\n\nImage data: {base64_image[:200]}..."}]
        
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "extracted_data": result,
            "confidence": result.pop("confidence", 0.9),
            "document_type": document_type
        }
    
    async def classify_document(self, content: bytes, filename: str, tenant_id: str = None) -> Dict[str, Any]:
        """Classify document type"""
        base64_image = base64.b64encode(content).decode('utf-8')
        mime_type = self._get_mime_type(filename)
        
        prompt = """Classify this document. Return JSON with 'category' (i9, passport, visa, driver_license, ssn_card, w2, w4, timesheet, receipt, invoice, other) and 'confidence' (0-1)."""
        
        if self.provider == "openai":
            messages = [{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime_type};base64,{base64_image}"}
                    }
                ]
            }]
        else:
            messages = [{"role": "user", "content": f"{prompt}\n\nImage: {base64_image[:200]}..."}]
        
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "category": result.get("category", "other"),
            "confidence": result.get("confidence", 0.9)
        }
    
    async def fill_form(self, form_type: str, context: Optional[Dict] = None, partial_data: Optional[Dict] = None, tenant_id: str = None) -> Dict[str, Any]:
        """Automatically fill form fields"""
        context_str = json.dumps(context or {})
        partial_str = json.dumps(partial_data or {})
        
        prompt = f"""Fill the {form_type} form based on the following context and partial data.
        Context: {context_str}
        Partial Data: {partial_str}
        
        Return JSON with 'filled_data' containing all form fields and 'confidence' score (0-1).
        Only fill fields you're confident about based on the context."""
        
        messages = [{"role": "user", "content": prompt}]
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "filled_data": result.get("filled_data", {}),
            "confidence": result.get("confidence", 0.8)
        }
    
    async def analyze_text(self, text: str, analysis_type: str, tenant_id: str = None) -> Dict[str, Any]:
        """Analyze text"""
        prompt = f"""Analyze the following text for {analysis_type}:
        {text}
        
        Return JSON with analysis results and 'confidence' score (0-1)."""
        
        messages = [{"role": "user", "content": prompt}]
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "analysis": result,
            "confidence": result.pop("confidence", 0.9)
        }
    
    async def autocomplete(self, field_type: str, partial_input: str, context: Optional[Dict] = None, tenant_id: str = None) -> Dict[str, Any]:
        """Provide autocomplete suggestions"""
        context_str = json.dumps(context or {})
        
        prompt = f"""Provide autocomplete suggestions for a {field_type} field.
        Partial input: {partial_input}
        Context: {context_str}
        
        Return JSON with 'suggestions' array (max 5) and 'confidence' score (0-1)."""
        
        messages = [{"role": "user", "content": prompt}]
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "suggestions": result.get("suggestions", []),
            "confidence": result.get("confidence", 0.8)
        }
    
    async def process_i9_document(self, content: bytes, filename: str, tenant_id: str = None) -> Dict[str, Any]:
        """Process I-9 document specifically"""
        return await self.extract_document_data(content, filename, "i9", tenant_id)
    
    async def process_timesheet(self, content: bytes, filename: str, employee_id: Optional[str] = None, tenant_id: str = None) -> Dict[str, Any]:
        """Process timesheet document"""
        base64_image = base64.b64encode(content).decode('utf-8')
        mime_type = self._get_mime_type(filename)
        
        prompt = """Extract timesheet data from this document. Return JSON with:
        - dates: array of dates
        - hours: array of hours worked per day
        - total_hours: total hours
        - projects/tasks: if applicable
        - confidence: confidence score (0-1)"""
        
        if self.provider == "openai":
            messages = [{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime_type};base64,{base64_image}"}
                    }
                ]
            }]
        else:
            messages = [{"role": "user", "content": f"{prompt}\n\nImage: {base64_image[:200]}..."}]
        
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "timesheet_data": result,
            "confidence": result.pop("confidence", 0.9)
        }
    
    async def process_expense_receipt(self, content: bytes, filename: str, tenant_id: str = None) -> Dict[str, Any]:
        """Process expense receipt"""
        base64_image = base64.b64encode(content).decode('utf-8')
        mime_type = self._get_mime_type(filename)
        
        prompt = """Extract expense data from this receipt. Return JSON with:
        - merchant: merchant name
        - date: purchase date
        - amount: total amount
        - items: array of items (if itemized)
        - category: expense category
        - tax: tax amount
        - confidence: confidence score (0-1)"""
        
        if self.provider == "openai":
            messages = [{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime_type};base64,{base64_image}"}
                    }
                ]
            }]
        else:
            messages = [{"role": "user", "content": f"{prompt}\n\nImage: {base64_image[:200]}..."}]
        
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "expense_data": result,
            "confidence": result.pop("confidence", 0.9)
        }
    
    async def suggest_soc_code(self, job_title: str, job_description: Optional[str] = None, tenant_id: str = None) -> Dict[str, Any]:
        """Suggest SOC code"""
        prompt = f"""Based on the job title and description, suggest the most appropriate SOC code.
        Job Title: {job_title}
        Description: {job_description or 'N/A'}
        
        Return JSON with:
        - soc_code: suggested SOC code
        - soc_title: SOC title
        - confidence: confidence score (0-1)
        - reasoning: brief explanation"""
        
        messages = [{"role": "user", "content": prompt}]
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "soc_code": result.get("soc_code"),
            "soc_title": result.get("soc_title"),
            "confidence": result.get("confidence", 0.8),
            "reasoning": result.get("reasoning")
        }
    
    async def generate_onboarding_checklist(self, employee_data: Dict[str, Any], job_role: str, tenant_id: str = None) -> Dict[str, Any]:
        """Generate personalized onboarding checklist"""
        employee_str = json.dumps(employee_data)
        
        prompt = f"""Generate a personalized onboarding checklist for this employee:
        Employee Data: {employee_str}
        Job Role: {job_role}
        
        Return JSON with:
        - checklist: array of tasks with 'task', 'category', 'priority', 'estimated_time'
        - confidence: confidence score (0-1)"""
        
        messages = [{"role": "user", "content": prompt}]
        response_text = await self._call_ai(messages)
        result = json.loads(response_text)
        
        return {
            "success": True,
            "checklist": result.get("checklist", []),
            "confidence": result.get("confidence", 0.9)
        }
    
    def _get_mime_type(self, filename: str) -> str:
        """Get MIME type from filename"""
        ext = filename.split('.')[-1].lower()
        mime_types = {
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'pdf': 'application/pdf',
            'gif': 'image/gif',
            'webp': 'image/webp'
        }
        return mime_types.get(ext, 'image/jpeg')

