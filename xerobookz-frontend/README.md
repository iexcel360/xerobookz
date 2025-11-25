# XeroBookz Frontend Ecosystem

Complete frontend architecture for XeroBookz SaaS platform.

## Structure

```
xerobookz-frontend/
├── admin-web/          # Super admin portal (Next.js)
├── employer-web/       # HR/Employer portal (Next.js)
├── ess-web/           # Employee self-service web (Next.js)
├── ui-shared/          # Shared UI components
└── api-clients/        # Shared API client package

xerobookz-mobile/
└── ess-mobile/         # Employee self-service mobile (React Native + Expo)
```

## Shared Packages

### ui-shared
Reusable UI components used across all web apps:
- Button, Card, Table, Input, Modal
- Sidebar, TopNav, DataGrid
- Badge, Chip, Tag, Pagination
- Skeleton loaders
- Tenant selector, User avatar
- XeroBookz logo component

### api-clients
Centralized API client with:
- Axios instance with interceptors
- JWT token management
- Tenant header injection
- React Query hooks for all services
- Type-safe API calls

## Web Apps

### Admin Web
Super admin portal for:
- Tenant management
- User management
- System health monitoring
- Audit log viewer

### Employer Web
HR/Employer portal for:
- Employee management
- I-9 & E-Verify
- PAF automation
- Immigration cases
- Timesheets & Leave
- Safety compliance
- Finance dashboard

### ESS Web
Employee self-service web for:
- My documents
- My profile
- My timesheets
- My leave requests
- Immigration status

## Mobile App

### ESS Mobile
React Native + Expo app for employees:
- Login with tenant code
- Dashboard with alerts
- Document scanner & viewer
- Timesheet submission
- Leave requests
- Immigration status

## Getting Started

### Install Dependencies

```bash
# Install shared packages
cd ui-shared && npm install && npm run build
cd ../api-clients && npm install && npm run build

# Install web apps
cd ../admin-web && npm install
cd ../employer-web && npm install
cd ../ess-web && npm install

# Install mobile app
cd ../../xerobookz-mobile/ess-mobile && npm install
```

### Run Development Servers

```bash
# Admin web
cd xerobookz-frontend/admin-web && npm run dev

# Employer web
cd xerobookz-frontend/employer-web && npm run dev

# ESS web
cd xerobookz-frontend/ess-web && npm run dev

# Mobile app
cd xerobookz-mobile/ess-mobile && npm start
```

## Environment Variables

Each app needs:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Features

- ✅ Multi-tenancy support
- ✅ JWT authentication
- ✅ React Query for data fetching
- ✅ Zustand for state management
- ✅ TypeScript throughout
- ✅ TailwindCSS styling
- ✅ Responsive design
- ✅ XeroBookz branding

## License

Proprietary - XeroBookz

