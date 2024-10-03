#!bin/bash                                                     mongo_backup_total.sh                                                                 #!/bin/bash

#Dates
DATE=$(date +"%Y%m%d")

#Names
DBNAME="test"

# MongoDB URI for authentication and connection
MONGO_URI="mongodb://mongoadmin:aed0452dba3a82201f874542@vsgate-s1.dei.isep.ipp.pt:10242/"

# Output directory for MongoDB dump
BACKUP_DIR="/root/bin/mongodumptotal"
BACKUP_DIR2="/root/bin/mongodumptotal2"

#Output file
BACKUP_FILE="$BACKUP_DIR/${DBNAME}_${DATE}"
BACKUP_FILE2="$BACKUP_DIR2/${DBNAME}_${DATE}"

# Log file to record backup status
LOG_FILE="/root/backup_logs.log"

# Ensure the backup directory exists; create if not
mkdir -p "$BACKUP_DIR"
mkdir -p "$BACKUP_DIR2"

# Run mongodump with the specified URI and log the output
if ./bin/mongodump --uri "$MONGO_URI" --out "$BACKUP_FILE" >> "$LOG_FILE" 2>&1; then
    echo "$(date): MongoDB backup successful" >> "$LOG_FILE"
else
    echo "$(date): MongoDB backup failed" >> "$LOG_FILE"
fi

if ./bin/mongodump --uri "$MONGO_URI" --out "$BACKUP_FILE2" >> "$LOG_FILE" 2>&1; then
    echo "$(date): MongoDB backup successful" >> "$LOG_FILE"
else
    echo "$(date): MongoDB backup failed" >> "$LOG_FILE"
fi 