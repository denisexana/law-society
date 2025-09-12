#!/usr/bin/env node

/**
 * Helper script to update article titles in HTML files
 * Usage: node update-article-titles.js <article-file> <new-title>
 * Example: node update-article-titles.js articles/legal-writing-workshop.html "The Law Ball"
 */

const fs = require('fs');
const path = require('path');

function updateArticleTitle(articlePath, newTitle) {
    try {
        // Read the article file
        const content = fs.readFileSync(articlePath, 'utf8');
        
        // Update the h2 title in the banner section (look for h2 after the logo div)
        const bannerTitleRegex = /<div class="logo">[\s\S]*?<h2[^>]*>.*?<\/h2>/;
        const bannerSection = content.match(bannerTitleRegex);
        let updatedContent;
        
        if (bannerSection) {
            const updatedBannerSection = bannerSection[0].replace(/<h2[^>]*>.*?<\/h2>/, `<h2>${newTitle}</h2>`);
            updatedContent = content.replace(bannerTitleRegex, updatedBannerSection);
        } else {
            // Fallback: update first h2 tag
            const titleRegex = /<h2[^>]*>.*?<\/h2>/;
            const newTitleTag = `<h2>${newTitle}</h2>`;
            updatedContent = content.replace(titleRegex, newTitleTag);
        }
        
        // Update the page title in the head
        const pageTitleRegex = /<title>.*?<\/title>/;
        const newPageTitle = `<title>${newTitle} - Surrey Students' Law Society</title>`;
        const finalContent = updatedContent.replace(pageTitleRegex, newPageTitle);
        
        // Write the updated content back to the file
        fs.writeFileSync(articlePath, finalContent, 'utf8');
        
        console.log(`✅ Updated article: ${articlePath}`);
        console.log(`   New title: "${newTitle}"`);
        
    } catch (error) {
        console.error(`❌ Error updating article ${articlePath}:`, error.message);
        process.exit(1);
    }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.log('Usage: node update-article-titles.js <article-file> <new-title>');
    console.log('Example: node update-article-titles.js articles/legal-writing-workshop.html "The Law Ball"');
    process.exit(1);
}

const [articlePath, newTitle] = args;

// Check if file exists
if (!fs.existsSync(articlePath)) {
    console.error(`❌ File not found: ${articlePath}`);
    process.exit(1);
}

// Update the article
updateArticleTitle(articlePath, newTitle);
