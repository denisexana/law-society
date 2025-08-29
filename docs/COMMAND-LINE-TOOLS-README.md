# Command-Line Backup & Update Tools

## Overview

These command-line tools provide an alternative way to backup and update your `config/content.json` file, especially useful for:
- **Automation scripts**
- **CI/CD pipelines**
- **Power users** who prefer command-line operations
- **Server environments** where GUI access is limited

## Files Included

- **`backup-and-update.js`** - Main Node.js script
- **`backup-and-update.bat`** - Windows batch file wrapper
- **`backup-and-update.sh`** - Linux/Mac shell script wrapper

## Quick Start

### **Prerequisites**
- Node.js installed on your system
- Access to command line/terminal

### **Basic Usage**

#### **1. Create a Backup Only**
```bash
# Using Node.js directly
node backup-and-update.js backup

# Using Windows batch file
backup-and-update.bat backup

# Using Linux/Mac shell script
./backup-and-update.sh backup
```

#### **2. Update Content from a JSON File**
```bash
# Using Node.js directly
node backup-and-update.js update new-content.json

# Using Windows batch file
backup-and-update.bat update new-content.json

# Using Linux/Mac shell script
./backup-and-update.sh update new-content.json
```

#### **3. Backup and Update in One Command**
```bash
# Using Node.js directly
node backup-and-update.js backup-and-update '{"site": {"title": "New Title"}}'

# Using Windows batch file
backup-and-update.bat backup-and-update "{\"site\": {\"title\": \"New Title\"}}"

# Using Linux/Mac shell script
./backup-and-update.sh backup-and-update '{"site": {"title": "New Title"}}'
```

## Detailed Usage

### **Node.js Script (`backup-and-update.js`)**

#### **Commands**
- **`backup`** - Creates a timestamped backup of current `config/content.json`
- **`update <json-file>`** - Updates `config/content.json` with content from a file
- **`backup-and-update <json>`** - Creates backup then updates with provided JSON

#### **Examples**
```bash
# Create backup
node backup-and-update.js backup

# Update from file
node backup-and-update.js update my-content.json

# Update with inline JSON
node backup-and-update.js update '{"site": {"title": "New Title"}}'

# Backup and update
node backup-and-update.js backup-and-update '{"site": {"title": "New Title"}}'
```

### **Windows Batch File (`backup-and-update.bat`)**

#### **Features**
- **Double-click friendly** - Can be run by double-clicking
- **Parameter passing** - Passes all arguments to the Node.js script
- **Pause on completion** - Waits for user input before closing

#### **Usage**
```cmd
# Double-click to see help
backup-and-update.bat

# Create backup
backup-and-update.bat backup

# Update content
backup-and-update.bat update new-content.json
```

### **Linux/Mac Shell Script (`backup-and-update.sh`)**

#### **Setup and Usage**
```bash
# Make executable
chmod +x backup-and-update.sh

# Run with help
./backup-and-update.sh

# Create backup
./backup-and-update.sh backup

# Update content
./backup-and-update.sh update new-content.json
```

## File Structure

After running the backup command, your project structure will look like:

```
your-website/
├── config/
│   └── content.json              ← Current content
├── content-backup/               ← Created automatically
│   ├── content-backup-2024-08-29T10-30-00.json
│   ├── content-backup-2024-08-29T11-15-30.json
│   └── ... more backups
├── backup-and-update.js          ← Main script
├── backup-and-update.bat         ← Windows wrapper
├── backup-and-update.sh          ← Linux/Mac wrapper
└── ... other files
```

## Safety Features

- **Automatic backup directory creation**
- **Timestamped backup files** prevent overwrites
- **Error handling** with clear messages
- **File existence checks** before operations
- **Directory creation** if config folder doesn't exist

## Integration with Content Editor

These tools work alongside the web-based content editor:

1. **Use the content editor** to generate new JSON content
2. **Copy the generated JSON** to a file or use inline
3. **Run the command-line tool** to backup and update
4. **Verify changes** by refreshing your website

## Important Notes

- **Backup first** - Always create a backup before updating
- **Test changes** - Verify your website works after updates
- **Keep backups** - Store backup files in a safe location
- **File permissions** - Ensure the script has read/write access
- **Node.js required** - Must have Node.js installed to use these tools
