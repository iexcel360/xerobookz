#!/bin/bash
# MongoDB Backup Script

set -e

BACKUP_DIR="/backups/mongo"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mongodump --uri="$MONGO_URI" \
  --out=$BACKUP_DIR/xerobookz_$DATE

# Compress backup
tar -czf $BACKUP_DIR/xerobookz_$DATE.tar.gz \
  -C $BACKUP_DIR xerobookz_$DATE

# Upload to S3
aws s3 cp $BACKUP_DIR/xerobookz_$DATE.tar.gz \
  s3://xerobookz-backups/mongo/xerobookz_$DATE.tar.gz

# Cleanup old backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete
rm -rf $BACKUP_DIR/xerobookz_$DATE

echo "Backup completed: xerobookz_$DATE.tar.gz"

