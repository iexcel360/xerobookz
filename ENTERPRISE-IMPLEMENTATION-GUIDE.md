# 🚀 Enterprise Implementation Guide

## Overview
This guide provides the complete pattern for implementing enterprise features across all remaining services. **organization-service** is fully implemented and serves as the reference implementation.

## Implementation Pattern

Each service extension follows this structure:

1. **Models** (`app/models/db_models.py`) - Database models
2. **Schemas** (`app/schemas/request.py` & `response.py`) - Request/Response schemas
3. **Repository** (`app/repositories/repo.py`) - Data access layer
4. **Business Service** (`app/services/business.py`) - Business logic + events
5. **API Routes** (`app/api/routes.py`) - REST endpoints
6. **Event Producer** (`app/events/producers.py`) - Event publishing

## Reference Implementation

**✅ organization-service** - Fully implemented with:
- Benefits Admin (BenefitPlan, BenefitEnrollment)
- ITSM Agent (ITTicket, IdentityRequest)
- Complete schemas, repository, service, routes, and events

## Remaining Services Implementation

### 2. onboarding-service

**Features to Add:**
- Core HR Agent (AI-powered)
- Recruiting (ATS)

**Models Needed:**
```python
# app/models/db_models.py
class JobPosting(Base):
    __tablename__ = "job_postings"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    title = Column(String(255))
    department_id = Column(UUID)
    job_code = Column(String(50))
    description = Column(Text)
    requirements = Column(Text)
    location = Column(String(255))
    employment_type = Column(String(50))
    status = Column(String(50))  # draft, published, closed
    # ... more fields

class Application(Base):
    __tablename__ = "applications"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    job_posting_id = Column(UUID, ForeignKey("job_postings.id"))
    candidate_name = Column(String(255))
    candidate_email = Column(String(255))
    resume_url = Column(String(500))
    status = Column(String(50))  # submitted, screening, interview, offer, rejected
    # ... more fields

class Interview(Base):
    __tablename__ = "interviews"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    application_id = Column(UUID, ForeignKey("applications.id"))
    interviewer_id = Column(UUID)
    scheduled_at = Column(DateTime)
    interview_type = Column(String(50))  # phone, video, onsite
    status = Column(String(50))
    # ... more fields

class OfferLetter(Base):
    __tablename__ = "offer_letters"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    application_id = Column(UUID, ForeignKey("applications.id"))
    offer_details = Column(JSON)
    status = Column(String(50))  # draft, sent, accepted, rejected
    # ... more fields
```

**Endpoints:**
- POST /hr-agent/action (uses AI service)
- POST /hr-agent/policy-guidance (uses AI service)
- POST /hr-agent/auto-fill (uses AI service)
- POST /recruiting/job-postings
- GET /recruiting/job-postings
- POST /recruiting/applications
- GET /recruiting/applications
- POST /recruiting/interviews
- POST /recruiting/offers

**AI Integration:**
```python
from shared_libs.ai.client import get_ai_client

ai_client = get_ai_client()

# HR Agent action
result = await ai_client.process_document(...)

# Policy guidance
result = await ai_client.suggest_soc_code(...)
```

### 3. finance-dashboard-service

**Features to Add:**
- Payroll
- Headcount Planning

**Models Needed:**
```python
class PayrollRun(Base):
    __tablename__ = "payroll_runs"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    run_date = Column(Date)
    pay_period_start = Column(Date)
    pay_period_end = Column(Date)
    status = Column(String(50))  # pending, processing, completed, failed
    total_amount = Column(Numeric)
    # ... more fields

class PayrollEntry(Base):
    __tablename__ = "payroll_entries"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    payroll_run_id = Column(UUID, ForeignKey("payroll_runs.id"))
    employee_id = Column(UUID)
    gross_pay = Column(Numeric)
    deductions = Column(JSON)
    net_pay = Column(Numeric)
    # ... more fields

class HeadcountPlan(Base):
    __tablename__ = "headcount_plans"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    plan_name = Column(String(255))
    fiscal_year = Column(String(10))
    department_id = Column(UUID)
    planned_headcount = Column(Integer)
    budget = Column(Numeric)
    # ... more fields
```

**Endpoints:**
- POST /payroll/run
- GET /payroll/runs
- GET /payroll/employees/{id}
- POST /headcount/plan
- GET /headcount/plans
- GET /headcount/projections

### 4. workflow-service

**Features to Add:**
- Performance Management
- PM Agent

**Models Needed:**
```python
class OKR(Base):
    __tablename__ = "okrs"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    cycle_id = Column(UUID)
    objective = Column(Text)
    key_results = Column(JSON)
    status = Column(String(50))
    # ... more fields

class OneOnOne(Base):
    __tablename__ = "one_on_ones"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    manager_id = Column(UUID)
    scheduled_at = Column(DateTime)
    agenda = Column(Text)
    notes = Column(Text)
    # ... more fields

class Project(Base):
    __tablename__ = "projects"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    name = Column(String(255))
    description = Column(Text)
    status = Column(String(50))
    start_date = Column(Date)
    end_date = Column(Date)
    # ... more fields

class Task(Base):
    __tablename__ = "tasks"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    project_id = Column(UUID, ForeignKey("projects.id"))
    title = Column(String(255))
    assignee_id = Column(UUID)
    status = Column(String(50))
    # ... more fields

class Sprint(Base):
    __tablename__ = "sprints"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    project_id = Column(UUID, ForeignKey("projects.id"))
    name = Column(String(255))
    start_date = Column(Date)
    end_date = Column(Date)
    # ... more fields
```

**Endpoints:**
- POST /performance/okrs
- GET /performance/okrs
- POST /performance/reviews
- POST /performance/one-on-ones
- POST /projects
- GET /projects
- POST /projects/{id}/tasks
- POST /projects/{id}/sprints

### 5. marketing-service

**Features to Add:**
- LMS
- Surveys
- CRM Agent

**Models Needed:**
```python
class Course(Base):
    __tablename__ = "courses"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    title = Column(String(255))
    description = Column(Text)
    category = Column(String(100))
    duration = Column(Integer)  # minutes
    status = Column(String(50))
    # ... more fields

class CourseAssignment(Base):
    __tablename__ = "course_assignments"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    course_id = Column(UUID, ForeignKey("courses.id"))
    employee_id = Column(UUID)
    assigned_at = Column(DateTime)
    completed_at = Column(DateTime, nullable=True)
    status = Column(String(50))
    # ... more fields

class Certificate(Base):
    __tablename__ = "certificates"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    course_id = Column(UUID)
    issued_at = Column(DateTime)
    certificate_url = Column(String(500))
    # ... more fields

class Survey(Base):
    __tablename__ = "surveys"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    title = Column(String(255))
    description = Column(Text)
    questions = Column(JSON)
    status = Column(String(50))
    # ... more fields

class SurveyResponse(Base):
    __tablename__ = "survey_responses"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    survey_id = Column(UUID, ForeignKey("surveys.id"))
    employee_id = Column(UUID)
    responses = Column(JSON)
    submitted_at = Column(DateTime)
    # ... more fields

class CRMContact(Base):
    __tablename__ = "crm_contacts"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    name = Column(String(255))
    email = Column(String(255))
    company = Column(String(255))
    # ... more fields

class CRMLead(Base):
    __tablename__ = "crm_leads"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    contact_id = Column(UUID, ForeignKey("crm_contacts.id"))
    source = Column(String(100))
    status = Column(String(50))
    # ... more fields

class CRMOpportunity(Base):
    __tablename__ = "crm_opportunities"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    lead_id = Column(UUID, ForeignKey("crm_leads.id"))
    value = Column(Numeric)
    stage = Column(String(50))
    # ... more fields
```

**Endpoints:**
- POST /lms/courses
- GET /lms/courses
- POST /lms/assignments
- POST /surveys
- GET /surveys
- POST /surveys/{id}/responses
- POST /crm/contacts
- POST /crm/leads
- POST /crm/opportunities

### 6. timesheet-service

**Features to Add:**
- Time & Attendance

**Models Needed:**
```python
class AttendanceRecord(Base):
    __tablename__ = "attendance_records"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    clock_in = Column(DateTime)
    clock_out = Column(DateTime, nullable=True)
    location = Column(String(255))
    # ... more fields

class Schedule(Base):
    __tablename__ = "schedules"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    start_time = Column(Time)
    end_time = Column(Time)
    day_of_week = Column(Integer)
    # ... more fields

class Shift(Base):
    __tablename__ = "shifts"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    shift_date = Column(Date)
    start_time = Column(Time)
    end_time = Column(Time)
    # ... more fields
```

**Endpoints:**
- POST /attendance/clock-in
- POST /attendance/clock-out
- GET /attendance/records
- POST /schedules
- GET /schedules
- POST /shifts

**AI Integration:**
- POST /timesheets/process-image (uses AI service for timesheet OCR)

### 7. invoice-service

**Features to Add:**
- Expense Management
- Bill Pay
- Travel

**Models Needed:**
```python
class ExpenseClaim(Base):
    __tablename__ = "expense_claims"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    total_amount = Column(Numeric)
    currency = Column(String(10))
    status = Column(String(50))  # draft, submitted, approved, reimbursed
    # ... more fields

class ExpenseReceipt(Base):
    __tablename__ = "expense_receipts"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    expense_claim_id = Column(UUID, ForeignKey("expense_claims.id"))
    receipt_url = Column(String(500))
    amount = Column(Numeric)
    merchant = Column(String(255))
    # ... more fields

class Vendor(Base):
    __tablename__ = "vendors"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    name = Column(String(255))
    contact_info = Column(JSON)
    # ... more fields

class Payable(Base):
    __tablename__ = "payables"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    vendor_id = Column(UUID, ForeignKey("vendors.id"))
    invoice_number = Column(String(100))
    amount = Column(Numeric)
    due_date = Column(Date)
    status = Column(String(50))
    # ... more fields

class TravelRequest(Base):
    __tablename__ = "travel_requests"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    destination = Column(String(255))
    start_date = Column(Date)
    end_date = Column(Date)
    purpose = Column(Text)
    status = Column(String(50))
    # ... more fields
```

**Endpoints:**
- POST /expenses/claims
- GET /expenses/claims
- POST /expenses/{id}/approve
- POST /billpay/vendors
- POST /billpay/invoices
- POST /travel/requests
- GET /travel/requests

**AI Integration:**
- POST /expenses/process-receipt (uses AI service for receipt OCR)

### 8. payment-service

**Features to Add:**
- Corporate Cards

**Models Needed:**
```python
class CorporateCard(Base):
    __tablename__ = "corporate_cards"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    employee_id = Column(UUID)
    card_number = Column(String(50))  # masked
    card_type = Column(String(50))  # virtual, physical
    spending_limit = Column(Numeric)
    merchant_restrictions = Column(JSON)
    status = Column(String(50))
    # ... more fields
```

**Endpoints:**
- POST /corporate-cards
- GET /corporate-cards
- POST /corporate-cards/{id}/limits
- POST /corporate-cards/{id}/merchants

### 9. immigration-service

**Features to Add:**
- Global Contractors
- EOR

**Models Needed:**
```python
class Contractor(Base):
    __tablename__ = "contractors"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    name = Column(String(255))
    country_code = Column(String(3))
    contract_type = Column(String(50))
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)
    # ... more fields

class EORWorkflow(Base):
    __tablename__ = "eor_workflows"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    contractor_id = Column(UUID, ForeignKey("contractors.id"))
    country_code = Column(String(3))
    status = Column(String(50))
    # ... more fields

class GlobalPayout(Base):
    __tablename__ = "global_payouts"
    id = Column(UUID, primary_key=True)
    tenant_id = Column(UUID, nullable=False)
    contractor_id = Column(UUID, ForeignKey("contractors.id"))
    amount = Column(Numeric)
    currency = Column(String(10))
    payout_date = Column(Date)
    status = Column(String(50))
    # ... more fields
```

**Endpoints:**
- POST /contractors
- GET /contractors
- POST /eor/workflows
- POST /eor/payouts

## Implementation Checklist

For each service, implement in this order:

1. ✅ **Models** - Add database models to `db_models.py`
2. ✅ **Schemas** - Add request/response schemas
3. ✅ **Repository** - Add CRUD methods
4. ✅ **Business Service** - Add business logic + event publishing
5. ✅ **API Routes** - Add REST endpoints
6. ✅ **Event Producer** - Create/update event producer
7. ✅ **Update API Gateway** - Add routes to gateway if needed

## Event Publishing Pattern

```python
from shared_libs.models.enums import EventType
from shared_libs.schemas.events import EventEnvelope

event = EventEnvelope(
    event_type=EventType.YOUR_EVENT_TYPE,
    tenant_id=tenant_id,
    payload={"key": "value"}
)
await self.event_producer.publish(event)
```

## AI Integration Pattern

```python
from shared_libs.ai.client import get_ai_client

ai_client = get_ai_client()

# For document processing
result = await ai_client.extract_document(content, filename)

# For form auto-fill
result = await ai_client.process_i9(content, filename)

# For policy guidance
result = await ai_client.suggest_soc_code(job_title, job_description)
```

## Next Steps

1. Follow the organization-service pattern
2. Implement each service systematically
3. Test endpoints after each service
4. Update API Gateway routes
5. Update frontend API clients

---

**Reference**: See `saas-backend/organization-service/` for complete implementation example.

