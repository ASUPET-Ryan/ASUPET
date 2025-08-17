#!/bin/bash

# ASUPET Website Restore Script
# This script restores a website backup to a new location

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print usage
print_usage() {
    echo "Usage: $0 [BACKUP_ARCHIVE] [RESTORE_DIRECTORY]"
    echo ""
    echo "Arguments:"
    echo "  BACKUP_ARCHIVE     Path to the backup .tar.gz file"
    echo "  RESTORE_DIRECTORY  Directory where to restore the backup"
    echo ""
    echo "Example:"
    echo "  $0 asupet_backup_20240115_143022.tar.gz /path/to/restore"
    echo ""
}

# Check arguments
if [ $# -ne 2 ]; then
    echo -e "${RED}Error: Invalid number of arguments${NC}"
    print_usage
    exit 1
fi

BACKUP_ARCHIVE="$1"
RESTORE_DIR="$2"

# Validate backup archive exists
if [ ! -f "$BACKUP_ARCHIVE" ]; then
    echo -e "${RED}Error: Backup archive '$BACKUP_ARCHIVE' not found${NC}"
    exit 1
fi

# Create restore directory if it doesn't exist
if [ ! -d "$RESTORE_DIR" ]; then
    echo -e "${YELLOW}📁 Creating restore directory: $RESTORE_DIR${NC}"
    mkdir -p "$RESTORE_DIR"
fi

echo -e "${GREEN}🔄 Starting ASUPET Website Restore...${NC}"
echo "Backup archive: $BACKUP_ARCHIVE"
echo "Restore directory: $RESTORE_DIR"
echo ""

# Extract backup archive
echo -e "${YELLOW}📦 Extracting backup archive...${NC}"
tar -xzf "$BACKUP_ARCHIVE" -C "$RESTORE_DIR"

# Find the extracted backup directory
BACKUP_NAME=$(tar -tzf "$BACKUP_ARCHIVE" | head -1 | cut -f1 -d"/")
BACKUP_PATH="$RESTORE_DIR/$BACKUP_NAME"

if [ ! -d "$BACKUP_PATH" ]; then
    echo -e "${RED}Error: Extracted backup directory not found${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Copying source code...${NC}"
# Copy source code to restore directory
cp -r "$BACKUP_PATH/source/"* "$RESTORE_DIR/"

echo -e "${YELLOW}⚙️  Setting up configuration...${NC}"
# Copy environment template
if [ -f "$BACKUP_PATH/config/.env.template" ]; then
    cp "$BACKUP_PATH/config/.env.template" "$RESTORE_DIR/.env.local"
    echo -e "${BLUE}ℹ️  Environment template copied to .env.local${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env.local with your actual configuration values${NC}"
fi

# Copy backup configuration if available
if [ -f "$BACKUP_PATH/config/.env.backup" ]; then
    cp "$BACKUP_PATH/config/.env.backup" "$RESTORE_DIR/.env.backup"
    echo -e "${BLUE}ℹ️  Original configuration backed up to .env.backup${NC}"
fi

echo -e "${YELLOW}🗄️  Setting up database...${NC}"
# Copy database files
if [ -d "$BACKUP_PATH/database" ]; then
    mkdir -p "$RESTORE_DIR/database_backup"
    cp -r "$BACKUP_PATH/database/"* "$RESTORE_DIR/database_backup/"
    echo -e "${BLUE}ℹ️  Database backup copied to database_backup/${NC}"
fi

# Copy documentation
if [ -d "$BACKUP_PATH/docs" ]; then
    mkdir -p "$RESTORE_DIR/backup_docs"
    cp -r "$BACKUP_PATH/docs/"* "$RESTORE_DIR/backup_docs/" 2>/dev/null || true
fi

# Copy scripts
if [ -d "$BACKUP_PATH/scripts" ]; then
    mkdir -p "$RESTORE_DIR/backup_scripts"
    cp -r "$BACKUP_PATH/scripts/"* "$RESTORE_DIR/backup_scripts/"
fi

echo ""
echo -e "${GREEN}✅ Restore completed successfully!${NC}"
echo "📁 Restored to: $RESTORE_DIR"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. cd $RESTORE_DIR"
echo "2. Edit .env.local with your actual configuration values"
echo "3. Install dependencies: npm install"
echo "4. Set up your Supabase database using database_backup/database_backup.sql"
echo "5. Start the development server: npm run dev"
echo ""
echo -e "${BLUE}ℹ️  Additional files:${NC}"
echo "- database_backup/: Database schema and migration files"
echo "- backup_docs/: Documentation and guides"
echo "- backup_scripts/: Backup and utility scripts"
echo "- .env.backup: Original environment configuration (if available)"
echo ""
echo -e "${GREEN}🎉 Restore process completed!${NC}"

# Clean up extracted backup directory
echo -e "${YELLOW}🧹 Cleaning up temporary files...${NC}"
rm -rf "$BACKUP_PATH"

echo -e "${GREEN}✨ All done! Your ASUPET website has been restored.${NC}"