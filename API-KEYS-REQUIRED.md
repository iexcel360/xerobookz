# 🔑 XeroBookz - Required API Keys Guide

This document lists all API keys and external service credentials you need to configure for XeroBookz.

## ✅ Required API Keys (Must Have)

### 1. AI Service API Key (REQUIRED for AI Features)

**Choose ONE of the following:**

#### Option A: OpenAI API Key (Recommended)
- **Purpose**: AI-powered document processing, OCR, form auto-fill, and automation
- **Where to get it**: https://platform.openai.com/api-keys
- **Steps**:
  1. Sign up or log in at https://platform.openai.com
  2. Go to API Keys section
  3. Click "Create new secret key"
  4. Copy the key (starts with `sk-...`)
  5. Add to `.env` file as `OPENAI_API_KEY`
- **Cost**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Free tier**: $5 free credits for new accounts
- **Status**: ⚠️ **REQUIRED** for AI features to work

#### Option B: Anthropic Claude API Key (Alternative)
- **Purpose**: Alternative AI provider for document processing
- **Where to get it**: https://console.anthropic.com/
- **Steps**:
  1. Sign up or log in at https://console.anthropic.com
  2. Go to API Keys section
  3. Create a new API key
  4. Copy the key (starts with `sk-ant-...`)
  5. Add to `.env` file as `ANTHROPIC_API_KEY`
- **Cost**: ~$0.25 per 1M input tokens, ~$1.25 per 1M output tokens
- **Status**: ⚠️ **REQUIRED** if not using OpenAI

---

## ⚙️ Optional API Keys (For Enhanced Features)

### 2. E-Verify API Credentials (Optional - For I-9 Compliance)
- **Purpose**: Integration with USCIS E-Verify system
- **Where to get it**: https://www.e-verify.gov/
- **Status**: ⚠️ **OPTIONAL** - Only needed if using E-Verify integration
- **Note**: Requires business registration with E-Verify

### 3. Email Service API Key (Optional - For Notifications)
- **Purpose**: Send email notifications to users
- **Options**:
  - **SendGrid**: https://sendgrid.com/
  - **AWS SES**: https://aws.amazon.com/ses/
  - **Mailgun**: https://www.mailgun.com/
- **Status**: ⚠️ **OPTIONAL** - Only needed for email notifications
- **Note**: Can use SMTP instead (no API key needed)

### 4. SMS Service API Key (Optional - For SMS Notifications)
- **Purpose**: Send SMS notifications
- **Options**:
  - **Twilio**: https://www.twilio.com/
  - **AWS SNS**: https://aws.amazon.com/sns/
- **Status**: ⚠️ **OPTIONAL** - Only needed for SMS notifications

### 5. Payment Gateway API Keys (Optional - For Payment Processing)
- **Purpose**: Process payments for invoices and subscriptions
- **Options**:
  - **Stripe**: https://stripe.com/
  - **PayPal**: https://developer.paypal.com/
- **Status**: ⚠️ **OPTIONAL** - Only needed for payment processing

---

## 📝 How to Add API Keys to .env File

### Location
```
xerobookz-infrastructure/docker-compose/.env
```

### Minimum Required Configuration

Add at least ONE AI API key:

```bash
# REQUIRED: AI Configuration (Choose ONE)
# Option 1: OpenAI (Recommended)
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=openai

# OR Option 2: Anthropic
# ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
# ANTHROPIC_MODEL=claude-3-haiku-20240307
# AI_PROVIDER=anthropic

# Optional: OCR Configuration
USE_OCR=True
OCR_PROVIDER=openai
AI_RATE_LIMIT=100
```

### Complete Example with All Optional Keys

```bash
# ============================================
# REQUIRED API KEYS
# ============================================

# AI Configuration (REQUIRED - Choose ONE)
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=openai

# OR use Anthropic
# ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
# ANTHROPIC_MODEL=claude-3-haiku-20240307
# AI_PROVIDER=anthropic

# ============================================
# OPTIONAL API KEYS (Add as needed)
# ============================================

# E-Verify (Optional)
E_VERIFY_USERNAME=your-everify-username
E_VERIFY_PASSWORD=your-everify-password

# Email Service - SendGrid (Optional)
SENDGRID_API_KEY=SG.your-sendgrid-key-here

# Email Service - AWS SES (Optional)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1

# SMS Service - Twilio (Optional)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# Payment Gateway - Stripe (Optional)
STRIPE_SECRET_KEY=sk_live_your-stripe-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-key

# Payment Gateway - PayPal (Optional)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-secret

# ============================================
# INTERNAL CONFIGURATION (Already set)
# ============================================
POSTGRES_URI=postgresql://xerobookz:xerobookz_dev@postgres:5432/xerobookz
MONGO_URI=mongodb://xerobookz:xerobookz_dev@mongodb:27017
REDIS_URI=redis://redis:6379/0
RABBITMQ_URI=amqp://guest:guest@rabbitmq:5672/
AI_SERVICE_URL=http://ai-service:8025
```

---

## 🎯 Quick Start Checklist

### Minimum Setup (AI Features Only)
- [ ] Get OpenAI API key from https://platform.openai.com/api-keys
- [ ] Add `OPENAI_API_KEY` to `.env` file
- [ ] Set `AI_PROVIDER=openai` in `.env` file
- [ ] Start services: `docker-compose up -d ai-service`

### Full Setup (All Features)
- [ ] Get OpenAI API key
- [ ] (Optional) Get E-Verify credentials
- [ ] (Optional) Get email service API key
- [ ] (Optional) Get SMS service API key
- [ ] (Optional) Get payment gateway API keys
- [ ] Add all keys to `.env` file
- [ ] Start services

---

## 🔍 How to Verify API Keys Are Working

### Test OpenAI API Key
```bash
# Check if AI service is running
curl http://localhost:8025/health

# Expected response:
# {
#   "status": "healthy",
#   "service": "ai-service",
#   "ai_provider": "openai",
#   "model": "gpt-4o-mini"
# }
```

### Test AI Service with API Key
```bash
# Test document classification
curl -X POST http://localhost:8000/ai/classify-document \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-Tenant-ID: YOUR_TENANT_ID" \
  -F "file=@test-document.pdf"
```

---

## 💰 Cost Estimates

### OpenAI (GPT-4o-mini) - Recommended
- **Free tier**: $5 free credits for new accounts
- **Per document**: ~$0.01-0.05
- **Monthly (1000 docs)**: ~$50-200
- **Best for**: Cost-effective bulk processing

### Anthropic (Claude 3 Haiku)
- **Per document**: ~$0.02-0.08
- **Monthly (1000 docs)**: ~$80-300
- **Best for**: Higher accuracy needs

---

## 🆘 Troubleshooting

### API Key Not Working
1. **Check key format**:
   - OpenAI: Should start with `sk-`
   - Anthropic: Should start with `sk-ant-`

2. **Verify key is active**:
   - Check provider dashboard
   - Ensure key hasn't been revoked

3. **Check environment variables**:
   ```bash
   docker exec xerobookz-ai-service env | grep OPENAI_API_KEY
   ```

4. **Check service logs**:
   ```bash
   docker logs xerobookz-ai-service
   ```

### Common Errors
- **"OpenAI API key not configured"**: Add `OPENAI_API_KEY` to `.env`
- **"Rate limit exceeded"**: Check API usage in provider dashboard
- **"Invalid API key"**: Verify key is correct and active

---

## 📚 Additional Resources

- **OpenAI API Docs**: https://platform.openai.com/docs
- **Anthropic API Docs**: https://docs.anthropic.com/
- **AI Integration Setup**: See `AI-INTEGRATION-SETUP.md`
- **AI Integration Examples**: See `AI-INTEGRATION-EXAMPLES.md`

---

## ✅ Summary

**Minimum Required**: 
- ✅ **1 AI API Key** (OpenAI OR Anthropic) - **CONFIGURED** ✅

**Optional** (Add as needed):
- E-Verify credentials
- Email service API key
- SMS service API key
- Payment gateway API keys

**Current Status**: 
- ✅ OpenAI API key configured in `.env` file
- ✅ AI service added to `docker-compose.yml`
- ⏳ Ready to start: `docker-compose up -d ai-service`

**Recommendation**: Start with just the OpenAI API key to get AI features working. Add other API keys as you need those specific features.

---

**Last Updated**: January 2025

