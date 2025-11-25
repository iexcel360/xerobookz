# 🏠 Unified Home Page Setup

## Overview

XeroBookz now has a **single unified home page** that serves as the main entry point for all three portals. Users access all portals from one central location.

## Architecture

### Main Home Page
- **Location**: `admin-web/app/page.tsx` (Port 3000)
- **URL**: `http://localhost:3000`
- **Purpose**: Central entry point with portal selection

### Portal Redirects
- **Employer Web** (`localhost:3001`) → Redirects to main home page
- **ESS Web** (`localhost:3002`) → Redirects to main home page

## User Flow

```
User visits any portal (3000, 3001, or 3002)
         ↓
    Main Home Page (localhost:3000)
         ↓
    Choose Portal Section
         ↓
    ┌────┴────┬─────────────┐
    ↓         ↓             ↓
Admin    Employer      Employee
Portal   Portal        Portal
(3000)   (3001)        (3002)
```

## Features

### 1. Hero Section
- Animated typewriter title switching
- Gradient background
- Primary and secondary action buttons
- Smooth scroll to sections

### 2. Portal Selection
Three portal cards with:
- **Admin Portal** (Port 3000)
  - Manage tenants, users, system configuration
  - Direct link to `/login`
  
- **Employer Portal** (Port 3001)
  - HR management, compliance, employee oversight
  - Link to `http://localhost:3001/login`
  
- **Employee Portal** (Port 3002)
  - Self-service access to documents
  - Link to `http://localhost:3002/login`

### 3. Features Section
- I-9 Compliance
- Immigration Management
- Employee Onboarding
- Document Management
- Timesheets & Leave
- PAF Automation

### 4. Key Capabilities
- Electronic Form I-9 & E-Verify
- Immigration Case Management
- Public Access File Automation
- Employee Self Service

## Navigation

### From Home Page
- Click any portal card → Navigate to that portal's login page
- "Sign In" button in nav → Goes to Admin login (default)
- "Back to Home" on login pages → Returns to main home

### From Login Pages
- "← Back to Home" button → Returns to main home page
- Admin login → Back to `localhost:3000`
- Employer/ESS login → Back to `localhost:3000`

## Implementation Details

### Main Home Page (`admin-web/app/page.tsx`)
- Full-featured landing page
- Portal selection cards
- Features and capabilities sections
- Modern UI with glassmorphism and gradients

### Redirect Pages (`employer-web/app/page.tsx` & `ess-web/app/page.tsx`)
- Simple redirect to `localhost:3000`
- Loading spinner during redirect
- Smooth user experience

### Login Pages
- All login pages have "Back to Home" button
- Maintains portal-specific branding
- Consistent navigation experience

## Benefits

✅ **Single Entry Point** - One place to access all portals  
✅ **Better UX** - Clear portal selection  
✅ **Consistent Navigation** - Easy to return to home  
✅ **Modern Design** - Unified visual experience  
✅ **Scalable** - Easy to add more portals  

## Access Points

- **Main Home**: `http://localhost:3000`
- **Admin Login**: `http://localhost:3000/login`
- **Employer Login**: `http://localhost:3001/login`
- **Employee Login**: `http://localhost:3002/login`

All portals are accessible from the unified home page!

