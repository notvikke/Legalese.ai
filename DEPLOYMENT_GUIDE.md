# Complete Vercel Deployment Guide

## 🎯 Overview
Your Legalese.ai app has both a **frontend** (Next.js) and **backend** (FastAPI). Both need to be deployed separately on Vercel.

---

## 📋 Prerequisites Checklist

- [ ] Vercel account created
- [ ] GitHub repository with your code
- [ ] Supabase database connection pooler URL
- [ ] All API keys ready (Clerk, Dodo Payments, Hugging Face)

---

## Part 1: Deploy Backend to Vercel

### Step 1: Push Your Code to GitHub

```powershell
cd d:\Legalese.ai
git add .
git commit -m "Fixed database connection and API configuration for Vercel"
git push origin main
```

### Step 2: Create Backend Project on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **Important**: Set the **Root Directory** to `backend`
4. Framework Preset: **Other**
5. Click **Deploy** (it will fail first, that's okay)

### Step 3: Configure Backend Environment Variables

Go to your backend project → **Settings** → **Environment Variables** and add:

| Variable Name | Value |
|--------------|-------|
| `DATABASE_URL` | See note below ⬇️ |
| `CLERK_SECRET_KEY` | Your Clerk secret key from dashboard |
| `DODO_PAYMENTS_API_KEY` | Your Dodo Payments API key |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Your Dodo webhook key |
| `HF_TOKEN` | Your Hugging Face token |
| `SKIP_AI_MODEL_LOADING` | `true` |
| `ENVIRONMENT` | `production` |

**📝 DATABASE_URL Value:**
```
postgresql+psycopg2://postgres.xplxzmcbxpdhkcjpkopm:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?prepared_statement=false
```

Replace `[YOUR-PASSWORD]` with your actual Supabase database password (URL-encoded if it contains special characters like `!` → `%21`).


**Important**: Select **All Environments** (Production, Preview, Development) for each variable.

### Step 4: Redeploy Backend

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete
5. **Copy your backend URL** (e.g., `https://your-backend.vercel.app`)

### Step 5: Test Backend

Visit: `https://your-backend.vercel.app/health`

You should see:
```json
{
  "status": "healthy",
  "database": "connected",
  "ai_model": "using heuristics"
}
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Frontend Project on Vercel

1. Go to https://vercel.com/new
2. Import the **same** GitHub repository
3. **Important**: Set the **Root Directory** to `frontend`
4. Framework Preset: **Next.js**
5. Click **Deploy** (it will fail first, that's okay)

### Step 2: Configure Frontend Environment Variables

Go to your frontend project → **Settings** → **Environment Variables** and add:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.vercel.app` ← **Use your actual backend URL from Part 1, Step 4** |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key |

**Important**: Select **All Environments** for each variable.

### Step 3: Redeploy Frontend

1. Go to **Deployments** tab
2. Click **⋯** on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

## Part 3: Update Clerk Settings

1. Go to your Clerk Dashboard
2. Navigate to **Configure** → **Domains**
3. Add your Vercel frontend URL (e.g., `https://your-app.vercel.app`)
4. Update **Allowed Origins** to include your frontend URL

---

## Part 4: Update Dodo Payments Webhook

1. Go to Dodo Payments Dashboard
2. Update webhook URL to: `https://your-backend.vercel.app/api/webhooks/dodo`

---

## 🧪 Testing Your Deployment

### Test Backend:
1. Visit `https://your-backend.vercel.app/health`
2. Should return healthy status

### Test Frontend:
1. Visit your frontend URL
2. Try uploading a document
3. Check if analysis works

### Test Database:
1. Upload a document
2. Check Supabase dashboard to see if data is saved

---

## 🐛 Troubleshooting

### Backend Issues:

**"Database connection failed"**
- Verify DATABASE_URL is correct
- Make sure you're using the **connection pooler** URL, not direct connection
- Check that `?prepared_statement=false` is at the end

**"Module not found"**
- Check that `vercel.json` is in the root directory
- Verify `requirements.txt` has all dependencies

**"Function timeout"**
- This is normal for first request (cold start)
- Subsequent requests should be faster

### Frontend Issues:

**"Upload failed. Ensure backend is running"**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Make sure backend is deployed and healthy
- Check browser console for CORS errors

**CORS Errors:**
- Backend is currently set to allow all origins (`allow_origins=["*"]`)
- This is for debugging; you can restrict it later

---

## 🔒 Security Notes (Post-Launch)

After everything works, update these for better security:

1. **CORS**: In `backend/main.py`, change from `allow_origins=["*"]` to specific frontend URL
2. **Environment Variables**: Rotate any keys that were committed to Git
3. **Database**: Review Supabase security rules

---

## 📝 Summary of Changes Made

✅ Created `vercel.json` for backend deployment configuration
✅ Updated `database.py` to use NullPool for serverless
✅ Added health check endpoint at `/health`
✅ Made CORS permissive for debugging
✅ Created `frontend/src/config/api.ts` for centralized API URLs
✅ Updated `DocumentVault.tsx` to use environment variables
✅ Updated `AnalysisView.tsx` to use environment variables
✅ Created `.env.local` for frontend local development

---

## 🚀 Next Steps

1. Follow Part 1 to deploy backend
2. Follow Part 2 to deploy frontend
3. Test everything works
4. Update Clerk and Dodo settings
5. Celebrate! 🎉

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs (Functions tab)
2. Check browser console for errors
3. Verify all environment variables are set
4. Test backend `/health` endpoint first
