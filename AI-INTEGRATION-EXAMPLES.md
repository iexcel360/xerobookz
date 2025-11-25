# 🤖 AI Integration Examples

> **Note**: This file contains detailed code examples. For the complete AI integration guide, see `AI-INTEGRATION.md`.

This document shows how to integrate AI capabilities into existing XeroBookz services.

## Document Service Integration

Add AI-powered document classification and data extraction:

```python
# document-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class DocumentService:
    def __init__(self, db: Session):
        # ... existing code ...
        self.ai_client = get_ai_client()
    
    async def upload_document_with_ai(
        self,
        filename: str,
        content: bytes,
        content_type: str,
        tenant_id: UUID,
        uploaded_by: UUID = None
    ) -> DocumentResponse:
        """Upload document with AI classification and extraction"""
        
        # 1. Classify document type using AI
        classification = await self.ai_client.classify_document(content, filename)
        document_type = classification.get("category", "other")
        
        # 2. Extract data if it's a known document type
        extracted_data = None
        if document_type in ["i9", "passport", "visa", "driver_license"]:
            extraction = await self.ai_client.extract_document(
                content, filename, document_type
            )
            extracted_data = extraction.get("extracted_data", {})
        
        # 3. Upload document (existing logic)
        metadata = await self.upload_document(
            filename=filename,
            content=content,
            content_type=content_type,
            document_type=document_type,
            tenant_id=tenant_id,
            uploaded_by=uploaded_by
        )
        
        # 4. Store extracted data in metadata
        if extracted_data:
            # Store in document metadata or separate collection
            self.repo.update_extracted_data(metadata.id, extracted_data)
        
        return metadata
```

## I-9 Service Integration

Auto-fill I-9 forms using AI:

```python
# i9-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class I9Service:
    def __init__(self, db: Session):
        # ... existing code ...
        self.ai_client = get_ai_client()
    
    async def create_i9_from_document(
        self,
        document_id: UUID,
        tenant_id: UUID,
        employee_id: UUID
    ) -> I9Response:
        """Create I-9 form from uploaded document using AI"""
        
        # 1. Get document content
        document = await document_service.get_document(document_id, tenant_id)
        content = await document_service.download_document(document_id, tenant_id)
        
        # 2. Process I-9 document with AI
        ai_result = await self.ai_client.process_i9(
            content["content"].read(),
            document.filename
        )
        
        # 3. Extract I-9 data
        i9_data = ai_result.get("extracted_data", {})
        
        # 4. Create I-9 form with extracted data
        i9_form = self.repo.create_i9(
            employee_id=employee_id,
            tenant_id=tenant_id,
            employee_name=i9_data.get("employee_name"),
            employee_address=i9_data.get("employee_address"),
            date_of_birth=i9_data.get("date_of_birth"),
            ssn=i9_data.get("ssn"),
            document_type=i9_data.get("document_type"),
            document_number=i9_data.get("document_number"),
            expiration_date=i9_data.get("expiration_date"),
            # ... other fields
        )
        
        return i9_form
```

## Onboarding Service Integration

Generate personalized onboarding checklists:

```python
# onboarding-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class OnboardingService:
    def __init__(self, db: Session):
        # ... existing code ...
        self.ai_client = get_ai_client()
    
    async def create_onboarding_with_ai(
        self,
        employee_id: UUID,
        tenant_id: UUID,
        job_role: str
    ) -> OnboardingResponse:
        """Create onboarding workflow with AI-generated checklist"""
        
        # 1. Get employee data
        employee = await employee_service.get_employee(employee_id, tenant_id)
        
        # 2. Generate personalized checklist using AI
        employee_data = {
            "name": employee.full_name,
            "job_title": employee.job_title,
            "department": employee.department,
            "location": employee.location,
            "employment_type": employee.employment_type
        }
        
        ai_result = await self.ai_client.generate_onboarding_checklist(
            employee_data=employee_data,
            job_role=job_role
        )
        
        # 3. Create onboarding workflow
        checklist = ai_result.get("checklist", [])
        onboarding = self.repo.create_onboarding(
            employee_id=employee_id,
            tenant_id=tenant_id,
            checklist_items=checklist
        )
        
        return onboarding
```

## Timesheet Service Integration

Auto-fill timesheets from images:

```python
# timesheet-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class TimesheetService:
    def __init__(self, db: Session):
        # ... existing code ...
        self.ai_client = get_ai_client()
    
    async def create_timesheet_from_image(
        self,
        file: UploadFile,
        employee_id: UUID,
        tenant_id: UUID,
        period_start: date,
        period_end: date
    ) -> TimesheetResponse:
        """Create timesheet from uploaded image using AI"""
        
        # 1. Process timesheet image with AI
        content = await file.read()
        ai_result = await self.ai_client.process_timesheet(
            content=content,
            filename=file.filename,
            employee_id=str(employee_id)
        )
        
        # 2. Extract timesheet data
        timesheet_data = ai_result.get("timesheet_data", {})
        
        # 3. Create timesheet entries
        timesheet = self.repo.create_timesheet(
            employee_id=employee_id,
            tenant_id=tenant_id,
            period_start=period_start,
            period_end=period_end,
            entries=[
                {
                    "date": entry["date"],
                    "hours": entry["hours"],
                    "project": entry.get("project"),
                    "task": entry.get("task")
                }
                for entry in timesheet_data.get("dates", [])
            ],
            total_hours=timesheet_data.get("total_hours", 0)
        )
        
        return timesheet
```

## Invoice Service Integration

Process expense receipts:

```python
# invoice-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class InvoiceService:
    def __init__(self, db: Session):
        # ... existing code ...
        self.ai_client = get_ai_client()
    
    async def create_expense_from_receipt(
        self,
        file: UploadFile,
        employee_id: UUID,
        tenant_id: UUID
    ) -> ExpenseResponse:
        """Create expense claim from receipt image using AI"""
        
        # 1. Process receipt with AI
        content = await file.read()
        ai_result = await self.ai_client.process_expense_receipt(
            content=content,
            filename=file.filename
        )
        
        # 2. Extract expense data
        expense_data = ai_result.get("expense_data", {})
        
        # 3. Create expense claim
        expense = self.repo.create_expense(
            employee_id=employee_id,
            tenant_id=tenant_id,
            merchant=expense_data.get("merchant"),
            date=expense_data.get("date"),
            amount=expense_data.get("amount"),
            category=expense_data.get("category"),
            tax=expense_data.get("tax"),
            items=expense_data.get("items", [])
        )
        
        return expense
```

## SOC Predictor Service Integration

Enhance SOC code prediction:

```python
# soc-predictor-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class SOCPredictorService:
    def __init__(self, db: Session):
        # ... existing code ...
        self.ai_client = get_ai_client()
    
    async def predict_soc_code(
        self,
        job_title: str,
        job_description: str,
        tenant_id: UUID
    ) -> SOCPredictionResponse:
        """Predict SOC code using AI"""
        
        # Use AI to suggest SOC code
        ai_result = await self.ai_client.suggest_soc_code(
            job_title=job_title,
            job_description=job_description
        )
        
        # Store prediction
        prediction = self.repo.create_prediction(
            tenant_id=tenant_id,
            job_title=job_title,
            suggested_soc_code=ai_result.get("soc_code"),
            soc_title=ai_result.get("soc_title"),
            confidence=ai_result.get("confidence"),
            reasoning=ai_result.get("reasoning")
        )
        
        return prediction
```

## Frontend Integration Example

React component for AI-powered document upload:

```typescript
// employer-web/app/components/AIDocumentUpload.tsx

'use client';

import { useState } from 'react';
import { Button } from '@xerobookz/ui-shared';

export function AIDocumentUpload({ onUpload }: { onUpload: (data: any) => void }) {
  const [uploading, setUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload and extract with AI
      const response = await fetch('/api/ai/extract-document', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-ID': tenantId
        },
        body: formData
      });

      const result = await response.json();
      setExtractedData(result.extracted_data);
      onUpload(result.extracted_data);
    } catch (error) {
      console.error('AI extraction failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileUpload}
        disabled={uploading}
        accept="image/*,.pdf"
      />
      {uploading && <p>Processing with AI...</p>}
      {extractedData && (
        <div>
          <h3>Extracted Data:</h3>
          <pre>{JSON.stringify(extractedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

## Error Handling

Always handle AI service errors gracefully:

```python
from shared_libs.ai.client import get_ai_client

async def process_with_ai_fallback(content: bytes, filename: str):
    """Process with AI, fallback to manual if AI fails"""
    ai_client = get_ai_client()
    
    try:
        # Try AI processing
        result = await ai_client.extract_document(content, filename)
        return result
    except Exception as e:
        # Log error but don't fail the operation
        logger.warning(f"AI processing failed: {e}")
        # Return empty result, user can fill manually
        return {
            "success": False,
            "extracted_data": {},
            "message": "AI processing unavailable, please fill manually"
        }
```

## Best Practices

1. **Always provide manual fallback** - AI may fail or be unavailable
2. **Show confidence scores** - Let users know how confident AI is
3. **Allow user review** - Always let users review and edit AI-extracted data
4. **Cache results** - Cache AI results for identical documents
5. **Rate limiting** - Respect AI service rate limits
6. **Error handling** - Gracefully handle AI service failures
7. **Cost monitoring** - Monitor AI API usage and costs

---

For more details, see [AI-INTEGRATION.md](./AI-INTEGRATION.md)

