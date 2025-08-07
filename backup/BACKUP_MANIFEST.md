# ASUPET Website Backup Manifest

## 📋 Backup Information

- **Backup Date**: $(date)
- **Website**: ASUPET Professional Pet Nutrition
- **Version**: Complete website backup
- **Backup Type**: Full system backup
- **Total Size**: ~555KB (source code) + database schema

## 📁 Directory Structure

```
backup/
├── BACKUP_MANIFEST.md          # This file - backup contents list
├── source/                     # Complete source code (79 files)
│   ├── .gitignore
│   ├── .vercelignore
│   ├── README.md
│   ├── package.json            # Dependencies and scripts
│   ├── package-lock.json       # Dependency lock file
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite build configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── vercel.json             # Vercel deployment configuration
│   ├── index.html              # Main HTML template
│   ├── spec.md                 # Project specifications
│   ├── debug_db.js             # Database debugging utility
│   ├── .trae/                  # Trae AI configuration
│   │   ├── TODO.md
│   │   └── documents/          # Project documentation
│   ├── .vercel/                # Vercel project configuration
│   ├── public/                 # Static assets
│   │   └── favicon.svg
│   ├── src/                    # Source code
│   │   ├── App.tsx             # Main application component
│   │   ├── main.tsx            # Application entry point
│   │   ├── index.css           # Global styles
│   │   ├── vite-env.d.ts       # Vite type definitions
│   │   ├── assets/             # Static assets
│   │   ├── components/         # Reusable components
│   │   │   ├── Empty.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── admin/
│   │   │       └── AdminLayout.tsx
│   │   ├── contexts/           # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useTheme.ts
│   │   ├── i18n/               # Internationalization
│   │   │   ├── index.ts
│   │   │   └── locales/
│   │   │       ├── en.json     # English translations
│   │   │       └── zh.json     # Chinese translations
│   │   ├── lib/                # Utility libraries
│   │   │   ├── supabase.ts     # Supabase client configuration
│   │   │   └── utils.ts        # Utility functions
│   │   └── pages/              # Page components
│   │       ├── About.tsx       # About page
│   │       ├── Contact.tsx     # Contact page
│   │       ├── Home.tsx        # Homepage
│   │       ├── News.tsx        # News listing page
│   │       ├── NewsDetail.tsx  # News detail page
│   │       ├── Privacy.tsx     # Privacy policy page
│   │       ├── Products.tsx    # Products page
│   │       ├── Technology.tsx  # Technology page
│   │       ├── Terms.tsx       # Terms of service page
│   │       └── admin/          # Admin panel pages
│   │           ├── Categories.tsx    # Category management
│   │           ├── Dashboard.tsx     # Admin dashboard
│   │           ├── Login.tsx         # Admin login
│   │           ├── NewsCreate.tsx    # Create news
│   │           ├── NewsEdit.tsx      # Edit news
│   │           ├── NewsList.tsx      # News management
│   │           ├── NewsPreview.tsx   # News preview
│   │           └── Settings.tsx      # Admin settings
│   └── supabase/               # Database migrations
│       └── migrations/         # SQL migration files
│           ├── 001_create_tables.sql
│           ├── add_category_to_news.sql
│           ├── add_news_data.sql
│           ├── add_sample_data.sql
│           ├── create_news_categories_table.sql
│           ├── fix_missing_images.sql
│           └── fix_remaining_images.sql
├── database/                   # Database backup
│   └── database_backup.sql     # Complete database schema
├── config/                     # Configuration files
│   ├── .env.template          # Environment variables template
│   └── .env.backup            # Current environment configuration
├── scripts/                    # Automation scripts
│   ├── backup.sh              # Automated backup script
│   └── restore.sh             # Automated restore script
└── docs/                      # Documentation
    ├── README.md              # Main documentation
    └── RESTORE.md             # Detailed restore guide
```

## 🗄️ Database Schema

### Tables Included

| Table Name | Records | Purpose |
|------------|---------|----------|
| `brand_story` | 2 | Company brand story and timeline |
| `team_members` | 6 | Team member profiles |
| `product_series` | 3 | Product line information |
| `news` | 8 | News articles (multilingual) |
| `news_categories` | 5 | News categorization |
| `contact_submissions` | 0 | Contact form submissions |
| `media_items` | 0 | Media file metadata |

### Database Features

- **Platform**: Supabase (PostgreSQL)
- **Schema**: public
- **Primary Keys**: UUID with gen_random_uuid()
- **Multilingual**: JSONB fields for EN/ZH content
- **Security**: Row Level Security (RLS) on selected tables
- **Permissions**: Configured for anon and authenticated roles

## ⚙️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Icons**: Lucide React
- **Internationalization**: react-i18next

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: Supabase REST API

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **CSS Processing**: PostCSS
- **Deployment**: Vercel

## 🔧 Configuration Details

### Environment Variables

```bash
# Required for frontend
VITE_SUPABASE_URL=https://cguthchefshejanxsxlc.supabase.co
VITE_SUPABASE_ANON_KEY=[anon_key]

# Required for backend operations
SUPABASE_SERVICE_ROLE_KEY=[service_role_key]

# Application settings
VITE_APP_TITLE=ASUPET
VITE_APP_DESCRIPTION=Professional Pet Nutrition Solutions
NODE_ENV=development
PORT=5173
```

### Admin Credentials

- **Username**: admin
- **Password**: asupet2024
- **Access**: Full admin panel access

## 📦 Dependencies

### Production Dependencies
- React & React DOM
- React Router DOM
- Supabase JS Client
- Tailwind CSS
- Lucide React (icons)
- react-i18next
- Zustand
- Sonner (notifications)

### Development Dependencies
- Vite
- TypeScript
- ESLint
- PostCSS
- Autoprefixer

## 🚀 Deployment Configuration

### Vercel Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Build Process
1. TypeScript compilation
2. Vite bundling
3. Tailwind CSS processing
4. Asset optimization
5. Static file generation

## 🔒 Security Notes

### Included in Backup
- Database schema and structure
- Application source code
- Configuration templates
- Documentation

### Excluded from Backup
- Actual environment variables (`.env` files)
- Node modules (`node_modules/`)
- Build artifacts (`dist/`, `build/`)
- Git history (`.git/`)
- Sensitive keys (stored separately)

### Security Recommendations
1. Store backup in secure location
2. Encrypt sensitive configuration files
3. Rotate API keys after restoration
4. Use HTTPS in production
5. Enable proper RLS policies

## ✅ Backup Verification

### Completeness Check
- [x] All source files copied
- [x] Database schema exported
- [x] Configuration templates created
- [x] Documentation included
- [x] Scripts executable
- [x] Permissions set correctly

### File Integrity
- **Total Files**: 79 source files
- **Total Size**: ~555KB (excluding node_modules)
- **Compression**: Available via backup.sh script
- **Checksum**: Can be generated for verification

## 📞 Recovery Information

### Quick Recovery Steps
1. Extract backup to new location
2. Run `npm install`
3. Configure `.env.local` from template
4. Set up Supabase database
5. Run `npm run dev`

### Full Recovery Guide
See `docs/RESTORE.md` for detailed instructions.

### Support Resources
- Main documentation: `docs/README.md`
- Restore guide: `docs/RESTORE.md`
- Backup script: `scripts/backup.sh`
- Restore script: `scripts/restore.sh`

---

**Backup Created**: $(date)
**Manifest Version**: 1.0
**Next Backup Recommended**: Before major changes or monthly