# 📱 XeroBookz Mobile App - Enterprise Features

## Overview
This document outlines the mobile app requirements for enterprise features including LMS, Surveys, Clock-in/out, and Performance check-ins.

## Required Features

### 1. Learning Management System (LMS)
**Screens Needed:**
- **Course List View**
  - Display assigned courses
  - Show progress for each course
  - Filter by category, status (assigned, in-progress, completed)
  - Search functionality

- **Course Detail View**
  - Course title, description, duration
  - Progress indicator
  - Learning materials (videos, documents, quizzes)
  - Mark as complete functionality
  - Certificate download (when completed)

- **My Certificates**
  - List of completed courses with certificates
  - Download/view certificate PDFs

**API Endpoints:**
- `GET /marketing/lms/courses` - List courses
- `GET /marketing/lms/courses/{id}` - Course details
- `POST /marketing/lms/assignments` - Enroll in course
- `GET /marketing/lms/certificates` - Get certificates

### 2. Surveys
**Screens Needed:**
- **Survey List View**
  - Display assigned surveys
  - Show due dates
  - Status indicators (pending, completed)
  - Filter by status

- **Survey Response View**
  - Display survey questions
  - Support multiple question types:
    - Multiple choice
    - Single choice
    - Text input
    - Rating scale
    - Yes/No
  - Save draft functionality
  - Submit survey
  - Confirmation screen after submission

**API Endpoints:**
- `GET /marketing/surveys` - List surveys
- `GET /marketing/surveys/{id}` - Survey details
- `POST /marketing/surveys/{id}/responses` - Submit response

### 3. Clock In/Out
**Screens Needed:**
- **Clock In/Out Main Screen**
  - Large clock display with current time
  - Current location display (GPS-based)
  - Clock In button (when clocked out)
  - Clock Out button (when clocked in)
  - Current status indicator
  - Today's hours worked display

- **Attendance History**
  - List of clock in/out records
  - Date, time, location for each record
  - Hours worked per day
  - Weekly/monthly summary

- **Schedule View**
  - Weekly schedule display
  - Upcoming shifts
  - Shift details (start time, end time, break duration)

**API Endpoints:**
- `POST /timesheet/attendance/clock-in` - Clock in
- `POST /timesheet/attendance/clock-out` - Clock out
- `GET /timesheet/attendance/records` - Get attendance history
- `GET /timesheet/schedules` - Get schedules

### 4. Performance Check-ins
**Screens Needed:**
- **OKR Dashboard**
  - List of active OKRs
  - Progress indicators for each OKR
  - Add/update OKR progress
  - Key results tracking

- **Performance Review View**
  - Current review cycle information
  - Review status (pending, in-progress, completed)
  - Self-assessment form
  - View manager feedback
  - Submit review

- **1:1 Meeting Notes**
  - List of scheduled 1:1s
  - Add notes/agenda items
  - View past meeting notes

**API Endpoints:**
- `GET /workflow/performance/okrs` - Get OKRs
- `POST /workflow/performance/okrs` - Create/update OKR
- `GET /workflow/performance/reviews` - Get reviews
- `POST /workflow/performance/one-on-ones` - Schedule 1:1

## Technical Requirements

### Platform Support
- **iOS**: Native Swift/SwiftUI or React Native
- **Android**: Native Kotlin/Java or React Native
- **Recommended**: React Native for cross-platform development

### Authentication
- JWT token-based authentication
- Biometric authentication (Face ID, Touch ID, Fingerprint)
- Secure token storage

### Offline Support
- Cache course content for offline viewing
- Queue survey responses for submission when online
- Store clock in/out records locally, sync when online

### Push Notifications
- Survey assignment notifications
- Course assignment notifications
- Performance review reminders
- Clock in/out reminders

### Permissions Required
- **Location**: For clock in/out location tracking
- **Camera**: For receipt scanning in expense claims
- **Storage**: For downloading course materials and certificates
- **Notifications**: For push notifications

## UI/UX Guidelines

### Design Principles
- Follow XeroBookz brand colors and design system
- Consistent navigation patterns
- Touch-friendly interface (minimum 44x44pt touch targets)
- Support for dark mode
- Accessibility compliance (WCAG 2.1 AA)

### Navigation Structure
```
Main Tab Bar:
- Home (Dashboard)
- Learning (LMS)
- Surveys
- Attendance (Clock In/Out)
- Performance
- Profile
```

### Key Interactions
- **Swipe gestures**: For navigating between screens
- **Pull to refresh**: For updating data
- **Long press**: For quick actions
- **Haptic feedback**: For important actions (clock in/out)

## Implementation Priority

### Phase 1 (MVP)
1. Clock In/Out functionality
2. Basic survey response
3. Course list and viewing

### Phase 2
1. Full LMS features (certificates, progress tracking)
2. Performance check-ins (OKRs, reviews)
3. Attendance history and schedules

### Phase 3
1. Offline support
2. Push notifications
3. Advanced features (receipt scanning, location tracking)

## API Integration

All mobile app features should integrate with the existing backend services:
- `marketing-service` for LMS and Surveys
- `timesheet-service` for Clock In/Out
- `workflow-service` for Performance features
- `employee-service` for profile data

## Testing Requirements

- Unit tests for business logic
- Integration tests for API calls
- E2E tests for critical user flows
- Performance testing for offline scenarios
- Security testing for authentication and data storage

## Deployment

- **App Stores**: iOS App Store and Google Play Store
- **Beta Testing**: TestFlight (iOS) and Google Play Beta (Android)
- **Version Management**: Semantic versioning
- **Update Strategy**: Over-the-air updates for React Native apps

---

**Status**: Requirements documented, ready for mobile app development team

