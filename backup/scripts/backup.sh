#!/bin/bash

# ASUPET Website Backup Script
# This script creates a complete backup of the website including source code and database

set -e  # Exit on any error

# Configuration
BACKUP_DIR="backup"
SOURCE_DIR="."
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="asupet_backup_${TIMESTAMP}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting ASUPET Website Backup...${NC}"
echo "Backup timestamp: $TIMESTAMP"
echo "Backup directory: $BACKUP_NAME"
echo ""

# Create timestamped backup directory
echo -e "${YELLOW}📁 Creating backup directory structure...${NC}"
mkdir -p "${BACKUP_NAME}/{source,database,scripts,docs,config}"

# Copy source code (excluding unnecessary files)
echo -e "${YELLOW}📋 Copying source code...${NC}"
rsync -av \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='build' \
  --exclude='.next' \
  --exclude='backup' \
  --exclude="${BACKUP_NAME}" \
  --exclude='.env' \
  --exclude='.env.local' \
  "$SOURCE_DIR/" "${BACKUP_NAME}/source/"

# Copy database backup
echo -e "${YELLOW}🗄️  Copying database backup...${NC}"
if [ -f "${BACKUP_DIR}/database/database_backup.sql" ]; then
  cp "${BACKUP_DIR}/database/database_backup.sql" "${BACKUP_NAME}/database/"
else
  echo -e "${RED}⚠️  Warning: Database backup file not found${NC}"
fi

# Copy configuration files
echo -e "${YELLOW}⚙️  Copying configuration files...${NC}"
if [ -d "${BACKUP_DIR}/config" ]; then
  cp -r "${BACKUP_DIR}/config/"* "${BACKUP_NAME}/config/"
else
  echo -e "${RED}⚠️  Warning: Config directory not found${NC}"
fi

# Copy scripts
echo -e "${YELLOW}📜 Copying backup scripts...${NC}"
if [ -d "${BACKUP_DIR}/scripts" ]; then
  cp -r "${BACKUP_DIR}/scripts/"* "${BACKUP_NAME}/scripts/"
else
  echo -e "${RED}⚠️  Warning: Scripts directory not found${NC}"
fi

# Copy documentation
echo -e "${YELLOW}📚 Copying documentation...${NC}"
if [ -d "${BACKUP_DIR}/docs" ]; then
  cp -r "${BACKUP_DIR}/docs/"* "${BACKUP_NAME}/docs/" 2>/dev/null || echo "No docs to copy"
fi

# Create backup info file
echo -e "${YELLOW}ℹ️  Creating backup information file...${NC}"
cat > "${BACKUP_NAME}/BACKUP_INFO.txt" << EOF
ASUPET Website Backup Information
================================

Backup Date: $(date)
Backup Version: $TIMESTAMP
Source Directory: $SOURCE_DIR
Backup Created By: $(whoami)
System: $(uname -a)

Contents:
- source/: Complete source code (excluding node_modules, .git, etc.)
- database/: Database structure and schema
- config/: Environment variables and configuration templates
- scripts/: Backup and restore scripts
- docs/: Documentation and recovery instructions

To restore this backup:
1. Extract to desired location
2. Follow instructions in docs/RESTORE.md
3. Install dependencies: npm install
4. Configure environment variables using config/.env.template
5. Set up database using database/database_backup.sql

For support, refer to the documentation in the docs/ directory.
EOF

# Create compressed archive
echo -e "${YELLOW}🗜️  Creating compressed archive...${NC}"
tar -czf "${BACKUP_NAME}.tar.gz" "$BACKUP_NAME"

# Calculate sizes
BACKUP_SIZE=$(du -sh "$BACKUP_NAME" | cut -f1)
ARCHIVE_SIZE=$(du -sh "${BACKUP_NAME}.tar.gz" | cut -f1)

echo ""
echo -e "${GREEN}✅ Backup completed successfully!${NC}"
echo "📁 Backup directory: $BACKUP_NAME ($BACKUP_SIZE)"
echo "📦 Compressed archive: ${BACKUP_NAME}.tar.gz ($ARCHIVE_SIZE)"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Store the backup in a safe location"
echo "2. Test the backup by following restore instructions"
echo "3. Consider uploading to cloud storage for off-site backup"
echo ""
echo -e "${GREEN}🎉 Backup process completed!${NC}"