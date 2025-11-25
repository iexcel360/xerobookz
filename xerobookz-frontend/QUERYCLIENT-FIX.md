# QueryClient Error Fix

## Issue
Error: "No QueryClient set, use QueryClientProvider to set one"

## Root Cause
React Query hooks (`useApiMutation`, `useApiQuery`) were being called before `QueryClientProvider` was available, especially during SSR or in components not properly wrapped.

## Fixes Applied

### 1. Fixed Login Pages
Changed all login pages to use `authApi.login()` directly instead of `useLogin()` hook:
- ✅ `admin-web/app/login/page.tsx`
- ✅ `employer-web/app/login/page.tsx`
- ✅ `ess-web/app/login/page.tsx`

### 2. Fixed System Page
Changed `admin-web/app/system/page.tsx` to use `apiClient.get()` directly with `useEffect` instead of `useApiQuery` hook.

### 3. Updated Providers
Enhanced `Providers` component in all apps to handle SSR:
- Server-side: Creates new QueryClient for each request
- Client-side: Uses singleton pattern to maintain same QueryClient

### 4. Updated api-clients Package
- Moved `@tanstack/react-query` from `dependencies` to `peerDependencies`
- Ensures all apps use the same React Query instance

## Pages Still Using React Query Hooks (Should Work)

These pages use hooks but should work because they're:
- Protected pages (require authentication)
- Wrapped by Providers in layout
- Client-side only ("use client")

If errors occur, convert them to use API clients directly:
- `ess-web/app/timesheets/page.tsx` - uses `useGetTimesheets()`
- `ess-web/app/documents/page.tsx` - uses `useGetEmployeeDocuments()`
- `employer-web/app/employees/page.tsx` - uses `useGetEmployees()`
- `employer-web/app/dashboard/page.tsx` - uses `useGetEmployees()`

## Testing
1. ✅ Admin login page - Fixed
2. ✅ Employer login page - Fixed
3. ✅ ESS login page - Fixed
4. ✅ System page - Fixed

## Next Steps
If you encounter QueryClient errors on other pages:
1. Check if the page is wrapped by Providers (should be in layout.tsx)
2. If still failing, convert to use API clients directly instead of hooks
3. Example pattern:
   ```tsx
   // Instead of:
   const { data } = useGetEmployees();
   
   // Use:
   const [data, setData] = useState(null);
   useEffect(() => {
     employeeApi.getEmployees().then(result => {
       if (result.success) setData(result.data);
     });
   }, []);
   ```

