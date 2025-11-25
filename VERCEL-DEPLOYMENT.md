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

```
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.com
```

## Build Issues

If you encounter build errors related to local packages (`@xerobookz/ui-shared`, `@xerobookz/api-clients`):

1. These are local file dependencies that need to be built first
2. You may need to:
   - Build `ui-shared` and `api-clients` before building the Next.js app
   - Or publish them as npm packages
   - Or use Vercel's monorepo support with proper build order

## Quick Fix for Current Deployment

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General**
3. Find **Root Directory** field
4. Set it to: `xerobookz-frontend/admin-web`
5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on the latest deployment

This should fix the 404 error immediately.

