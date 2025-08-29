#!/usr/bin/env node
/**
 * Backup and Update Script for Surrey Students' Law Society Website
 * 
 * This script can be run from the command line to:
 * 1. Create a backup of config/content.json
 * 2. Update config/content.json with new content
 * 
 * Usage:
 *   node backup-and-update.js backup                    # Create backup only
 *   node backup-and-update.js update <json-file>        # Update content.json
 *   node backup-and-update.js backup-and-update <json>  # Both operations
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_FILE = 'config/content.json';
const BACKUP_DIR = 'content-backup';

// Ensure backup directory exists
function ensureBackupDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        console.log(`✅ Created backup directory: ${BACKUP_DIR}`);
    }
}

// Create backup of current content.json
function createBackup() {
    try {
        if (!fs.existsSync(CONTENT_FILE)) {
            throw new Error(`Content file not found: ${CONTENT_FILE}`);
        }

        // Read current content
        const currentContent = fs.readFileSync(CONTENT_FILE, 'utf8');
        
        // Create timestamped backup filename
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const backupFilename = `content-backup-${timestamp}.json`;
        const backupPath = path.join(BACKUP_DIR, backupFilename);
        
        // Write backup file
        fs.writeFileSync(backupPath, currentContent, 'utf8');
        
        console.log(`✅ Backup created successfully: ${backupPath}`);
        return backupPath;
        
    } catch (error) {
        console.error(`❌ Backup failed: ${error.message}`);
        return null;
    }
}

// Update content.json with new content
function updateContent(newContent) {
    try {
        // Ensure config directory exists
        const configDir = path.dirname(CONTENT_FILE);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        
        // Write new content
        fs.writeFileSync(CONTENT_FILE, newContent, 'utf8');
        console.log(`✅ Content updated successfully: ${CONTENT_FILE}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Content update failed: ${error.message}`);
        return false;
    }
}

// Main function
function main() {
    const command = process.argv[2];
    
    if (!command) {
        console.log(`
🔄 Backup and Update Script for Surrey Students' Law Society Website

Usage:
  node backup-and-update.js backup                    # Create backup only
  node backup-and-update.js update <json-file>        # Update content.json
  node backup-and-update.js backup-and-update <json>  # Both operations

Examples:
  node backup-and-update.js backup
  node backup-and-update.js update new-content.json
  node backup-and-update.js backup-and-update '{"site": {"title": "New Title"}}'
        `);
        return;
    }
    
    switch (command) {
        case 'backup':
            createBackup();
            break;
            
        case 'update':
            const jsonFile = process.argv[3];
            if (!jsonFile) {
                console.error('❌ Please provide a JSON file path or JSON content');
                return;
            }
            
            let content;
            if (fs.existsSync(jsonFile)) {
                // Read from file
                content = fs.readFileSync(jsonFile, 'utf8');
            } else {
                // Treat as JSON string
                content = jsonFile;
            }
            
            updateContent(content);
            break;
            
        case 'backup-and-update':
            const jsonContent = process.argv[3];
            if (!jsonContent) {
                console.error('❌ Please provide JSON content to update with');
                return;
            }
            
            console.log('🔄 Creating backup and updating content...');
            const backupPath = createBackup();
            if (backupPath) {
                updateContent(jsonContent);
            }
            break;
            
        default:
            console.error(`❌ Unknown command: ${command}`);
            console.log('Use "backup", "update", or "backup-and-update"');
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { createBackup, updateContent, ensureBackupDir };
