# Vercel Deployment Guide

## Issue: 404 Error on Vercel

The 404 error occurs because Vercel is trying to deploy from the root directory, but the Next.js applications are in subdirectories.

## Solution Options

### Option 1: Deploy Each App Separately (Recommended)

Deploy each frontend app as a separate Vercel project:

#### For Admin Web:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `iexcel360/xerobookz`
4. **Important**: Set the **Root Directory** to: `xerobookz-frontend/admin-web`
5. Framework Preset: **Next.js** (auto-detected)
6. Build Command: `npm run build` (default)
7. Output Directory: `.next` (default)
8. Install Command: `npm install` (default)
9. Click "Deploy"

#### For Employer Web:
- Repeat steps above, but set Root Directory to: `xerobookz-frontend/employer-web`

#### For ESS Web:
- Repeat steps above, but set Root Directory to: `xerobookz-frontend/ess-web`

### Option 2: Use Vercel Monorepo Support

If you want to deploy from the root with a single project:

1. In Vercel Dashboard → Project Settings → General
2. Set **Root Directory** to: `xerobookz-frontend/admin-web`
3. Redeploy

### Option 3: Update vercel.json (Current Setup)

The `vercel.json` file has been created at the root. However, you still need to:

1. Go to Vercel Dashboard → Project Settings → General
2. Set **Root Directory** to: `xerobookz-frontend/admin-web`
3. Or delete `vercel.json` and use Option 1 or 2

## Environment Variables

Make sure to add these environment variables in Vercel Dashboard → Settings → Environment Variables:

### Required Environment Variables

#### 1. `NEXT_PUBLIC_API_URL` (Required)
- **Description**: The base URL for the API Gateway/Backend services
- **Local Development**: `http://localhost:8000`
- **Production Example**: `https://api.xerobookz.com` or `https://your-api-gateway-url.com`
- **Where to add**: Vercel Dashboard → Project Settings → Environment Variables
- **For all environments**: Production, Preview, Development

**Example:**
```
NEXT_PUBLIC_API_URL=https://api.xerobookz.com
```

### Optional Environment Variables

#### 2. `NEXT_PUBLIC_APP_ENV` (Optional)
- **Description**: Application environment identifier
- **Values**: `development`, `staging`, `production`
- **Default**: `production` (if not set)

**Example:**
```
NEXT_PUBLIC_APP_ENV=production
```

#### 3. `NEXT_PUBLIC_APP_NAME` (Optional)
- **Description**: Application name for branding
- **Default**: `XeroBookz`

**Example:**
```
NEXT_PUBLIC_APP_NAME=XeroBookz
```

### How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter the variable name (e.g., `NEXT_PUBLIC_API_URL`)
5. Enter the variable value (e.g., `https://api.xerobookz.com`)
6. Select which environments to apply to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
7. Click **Save**

### Important Notes

- **`NEXT_PUBLIC_` prefix**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Only use this prefix for variables that are safe to expose publicly.
- **API URL**: Make sure your API Gateway is accessible from the internet and has CORS configured to allow requests from your Vercel domain.
- **After adding variables**: You need to **redeploy** your application for the changes to take effect.

### Environment-Specific Configuration

You can set different values for different environments:

- **Production**: Use your production API URL
- **Preview**: Use your staging API URL (if you have one)
- **Development**: Use `http://localhost:8000` (for local testing only)

### Example Configuration

For a production deployment:
```
NEXT_PUBLIC_API_URL=https://api.xerobookz.com
NEXT_PUBLIC_APP_ENV=production
```

For a staging/preview deployment:
```
NEXT_PUBLIC_API_URL=https://staging-api.xerobookz.com
NEXT_PUBLIC_APP_ENV=staging
```

## Build Issues

### Issue: Module Not Found Errors

If you encounter build errors like:
- `Module not found: Can't resolve '@xerobookz/ui-shared'`
- `Module not found: Can't resolve '@xerobookz/api-clients'`
- `Error: Cannot find module 'tailwindcss'`

**Solution**: The `vercel.json` has been configured to build shared packages first. Make sure:

1. **Root Directory is set correctly** in Vercel Dashboard:
   - Go to Settings → General
   - Set **Root Directory** to: `xerobookz-frontend/admin-web`

2. **Build Command** (already configured in `vercel.json`):
   ```json
   "buildCommand": "cd xerobookz-frontend/ui-shared && npm ci && npm run build && cd ../api-clients && npm ci && npm run build && cd ../admin-web && npm ci && npm run build"
   ```

3. **If build still fails**, try:
   - Clear Vercel build cache
   - Make sure `package-lock.json` files exist in all packages
   - Check that TypeScript compilation succeeds for shared packages

### Issue: TailwindCSS Not Found

If you see `Error: Cannot find module 'tailwindcss'`:

1. TailwindCSS is in `devDependencies` which should be installed
2. Make sure the build command installs dependencies with `npm ci` (not `npm install --production`)
3. The `vercel.json` build command handles this automatically

### Issue: Path Alias Errors (`@/hooks/useAuth`)

If you see `Module not found: Can't resolve '@/hooks/useAuth'`:

1. The `tsconfig.json` has the path alias configured: `"@/*": ["./*"]`
2. Make sure the `hooks` directory exists in `xerobookz-frontend/admin-web/hooks/`
3. This should work automatically with the current configuration

## Quick Fix for Current Deployment

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General**
3. Find **Root Directory** field
4. Set it to: `xerobookz-frontend/admin-web`
5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on the latest deployment

This should fix the 404 error immediately.

