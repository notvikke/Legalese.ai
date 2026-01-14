# Deployment Guide

## Local Development

### Backend (Port 8000)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Visit: http://localhost:8000

### Frontend (Port 3000)
```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:3000

## Production Deployment

### Frontend (Vercel)

1. **Push to GitHub** (already done ✅)

2. **Deploy to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository: `notvikke/Legalese.ai`
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Next.js
   - **Environment Variables**: Add:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
     CLERK_SECRET_KEY=sk_test_...
     ```
   - Click "Deploy"

### Backend (Railway/Render)

#### Option 1: Railway
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select `Legalese.ai` repository
4. **Root Directory**: `backend`
5. Add environment variables:
   ```
   DATABASE_URL=postgresql+psycopg2://...
   HF_TOKEN=hf_...
   DODO_PAYMENTS_API_KEY=...
   ```
6. Deploy

#### Option 2: Render
1. Go to https://render.com
2. "New" → "Web Service"
3. Connect GitHub repository
4. **Root Directory**: `backend`
5. **Build Command**: `pip install -r requirements.txt`
6. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Add environment variables
8. Deploy

## Troubleshooting

### 404 Errors

**Frontend 404**:
- Ensure you're in the `frontend` directory when running `npm run dev`
- Check that all pages exist in `src/app/`

**Backend 404**:
- Ensure backend is running on port 8000
- Check API routes in `backend/main.py`

**Deployment 404**:
- Vercel: Ensure "Root Directory" is set to `frontend`
- Check build logs for errors

### CORS Errors
Update `backend/main.py` with your production URL:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-app.vercel.app"],
    ...
)
```
