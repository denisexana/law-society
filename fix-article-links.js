#!/usr/bin/env node
/**
 * Fix Article Links Script
 * 
 * This script fixes broken article links in config/content.json
 * by replacing "#" links with proper article paths.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_FILE = 'config/content.json';
const BACKUP_DIR = 'content-backup';

// Article link mappings
const ARTICLE_LINKS = {
    "Legal Writing Workshop": "articles/legal-writing-workshop.html",
    "Networking Events": "articles/networking-events.html", 
    "Moot Court Competition": "articles/moot-court-competition.html",
    "Social Events": "articles/social-events.html"
};

// Create backup directory
function ensureBackupDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        console.log(`✅ Created backup directory: ${BACKUP_DIR}`);
    }
}

// Fix article links
function fixArticleLinks() {
    try {
        // Check if content.json exists
        if (!fs.existsSync(CONTENT_FILE)) {
            throw new Error(`Content file not found: ${CONTENT_FILE}`);
        }

        // Read current content
        console.log('📖 Reading current content.json...');
        const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
        
        // Create backup
        ensureBackupDir();
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const backupFilename = `content-backup-before-fix-${timestamp}.json`;
        const backupPath = path.join(BACKUP_DIR, backupFilename);
        
        fs.writeFileSync(backupPath, JSON.stringify(content, null, 2), 'utf8');
        console.log(`✅ Backup created: ${backupPath}`);

        // Fix article links
        console.log('🔧 Fixing article links...');
        let fixedCount = 0;
        
        if (content.sections && content.sections.events && content.sections.events.items) {
            content.sections.events.items.forEach((event, index) => {
                if (event.title && ARTICLE_LINKS[event.title]) {
                    const oldLink = event.link;
                    const newLink = ARTICLE_LINKS[event.title];
                    
                    if (oldLink === '#' || oldLink === '' || !oldLink) {
                        event.link = newLink;
                        console.log(`✅ Fixed "${event.title}": ${oldLink} → ${newLink}`);
                        fixedCount++;
                    } else if (oldLink !== newLink) {
                        console.log(`⚠️  "${event.title}" has unexpected link: ${oldLink} (expected: ${newLink})`);
                    }
                } else {
                    console.log(`⚠️  Event ${index + 1} has no title or unknown title: "${event.title}"`);
                }
            });
        } else {
            throw new Error('Events section not found in content.json');
        }

        // Save fixed content
        console.log('💾 Saving fixed content...');
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
        
        console.log(`\n🎉 Article links fixed successfully!`);
        console.log(`📊 Summary:`);
        console.log(`   - Backup created: ${backupPath}`);
        console.log(`   - Links fixed: ${fixedCount}`);
        console.log(`   - File updated: ${CONTENT_FILE}`);
        
        if (fixedCount === 0) {
            console.log(`\nℹ️  No broken links found. Your content.json is already correct!`);
        }
        
        return true;
        
    } catch (error) {
        console.error(`❌ Error fixing article links: ${error.message}`);
        return false;
    }
}

// Main execution
if (require.main === module) {
    console.log('🔧 Fixing Article Links in config/content.json');
    console.log('=============================================\n');
    
    const success = fixArticleLinks();
    
    if (success) {
        console.log('\n✅ Script completed successfully!');
        console.log('🔄 Please refresh your website and test the "LEARN MORE" buttons.');
    } else {
        console.log('\n❌ Script failed. Please check the error messages above.');
        process.exit(1);
    }
}

module.exports = { fixArticleLinks, ensureBackupDir };
