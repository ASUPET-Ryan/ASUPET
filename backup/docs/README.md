# ASUPET Website Backup & Restore Guide

## 📋 Overview

This backup system provides a complete solution for backing up and restoring the ASUPET website, including:

- ✅ Complete source code
- ✅ Database structure and schema
- ✅ Configuration files and environment variables
- ✅ Automated backup and restore scripts
- ✅ Documentation and recovery instructions

## 📁 Backup Structure

```
backup/
├── source/           # Complete source code (excluding node_modules, .git)
├── database/         # Database backup files
│   └── database_backup.sql
├── config/           # Configuration files
│   ├── .env.template
│   └── .env.backup
├── scripts/          # Automation scripts
│   ├── backup.sh
│   └── restore.sh
└── docs/            # Documentation
    ├── README.md
    └── RESTORE.md
```

## 🚀 Quick Start

### Creating a Backup

1. **Manual Backup** (Current setup):
   ```bash
   # All files are already backed up in the backup/ directory
   ls -la backup/
   ```

2. **Automated Backup** (Future backups):
   ```bash
   # Run the backup script
   ./backup/scripts/backup.sh
   ```

### Restoring from Backup

1. **Extract and restore**:
   ```bash
   # If you have a compressed backup
   ./backup/scripts/restore.sh asupet_backup_YYYYMMDD_HHMMSS.tar.gz /path/to/restore
   
   # Or manually copy from backup/source/
   cp -r backup/source/* /path/to/new/location/
   ```

2. **Set up environment**:
   ```bash
   cd /path/to/restored/location
   cp backup/config/.env.template .env.local
   # Edit .env.local with your actual values
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up database** (see RESTORE.md for details)

5. **Start the application**:
   ```bash
   npm run dev
   ```

## 🗄️ Database Information

### Current Database Structure

The backup includes the following tables:

- **brand_story**: Company brand story and timeline
- **team_members**: Team member profiles and information
- **product_series**: Product lines and specifications
- **news**: News articles with multilingual content
- **news_categories**: News categorization system
- **contact_submissions**: Contact form submissions
- **media_items**: Media files and metadata

### Database Configuration

- **Platform**: Supabase (PostgreSQL)
- **Project URL**: https://cguthchefshejanxsxlc.supabase.co
- **Schema**: public
- **Features**: Row Level Security (RLS), UUID primary keys, JSONB for multilingual content

## ⚙️ Configuration Files

### Environment Variables

- **`.env.template`**: Template for new deployments
- **`.env.backup`**: Current project configuration (contains sensitive data)

### Required Environment Variables

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Backend only
```

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel
- **Package Manager**: npm

## 📝 Important Notes

### Security Considerations

1. **Never commit `.env` files** to version control
2. **Rotate API keys regularly** for security
3. **Use HTTPS in production** environments
4. **Keep service role keys secure** (backend only)

### Backup Best Practices

1. **Regular backups**: Create backups before major changes
2. **Test restores**: Regularly test backup restoration
3. **Off-site storage**: Store backups in multiple locations
4. **Version control**: Keep track of backup versions

### File Exclusions

The following files/directories are excluded from backups:
- `node_modules/` (can be restored with `npm install`)
- `.git/` (version control history)
- `dist/`, `build/`, `.next/` (build artifacts)
- `.env`, `.env.local` (sensitive configuration)

## 🆘 Troubleshooting

### Common Issues

1. **Missing dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables not set**:
   ```bash
   cp .env.template .env.local
   # Edit .env.local with actual values
   ```

3. **Database connection issues**:
   - Check Supabase URL and keys
   - Verify network connectivity
   - Check RLS policies

4. **Permission errors**:
   ```bash
   chmod +x backup/scripts/*.sh
   ```

### Getting Help

1. Check the detailed restore guide: `docs/RESTORE.md`
2. Review the backup scripts: `scripts/backup.sh` and `scripts/restore.sh`
3. Verify configuration: `config/.env.template`

## 📞 Support

For additional support or questions about the backup system:

1. Review this documentation thoroughly
2. Check the restore guide for step-by-step instructions
3. Verify all configuration files are properly set up
4. Test the backup and restore process in a safe environment

---

**Last Updated**: $(date)
**Backup Version**: Complete website backup including source code, database schema, and configuration files.
**Compatibility**: Node.js 18+, npm 8+, Modern browsers