# 🚀 XeroBookz Enterprise Upgrade - Implementation Plan

> **Note**: For current status and progress, see `ENTERPRISE-UPGRADE.md`

## Overview
This document outlines the comprehensive enterprise upgrade to add HR, Payroll, Finance, IT, Performance, CRM, Recruiting, and Global HR features to XeroBookz by extending existing microservices.

## Implementation Status

### ✅ Phase 1: Foundation (IN PROGRESS)
- [x] Extended EventType enum with enterprise events
- [x] Extended UserRole enum with enterprise roles
- [x] Extended DocumentType enum
- [x] Added new enums (PayrollStatus, ExpenseStatus, ApplicationStatus, PerformanceReviewStatus)
- [x] Extended employee-service models with HRIS fields
- [x] Added CompensationBand, EmployeeCompensation, EmployeeBenefit models
- [x] Added EmployeePerformanceReview, EmployeeGlobalProfile models
- [x] Added EmployeeSkill, EmploymentHistory, JobArchitecture models

### ✅ Phase 2: Employee Service Extensions (COMPLETE)
- [x] Add new request/response schemas for HRIS features
- [x] Extend API routes with new endpoints
- [x] Extend repository methods
- [x] Extend business service methods
- [x] Add event producers for new events

### ✅ Phase 3: Other Service Extensions (COMPLETE)
- [x] organization-service: Benefits Admin, ITSM Agent ✅
- [x] onboarding-service: Core HR Agent, Recruiting ✅
- [x] finance-dashboard-service: Payroll, Headcount Planning ✅
- [x] workflow-service: Performance Management, PM Agent ✅
- [x] marketing-service: LMS, Surveys, CRM Agent ✅
- [x] timesheet-service: Time & Attendance ✅
- [x] invoice-service: Expense Management, Bill Pay, Travel ✅
- [x] payment-service: Corporate Cards ✅
- [x] immigration-service: Global Contractors + EOR ✅

### ✅ Phase 4: Frontend Updates (COMPLETE)
- [x] admin-web: Enterprise configuration pages ✅
- [x] employer-web: Recruiting, Performance, HRIS, Surveys, LMS, Expenses ✅
- [x] ess-web: Performance reviews, Surveys, Learning, Global profile, Travel & expenses ✅
- [x] Mobile app: LMS, Surveys, Clock-in/out, Performance check-ins (Requirements documented) ✅

### ✅ Phase 5: Shared Libraries (COMPLETE)
- [x] Add new schemas for all enterprise features ✅
- [x] Update API client packages ✅
- [x] Add new UI components ✅

## Service Extension Details

### 1. employee-service Extensions
**New Models Added:**
- CompensationBand
- EmployeeCompensation
- EmployeeBenefit
- EmployeePerformanceReview
- EmployeeGlobalProfile
- EmployeeSkill
- EmploymentHistory
- JobArchitecture

**New Endpoints to Add:**
- POST /employees/{id}/compensation
- GET /employees/{id}/compensation
- GET /employees/{id}/compensation/bands
- POST /employees/{id}/benefits
- GET /employees/{id}/benefits
- POST /employees/{id}/performance-reviews
- GET /employees/{id}/performance-reviews
- POST /employees/{id}/skills
- GET /employees/{id}/skills
- GET /employees/{id}/global-profile
- POST /employees/{id}/global-profile
- GET /employees/{id}/employment-history
- POST /employees/{id}/employment-history
- GET /compensation-bands
- POST /compensation-bands
- GET /job-architecture
- POST /job-architecture

### 2. organization-service Extensions
**New Features:**
- Benefits Admin (plans, enrollment, eligibility, dependents)
- ITSM Agent (IT service requests, identity requests, approval flows)

**New Endpoints:**
- POST /benefits/plans
- GET /benefits/plans
- POST /benefits/enrollments
- GET /benefits/enrollments
- POST /it/tickets
- GET /it/tickets
- POST /it/identity-requests

### 3. onboarding-service Extensions
**New Features:**
- Core HR Agent (AI actions, policy guidance, form auto-fill)
- Recruiting (ATS, job postings, interviews, offer letters)

**New Endpoints:**
- POST /hr-agent/action
- POST /hr-agent/policy-guidance
- POST /hr-agent/auto-fill
- POST /recruiting/job-postings
- GET /recruiting/job-postings
- POST /recruiting/applications
- GET /recruiting/applications
- POST /recruiting/interviews
- POST /recruiting/offers

### 4. finance-dashboard-service Extensions
**New Features:**
- Payroll (US/global calculations, pay cycles, deductions, tax computation)
- Headcount Planning (workforce projections, budget planning, hiring plans)

**New Endpoints:**
- POST /payroll/run
- GET /payroll/runs
- GET /payroll/employees/{id}
- POST /headcount/plan
- GET /headcount/plans
- GET /headcount/projections

### 5. workflow-service Extensions
**New Features:**
- Performance Management (OKRs, reviews, 1:1s, feedback cycles)
- PM Agent (projects, tasks, sprints, milestones)

**New Endpoints:**
- POST /performance/okrs
- GET /performance/okrs
- POST /performance/reviews
- POST /performance/one-on-ones
- POST /projects
- GET /projects
- POST /projects/{id}/tasks
- POST /projects/{id}/sprints

### 6. marketing-service Extensions
**New Features:**
- LMS (courses, learning paths, certificates)
- Surveys (builder, templates, analytics)
- CRM Agent (contacts, leads, opportunities)

**New Endpoints:**
- POST /lms/courses
- GET /lms/courses
- POST /lms/assignments
- POST /surveys
- GET /surveys
- POST /surveys/{id}/responses
- POST /crm/contacts
- POST /crm/leads
- POST /crm/opportunities

### 7. timesheet-service Extensions
**New Features:**
- Time & Attendance (clock-in/out, schedules, overtime, shifts)

**New Endpoints:**
- POST /attendance/clock-in
- POST /attendance/clock-out
- GET /attendance/records
- POST /schedules
- GET /schedules
- POST /shifts

### 8. invoice-service Extensions
**New Features:**
- Expense Management (claims, receipts, reimbursements)
- Bill Pay (vendors, payables, remittances)
- Travel (requests, approvals, per diem)

**New Endpoints:**
- POST /expenses/claims
- GET /expenses/claims
- POST /expenses/{id}/approve
- POST /billpay/vendors
- POST /billpay/invoices
- POST /travel/requests
- GET /travel/requests

### 9. payment-service Extensions
**New Features:**
- Corporate Cards (virtual cards, spending limits, merchant controls)

**New Endpoints:**
- POST /corporate-cards
- GET /corporate-cards
- POST /corporate-cards/{id}/limits
- POST /corporate-cards/{id}/merchants

### 10. immigration-service Extensions
**New Features:**
- Global Contractors + EOR (contractor records, EOR workflows, global payouts)

**New Endpoints:**
- POST /contractors
- GET /contractors
- POST /eor/workflows
- POST /eor/payouts

## Database Schema Changes

### PostgreSQL Tables to Add
1. compensation_bands
2. employee_compensation
3. employee_benefits
4. employee_performance_reviews
5. employee_global_profiles
6. employee_skills
7. employment_history
8. job_architecture
9. benefit_plans
10. benefit_enrollments
11. it_tickets
12. job_postings
13. applications
14. interviews
15. offer_letters
16. payroll_runs
17. payroll_entries
18. headcount_plans
19. okrs
20. one_on_ones
21. projects
22. tasks
23. sprints
24. courses
25. course_assignments
26. certificates
27. surveys
28. survey_responses
29. crm_contacts
30. crm_leads
31. crm_opportunities
32. attendance_records
33. schedules
34. shifts
35. expense_claims
36. expense_receipts
37. vendors
38. payables
39. travel_requests
40. corporate_cards
41. contractors
42. eor_workflows

### MongoDB Collections to Add
- hr_documents
- performance_review_documents
- offer_letters
- certificates
- expense_receipts
- learning_materials
- survey_responses_data

## Frontend Pages to Add

### admin-web
- /hris/configuration
- /compensation/bands
- /payroll/configuration
- /global-hr/rules
- /benefits/plans
- /it/tickets
- /recruiting/jobs
- /performance/cycles
- /lms/courses
- /surveys/templates

### employer-web
- /recruiting/dashboard
- /recruiting/jobs
- /recruiting/applications
- /performance/dashboard
- /performance/reviews
- /hris/employees
- /surveys/dashboard
- /lms/portal
- /expenses/management
- /attendance/dashboard

### ess-web
- /performance/my-reviews
- /performance/okrs
- /surveys/my-surveys
- /learning/my-courses
- /profile/global
- /travel/requests
- /expenses/my-claims
- /attendance/clock

## Mobile App Screens to Add
- LMS Course View
- Survey Response
- Clock In/Out
- Performance Check-ins
- Expense Submission
- Travel Request

## Next Steps
1. Complete employee-service extensions (schemas, routes, services)
2. Extend organization-service
3. Extend onboarding-service
4. Extend finance-dashboard-service
5. Extend workflow-service
6. Extend marketing-service
7. Extend timesheet-service
8. Extend invoice-service
9. Extend payment-service
10. Extend immigration-service
11. Update all frontend portals
12. Update mobile app
13. Update shared-libs and API clients

