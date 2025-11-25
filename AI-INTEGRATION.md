# 🤖 XeroBookz AI Integration Guide

## Overview

XeroBookz includes comprehensive AI capabilities to automate manual tasks across the platform. The AI integration uses OpenAI or Anthropic APIs to provide document processing, form automation, OCR, and intelligent suggestions.

## ✅ Current Status

### Completed
- [x] AI service microservice (Port 8025)
- [x] Shared AI client library
- [x] API Gateway routing (`/ai/*`)
- [x] Docker Compose configuration
- [x] Environment variables configured
- [x] OpenAI API key added

### Ready to Use
- ✅ Document OCR and text extraction
- ✅ Document classification
- ✅ Form auto-filling
- ✅ I-9 document processing
- ✅ Timesheet processing
- ✅ Expense receipt processing
- ✅ SOC code suggestions
- ✅ Onboarding checklist generation

### Optional Enhancements
- [ ] Frontend UI components
- [ ] Service integrations (document-service, i9-service, etc.)

---

## 🚀 Quick Start

### Step 1: Verify API Key (Already Done ✅)
Your OpenAI API key is configured in `.env` file.

### Step 2: Start AI Service

```bash
cd xerobookz-infrastructure/docker-compose

# Start all services (including AI service)
./start.sh

# OR start just AI service
docker-compose up -d ai-service
```

### Step 3: Verify Service

```bash
curl http://localhost:8025/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "ai-service",
  "ai_provider": "openai",
  "model": "gpt-4o-mini"
}
```

---

## 📡 API Endpoints

All endpoints available at `http://localhost:8000/ai/*`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ai/extract-document` | POST | Extract data from document |
| `/ai/ocr` | POST | Perform OCR on document |
| `/ai/classify-document` | POST | Classify document type |
| `/ai/fill-form` | POST | Auto-fill form |
| `/ai/process-i9` | POST | Process I-9 document |
| `/ai/process-timesheet` | POST | Process timesheet image |
| `/ai/process-expense-receipt` | POST | Process expense receipt |
| `/ai/suggest-soc-code` | POST | Suggest SOC code |
| `/ai/generate-onboarding-checklist` | POST | Generate onboarding checklist |
| `/ai/autocomplete` | POST | Get autocomplete suggestions |

---

## 💻 Integration Examples

### Backend Integration

```python
from shared_libs.ai.client import get_ai_client

ai_client = get_ai_client()

# Extract data from document
result = await ai_client.extract_document(
    content=file_content,
    filename="i9_form.pdf",
    document_type="i9"
)

# Process I-9 document
i9_data = await ai_client.process_i9(
    content=file_content,
    filename="i9_form.pdf"
)

# Suggest SOC code
soc_result = await ai_client.suggest_soc_code(
    job_title="Software Engineer",
    job_description="Develop web applications..."
)
```

### Frontend Integration

```typescript
// Upload document and extract data
const formData = new FormData();
formData.append('file', file);

const response = await fetch('http://localhost:8000/ai/extract-document', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'X-Tenant-ID': tenantId
  },
  body: formData
});

const result = await response.json();
// Use result.extracted_data
```

### Document Service Integration

```python
# document-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class DocumentService:
    def __init__(self, db: Session):
        self.ai_client = get_ai_client()
    
    async def upload_document_with_ai(
        self,
        filename: str,
        content: bytes,
        tenant_id: UUID
    ) -> DocumentResponse:
        # 1. Classify document type
        classification = await self.ai_client.classify_document(content, filename)
        document_type = classification.get("category", "other")
        
        # 2. Extract data if known type
        extracted_data = None
        if document_type in ["i9", "passport", "visa"]:
            extraction = await self.ai_client.extract_document(
                content, filename, document_type
            )
            extracted_data = extraction.get("extracted_data", {})
        
        # 3. Upload and store
        metadata = await self.upload_document(...)
        if extracted_data:
            self.repo.update_extracted_data(metadata.id, extracted_data)
        
        return metadata
```

### I-9 Service Integration

```python
# i9-service/app/services/business.py

from shared_libs.ai.client import get_ai_client

class I9Service:
    def __init__(self, db: Session):
        self.ai_client = get_ai_client()
    
    async def create_i9_from_document(
        self,
        document_id: UUID,
        tenant_id: UUID,
        employee_id: UUID
    ) -> I9Response:
        # Get document content
        content = await document_service.download_document(document_id, tenant_id)
        
        # Process with AI
        ai_result = await self.ai_client.process_i9(
            content["content"].read(),
            document.filename
        )
        
        # Create I-9 form with extracted data
        i9_form = self.repo.create_i9(
            employee_id=employee_id,
            employee_name=ai_result["extracted_data"].get("employee_name"),
            # ... other fields
        )
        
        return i9_form
```

### Error Handling

```python
async def process_with_ai_fallback(content: bytes, filename: str):
    """Process with AI, fallback to manual if AI fails"""
    ai_client = get_ai_client()
    
    try:
        result = await ai_client.extract_document(content, filename)
        return result
    except Exception as e:
        logger.warning(f"AI processing failed: {e}")
        return {
            "success": False,
            "extracted_data": {},
            "message": "AI processing unavailable, please fill manually"
        }
```

---

## 💰 Cost Estimates

### OpenAI (GPT-4o-mini) - Currently Configured
- **Free tier**: $5 free credits for new accounts
- **Per document**: ~$0.01-0.05
- **Monthly (1000 docs)**: ~$50-200
- **Best for**: Cost-effective bulk processing

### Anthropic (Claude 3 Haiku)
- **Per document**: ~$0.02-0.08
- **Monthly (1000 docs)**: ~$80-300
- **Best for**: Higher accuracy needs

**Recommendation**: Currently using OpenAI GPT-4o-mini for cost-effectiveness.

---

## 🔧 Configuration

### Environment Variables

Located in `xerobookz-infrastructure/docker-compose/.env`:

```bash
# AI Configuration (Already Configured ✅)
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=openai

# Optional Settings
USE_OCR=True
OCR_PROVIDER=openai
AI_RATE_LIMIT=100
```

### Docker Compose

AI service is already added to `docker-compose.yml` ✅

---

## 🐛 Troubleshooting

### AI Service Not Starting
```bash
# Check logs
docker logs xerobookz-ai-service

# Verify API key
docker exec xerobookz-ai-service env | grep OPENAI_API_KEY
```

### API Key Errors
- Ensure key is set in `.env` file ✅
- Check key format (should start with `sk-`)
- Verify key is active in OpenAI dashboard

### Rate Limit Errors
- Check API usage: https://platform.openai.com/usage
- Adjust `AI_RATE_LIMIT` in config
- Implement request queuing

---

## 📚 Best Practices

1. **Always provide manual fallback** - AI may fail or be unavailable
2. **Show confidence scores** - Let users know how confident AI is
3. **Allow user review** - Always let users review and edit AI-extracted data
4. **Cache results** - Cache AI results for identical documents
5. **Rate limiting** - Respect AI service rate limits
6. **Error handling** - Gracefully handle AI service failures
7. **Cost monitoring** - Monitor API usage and costs

---

## 📖 Additional Resources

- **OpenAI API Docs**: https://platform.openai.com/docs
- **Anthropic API Docs**: https://docs.anthropic.com/
- **API Keys Guide**: See `API-KEYS-REQUIRED.md`
- **XeroBookz API Docs**: http://localhost:8000/docs

---

**Last Updated**: January 2025  
**Status**: Ready to Use ✅

