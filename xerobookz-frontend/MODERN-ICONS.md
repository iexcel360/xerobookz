# 🎨 Modern Icon System

## Overview

All emoji icons have been replaced with professional, modern **Lucide React** icons throughout the XeroBookz platform. The new icon system provides:

- ✅ **Consistent Visual Design** - All icons follow the same design language
- ✅ **Scalable Vector Graphics** - Crisp at any size
- ✅ **Customizable** - Variants, colors, sizes, and gradients
- ✅ **Smooth Animations** - Hover effects and transitions
- ✅ **Accessibility** - Proper semantic meaning

## Icon Components

### 1. `Icon` Component
Basic icon component with variants and styling options.

```tsx
import { Icon } from "@xerobookz/ui-shared";

<Icon 
  name="file-check" 
  size={24} 
  variant="primary" 
  strokeWidth={2}
/>
```

**Props:**
- `name`: Icon name (see available icons below)
- `size`: Number or string (default: 24)
- `variant`: "default" | "primary" | "accent" | "secondary" | "gradient"
- `strokeWidth`: Number (default: 2)
- `className`: Additional CSS classes

### 2. `IconBox` Component
Icon wrapped in a styled container with gradient backgrounds.

```tsx
import { IconBox } from "@xerobookz/ui-shared";

<IconBox
  icon="file-check"
  size="lg"
  variant="primary"
  gradient
/>
```

**Props:**
- `icon`: Icon name
- `size`: "sm" | "md" | "lg" | "xl"
- `variant`: Color variant
- `gradient`: Boolean for gradient background
- `className`: Additional CSS classes

## Available Icons

### Document & File Icons
- `file-text` - General documents
- `file-check` - Verified/completed documents
- `files` - Multiple documents
- `folder` - Folders/directories

### User & People Icons
- `user` - Single user
- `users` - Multiple users
- `user-plus` - Add user
- `user-circle` - User profile
- `user-cog` - User settings

### Business & Organization
- `building` - Building/office
- `building2` - Alternative building icon
- `briefcase` - Business/work
- `shield` - Security/protection

### Time & Calendar
- `clock` - Time/timesheets
- `calendar` - Calendar/dates
- `timer` - Timer/deadlines

### Actions & Status
- `zap` - Lightning/automation
- `check-circle` - Success/completed
- `alert-circle` - Warning/alert
- `sparkles` - Special features
- `rocket` - Launch/start
- `plane` - Travel/immigration

### System & Settings
- `settings` - Configuration
- `globe` - Global/worldwide

## Icon Mapping (Old → New)

| Old Emoji | New Icon | Usage |
|-----------|----------|-------|
| 📋 | `file-check` | I-9 Compliance |
| 🌐 | `plane` | Immigration Management |
| 👥 | `user-plus` | Employee Onboarding |
| 📄 | `files` | Document Management |
| ⏰ | `clock` | Timesheets & Leave |
| ⚡ | `zap` | PAF Automation |
| 👨‍💼 | `shield` | Admin Portal |
| 🏢 | `building2` | Employer Portal |
| 👤 | `user-circle` | Employee Portal |

## Usage Examples

### In Feature Cards
```tsx
<Card variant="glass" hover className="p-8 group">
  <div className="flex justify-center mb-6">
    <IconBox
      icon="file-check"
      size="lg"
      variant="primary"
      gradient
      className="group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
    />
  </div>
  <h3 className="text-xl font-bold text-secondary-700 mb-3">
    I-9 Compliance
  </h3>
  <p className="text-grey-600">{description}</p>
</Card>
```

### In Sidebar Navigation
```tsx
const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: "briefcase" },
  { label: "Employees", href: "/employees", icon: "users" },
  { label: "I-9", href: "/i9", icon: "file-check" },
];
```

### In Buttons
```tsx
<Button variant="gradient">
  <Icon name="user-plus" size={18} className="mr-2" />
  Add Employee
</Button>
```

### In Service Cards
```tsx
<Card variant="floating" hover className="p-6 group">
  <div className="flex items-start justify-between mb-4">
    <IconBox
      icon="shield"
      size="md"
      variant="primary"
      gradient
      className="group-hover:scale-110 transition-transform duration-300"
    />
    <Badge variant="success">Active</Badge>
  </div>
  <h3 className="text-lg font-bold">{serviceName}</h3>
</Card>
```

## Styling & Animations

### Hover Effects
Icons automatically scale and rotate on hover when used with `group` classes:

```tsx
<div className="group">
  <IconBox 
    icon="file-check" 
    className="group-hover:scale-110 group-hover:rotate-3"
  />
</div>
```

### Gradient Icons
Use the `gradient` prop on `IconBox` for gradient backgrounds:

```tsx
<IconBox 
  icon="zap" 
  variant="primary" 
  gradient 
/>
```

### Color Variants
- `default` - Secondary grey
- `primary` - Primary blue
- `accent` - Accent green
- `secondary` - Secondary dark
- `gradient` - Gradient text effect

## Benefits Over Emojis

1. **Consistency** - All icons follow the same design system
2. **Scalability** - Vector graphics scale perfectly
3. **Customization** - Easy to change colors, sizes, and styles
4. **Performance** - Lightweight SVG icons
5. **Accessibility** - Better screen reader support
6. **Professional** - Enterprise-grade appearance
7. **Animations** - Smooth hover and transition effects

## Files Updated

- ✅ `ui-shared/src/components/Icon.tsx` - Icon component
- ✅ `ui-shared/src/components/IconBox.tsx` - IconBox component
- ✅ `admin-web/app/page.tsx` - Home page
- ✅ `admin-web/app/system/page.tsx` - System dashboard
- ✅ `admin-web/app/tenants/page.tsx` - Tenants page
- ✅ `admin-web/app/users/page.tsx` - Users page
- ✅ `admin-web/app/audit/page.tsx` - Audit page
- ✅ `employer-web/app/dashboard/page.tsx` - Employer dashboard
- ✅ `employer-web/app/employees/page.tsx` - Employees page
- ✅ `ess-web/app/dashboard/page.tsx` - ESS dashboard
- ✅ `ess-web/app/documents/page.tsx` - Documents page
- ✅ `ess-web/app/timesheets/page.tsx` - Timesheets page
- ✅ `ui-shared/src/components/Sidebar.tsx` - Sidebar navigation

All icons are now modern, professional, and visually consistent! 🎉

