#!/bin/bash

echo "🔄 Backup and Update Script for Surrey Students' Law Society Website"
echo "================================================================"
echo

if [ $# -eq 0 ]; then
    echo "Usage:"
    echo "  ./backup-and-update.sh backup                    # Create backup only"
    echo "  ./backup-and-update.sh update <json-file>        # Update content.json"
    echo "  ./backup-and-update.sh backup-and-update <json>  # Both operations"
    echo
    echo "Examples:"
    echo "  ./backup-and-update.sh backup"
    echo "  ./backup-and-update.sh update new-content.json"
    echo "  ./backup-and-update.sh backup-and-update '{\"site\": {\"title\": \"New Title\"}}'"
    echo
    exit 1
fi

echo "Running: node backup-and-update.js $*"
node backup-and-update.js "$@"

echo
echo "Script execution complete!"
