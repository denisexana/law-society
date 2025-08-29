# Content Editor Backup & Update Guide

## New Feature: Backup & Update Content

The content editor now includes a third button in the JSON preview section that automatically creates a backup of your current `config/content.json` file and provides comprehensive update instructions.

## How to Use the New Backup Feature

### **Step 1: Open the Content Editor**
- Navigate to `content-editor.html` in your browser
- Fill in the content you want to update

### **Step 2: Generate Content First**
1. Click **"Generate Updated Content"** to create the JSON output
2. In the JSON preview section, click the new **"💾 Backup & Update Content"** button (orange button)

### **Step 3: What Happens Automatically**
1. **Backup Created**: A backup file is automatically downloaded with timestamp
   - Format: `content-backup-YYYY-MM-DDTHH-MM-SS.json`
   - Example: `content-backup-2024-08-29T10-30-00.json`

2. **New Content Generated**: The updated JSON content is generated and displayed

3. **Success Notifications**: You'll see helpful messages at the top-right of the screen

### **Step 4: Manual Update**
1. Copy the generated JSON content from the preview section
2. Open `config/content.json` in your text editor
3. Replace the entire content with the new JSON
4. Save the file

## Button Comparison

| Button | Purpose | Action |
|--------|---------|---------|
| **Generate Updated Content** | Generate new JSON | Creates the JSON output |
| **Load Default Content** | Reset to defaults | Loads original template content |
| **Backup & Update Content** | **NEW!** Safe backup | Creates backup + shows update instructions |

## Safety Features

- **Automatic Backup**: Always creates a backup before any changes
- **Timestamped Files**: Each backup has a unique timestamp
- **Error Handling**: Gracefully handles backup failures
- **User Notifications**: Clear feedback on what's happening

## Backup File Location

Backup files are downloaded to your browser's default download folder:
- **Windows**: Usually `Downloads` folder
- **Mac**: Usually `Downloads` folder  
- **Linux**: Usually `Downloads` folder

## Important Notes

- **Backup First**: Always use the backup button when making important changes
- **Keep Backups**: Store backup files in a safe location
- **Test Changes**: Verify your website works after updating content
- **Manual Process**: The actual file replacement is still manual for security

## Troubleshooting

### **Backup Fails**
- Ensure `config/content.json` exists and is readable
- Check file permissions
- Verify the file path is correct

### **Content Not Updating**
- Make sure you've manually saved the new content to `config/content.json`
- Refresh your website to see changes
- Check browser console for any JavaScript errors

## Best Practices

1. **Always use the backup button** for content updates
2. **Keep multiple backups** for major changes
3. **Test your website** after each content update
4. **Organize backups** by date and purpose
5. **Document changes** you make to content

---

## Command-Line Backup Tools (Advanced Users)

For users who prefer command-line operations, we've provided additional tools:

### **Node.js Script: `backup-and-update.js`**
```bash
# Create backup only
node backup-and-update.js backup

# Update content from a JSON file
node backup-and-update.js update new-content.json

# Create backup and update in one command
node backup-and-update.js backup-and-update '{"site": {"title": "New Title"}}'
```

### **Windows Batch File: `backup-and-update.bat`**
```cmd
backup-and-update.bat backup
backup-and-update.bat update new-content.json
backup-and-update.bat backup-and-update "{\"site\": {\"title\": \"New Title\"}}"
```

### **Linux/Mac Shell Script: `backup-and-update.sh`**
```bash
chmod +x backup-and-update.sh
./backup-and-update.sh backup
./backup-and-update.sh update new-content.json
./backup-and-update.sh backup-and-update '{"site": {"title": "New Title"}}'
```

## Troubleshooting

**Need Help?** Check the browser console for detailed error messages and ensure all file paths are correct.
