#!/bin/bash

# Database Restore Script for AdyX E-commerce
# Usage: ./restore-db.sh <backup_file>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if backup file is provided
if [ -z "$1" ]; then
    print_error "Usage: $0 <backup_file>"
    print_error "Available backups:"
    ls -la db/backups/
    exit 1
fi

BACKUP_FILE=$1
DB_CONTAINER="adyx-postgres"
DB_NAME="adyx_ecommerce"
DB_USER="postgres"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    print_error "Backup file not found: $BACKUP_FILE"
    exit 1
fi

print_warning "This will REPLACE the current database with the backup!"
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_status "Restore cancelled."
    exit 0
fi

print_status "Stopping application..."
docker-compose stop frontend

print_status "Restoring database from: $BACKUP_FILE"

# If the backup is compressed, decompress it first
if [[ $BACKUP_FILE == *.gz ]]; then
    print_status "Decompressing backup..."
    TEMP_FILE="/tmp/restore_$(date +%s).sql"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
    BACKUP_FILE="$TEMP_FILE"
fi

# Drop and recreate database
print_status "Recreating database..."
docker exec $DB_CONTAINER psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker exec $DB_CONTAINER psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

# Restore the backup
print_status "Restoring data..."
docker exec -i $DB_CONTAINER psql -U $DB_USER -d $DB_NAME < "$BACKUP_FILE"

# Clean up temporary file if created
if [[ -n "$TEMP_FILE" ]]; then
    rm -f "$TEMP_FILE"
fi

print_status "Starting application..."
docker-compose up -d

print_success "Database restored successfully!"
print_status "Application is starting up. Please wait a moment before accessing it."
