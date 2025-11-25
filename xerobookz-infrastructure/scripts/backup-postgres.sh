#!/bin/bash
# PostgreSQL Backup Script

set -e

BACKUP_DIR="/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB \
  -F c -f $BACKUP_DIR/xerobookz_$DATE.dump

# Upload to S3
aws s3 cp $BACKUP_DIR/xerobookz_$DATE.dump \
  s3://xerobookz-backups/postgres/xerobookz_$DATE.dump

# Cleanup old backups
find $BACKUP_DIR -name "*.dump" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: xerobookz_$DATE.dump"

