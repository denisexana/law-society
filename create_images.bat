@echo off
echo 🎨 Creating Combined Images for Surrey Students' Law Society Website
echo ================================================================
echo.

echo 📦 Installing required packages...
pip install -r requirements.txt

echo.
echo 🚀 Running image creation script...
python create_combined_images.py

echo.
echo ✅ Script execution complete!
echo.
pause
