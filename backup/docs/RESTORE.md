# ASUPET Website Restore Guide

## 🎯 Overview

This guide provides step-by-step instructions for restoring the ASUPET website from a backup. Follow these instructions carefully to ensure a successful restoration.

## 📋 Prerequisites

Before starting the restore process, ensure you have:

- [ ] Node.js 18+ installed
- [ ] npm 8+ installed
- [ ] Access to a Supabase project (or ability to create one)
- [ ] The backup files (either from backup/ directory or extracted archive)
- [ ] Terminal/command line access

## 🚀 Step-by-Step Restore Process

### Step 1: Prepare the Environment

1. **Create a new directory** for the restored website:
   ```bash
   mkdir asupet-restored
   cd asupet-restored
   ```

2. **Copy source files** from backup:
   ```bash
   # If using backup directory
   cp -r /path/to/backup/source/* .
   
   # If using restore script
   /path/to/backup/scripts/restore.sh backup_archive.tar.gz .
   ```

### Step 2: Install Dependencies

1. **Install npm packages**:
   ```bash
   npm install
   ```

2. **Verify installation**:
   ```bash
   npm list --depth=0
   ```

### Step 3: Configure Environment Variables

1. **Copy environment template**:
   ```bash
   cp /path/to/backup/config/.env.template .env.local
   ```

2. **Edit environment variables**:
   ```bash
   nano .env.local  # or use your preferred editor
   ```

3. **Required variables to update**:
   ```bash
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### Step 4: Set Up Supabase Database

#### Option A: Create New Supabase Project

1. **Go to [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Create a new project**
3. **Note down the project URL and API keys**
4. **Update your `.env.local` file** with the new credentials

#### Option B: Use Existing Supabase Project

1. **Access your existing Supabase project**
2. **Get the project URL and API keys** from Settings > API
3. **Update your `.env.local` file**

### Step 5: Restore Database Schema

1. **Open Supabase SQL Editor** in your project dashboard

2. **Run the database backup SQL**:
   ```sql
   -- Copy and paste the contents of backup/database/database_backup.sql
   -- into the SQL Editor and execute
   ```

3. **Verify tables were created**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

4. **Check permissions**:
   ```sql
   SELECT grantee, table_name, privilege_type 
   FROM information_schema.role_table_grants 
   WHERE table_schema = 'public' 
   AND grantee IN ('anon', 'authenticated') 
   ORDER BY table_name, grantee;
   ```

### Step 6: Test the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:5173`

3. **Test key functionality**:
   - [ ] Homepage loads correctly
   - [ ] Navigation works
   - [ ] News page displays (may be empty initially)
   - [ ] Contact form works
   - [ ] Admin login works (admin / asupet2024)

### Step 7: Populate Sample Data (Optional)

1. **Access admin panel** at `http://localhost:5173/admin`

2. **Login with credentials**:
   - Username: `admin`
   - Password: `asupet2024`

3. **Create sample content**:
   - Add news categories
   - Create sample news articles
   - Test image uploads

## 🗄️ Database Migration Details

### Tables Structure

The restored database includes these tables:

| Table | Purpose | Key Features |
|-------|---------|-------------|
| `brand_story` | Company story | JSONB multilingual content |
| `team_members` | Team profiles | Avatar URLs, credentials |
| `product_series` | Product lines | Features, target pets |
| `news` | News articles | Multilingual, categories |
| `news_categories` | News categories | Bilingual names, colors |
| `contact_submissions` | Contact forms | Inquiry types, processing |
| `media_items` | Media files | URLs, metadata |

### Row Level Security (RLS)

Some tables have RLS enabled:
- `news_categories`: RLS enabled
- Other tables: RLS disabled for easier development

### Permissions

The backup includes proper permissions:
- `anon` role: SELECT access to public tables
- `authenticated` role: Full access to all tables

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Environment Variables Not Loading

**Problem**: Application can't connect to Supabase

**Solution**:
```bash
# Check if .env.local exists and has correct format
cat .env.local

# Ensure variables start with VITE_ for frontend access
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

#### 2. Database Connection Errors

**Problem**: "Invalid API key" or connection timeouts

**Solution**:
1. Verify Supabase project URL and keys
2. Check if project is paused (free tier limitation)
3. Ensure API keys are correctly copied (no extra spaces)

#### 3. Missing Tables

**Problem**: Tables don't exist in database

**Solution**:
1. Re-run the database backup SQL
2. Check for SQL execution errors
3. Verify you're connected to the correct project

#### 4. Permission Denied Errors

**Problem**: "permission denied for table" errors

**Solution**:
```sql
-- Grant permissions manually
GRANT SELECT ON public.news TO anon;
GRANT ALL PRIVILEGES ON public.news TO authenticated;

-- Repeat for other tables as needed
```

#### 5. Admin Login Not Working

**Problem**: Can't access admin panel

**Solution**:
1. Verify credentials: `admin` / `asupet2024`
2. Check if AuthContext is properly configured
3. Clear browser cache and cookies

#### 6. Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Run type check
npm run check
```

### Performance Issues

#### Slow Loading

1. **Check network connection** to Supabase
2. **Optimize images** if using large files
3. **Review database queries** for efficiency

#### Memory Issues

1. **Restart development server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Clear browser cache**

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

### Other Platforms

- **Netlify**: Use `npm run build` and deploy `dist/` folder
- **GitHub Pages**: Configure for SPA routing
- **Custom server**: Use `npm run build` and serve static files

## ✅ Verification Checklist

After restoration, verify these items:

- [ ] Application starts without errors
- [ ] All pages load correctly
- [ ] Database connection works
- [ ] Admin panel accessible
- [ ] News management functions
- [ ] Contact form submits
- [ ] Images display properly
- [ ] Responsive design works
- [ ] Both languages (EN/ZH) work
- [ ] Build process completes successfully

## 📞 Support

If you encounter issues not covered in this guide:

1. **Check the main README.md** for additional information
2. **Review backup scripts** for automation options
3. **Verify all prerequisites** are met
4. **Test in a clean environment** to isolate issues

---

**Last Updated**: $(date)
**Guide Version**: 1.0
**Compatibility**: ASUPET Website Backup System