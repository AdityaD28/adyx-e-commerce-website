#!/bin/bash

# Database Backup Script for AdyX E-commerce
# This script creates backups of the PostgreSQL database

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Configuration
BACKUP_DIR="db/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="adyx_backup_$TIMESTAMP.sql"
DB_CONTAINER="adyx-postgres"
DB_NAME="adyx_ecommerce"
DB_USER="postgres"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

print_status "Creating database backup..."

# Create the backup
docker exec $DB_CONTAINER pg_dump -U $DB_USER -d $DB_NAME > "$BACKUP_DIR/$BACKUP_FILE"

# Compress the backup
print_status "Compressing backup..."
gzip "$BACKUP_DIR/$BACKUP_FILE"

# Keep only the last 7 backups
print_status "Cleaning up old backups..."
cd $BACKUP_DIR
ls -t adyx_backup_*.sql.gz | tail -n +8 | xargs -r rm --

print_success "Backup created: $BACKUP_DIR/$BACKUP_FILE.gz"

# Display backup size
BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE.gz" | cut -f1)
print_status "Backup size: $BACKUP_SIZE"
