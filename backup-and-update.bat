@echo off
echo 🔄 Backup and Update Script for Surrey Students' Law Society Website
echo ================================================================
echo.

if "%1"=="" (
    echo Usage:
    echo   backup-and-update.bat backup                    # Create backup only
    echo   backup-and-update.bat update ^<json-file^>        # Update content.json
    echo   backup-and-update.bat backup-and-update ^<json^>  # Both operations
    echo.
    echo Examples:
    echo   backup-and-update.bat backup
    echo   backup-and-update.bat update new-content.json
    echo   backup-and-update.bat backup-and-update "{\"site\": {\"title\": \"New Title\"}}"
    echo.
    pause
    exit /b
)

echo Running: node backup-and-update.js %*
node backup-and-update.js %*

echo.
echo Script execution complete!
pause
