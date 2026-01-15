# Vercel Database Connection Fix

## Problem
Vercel's infrastructure only supports IPv4, while Supabase's direct connection uses IPv6. This causes the backend to fail when trying to connect to the database.

## Solution
Switch from Direct Connection to Connection Pooler (Transaction mode) and use NullPool in SQLAlchemy.

---

## Step 1: Get the Correct Connection String from Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/xplxzmcbxpdhkcjpkopm/settings/database)
2. Scroll down to the **Connection Pooler** section
3. Change the **Mode** to **Transaction** (best for serverless functions)
4. Copy the connection string. It should look like:
   ```
   postgresql://postgres.xplxzmcbxpdhkcjpkopm:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

---

## Step 2: Update Vercel Environment Variable

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Find or create the `DATABASE_URL` variable
5. **IMPORTANT**: Add the connection string with the required parameter for transaction pooling:

   ```
   postgresql+psycopg2://postgres.xplxzmcbxpdhkcjpkopm:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?prepared_statement=false
   ```

   **Key points:**
   - Use `postgresql+psycopg2://` (not just `postgresql://`) for SQLAlchemy
   - Port should be `6543` (pooler port, not the direct connection port 5432)
   - Add `?prepared_statement=false` at the end (required for transaction pooling)

6. Make sure to set this for all environments (Production, Preview, Development)
7. Click **Save**

---

## Step 3: Redeploy Your Application

After updating the environment variable:

1. Go to your Vercel project's **Deployments** tab
2. Click on the latest deployment
3. Click the **⋯** (three dots) menu
4. Select **Redeploy**
5. Check the box for **Use existing Build Cache** (optional, makes it faster)
6. Click **Redeploy**

---

## Step 4: Verify the Fix

1. Once redeployed, check your Vercel deployment logs:
   - Go to **Deployments** → Click on your latest deployment → **Functions** tab
   - Look for any database connection errors

2. Test your backend endpoints:
   - Try accessing your API endpoints
   - Check if database operations are working

---

## What Was Changed in the Code

✅ **Updated `backend/database.py`**:
- Changed from connection pooling (`pool_size`, `max_overflow`) to `NullPool`
- This is crucial for serverless environments like Vercel
- Prevents "too many connections" errors by creating fresh connections per request

---

## Connection String Format Reference

### ❌ OLD (Direct Connection - IPv6, won't work on Vercel):
```
postgresql+psycopg2://postgres.xplxzmcbxpdhkcjpkopm:password@54.255.219.82:6543/postgres
```

### ✅ NEW (Connection Pooler - IPv4, works on Vercel):
```
postgresql+psycopg2://postgres.xplxzmcbxpdhkcjpkopm:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?prepared_statement=false
```

---

## Troubleshooting

### Still getting connection errors?
1. Double-check the password in your connection string (no typos)
2. Verify the `?prepared_statement=false` parameter is present
3. Make sure you're using `postgresql+psycopg2://` not just `postgresql://`
4. Check Vercel logs for specific error messages

### Database credentials changed?
If you reset your database password:
1. Get the new password from Supabase
2. Update the connection string in Vercel environment variables
3. Redeploy

---

## Notes

- **Local Development**: You can continue using SQLite locally (DATABASE_URL commented out in `.env`)
- **Production**: Always use the connection pooler URL on Vercel
- **Security**: Never commit your actual database password to Git
