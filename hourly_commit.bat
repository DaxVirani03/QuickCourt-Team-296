@echo off
echo 🏀 QuickCourt - Hourly Development Update
echo ======================================

REM Get current timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "datestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

echo 📅 Current time: %datestamp%
echo 📁 Project structure: frontend/ + backend/

REM Check if there are changes
git status --porcelain > temp_status.txt
set /p changes=<temp_status.txt
del temp_status.txt

if "%changes%"=="" (
    echo ℹ️ No changes detected. Skipping commit.
    pause
    exit /b
)

echo 🔄 Changes detected. Committing...

REM Add all changes
git add .

REM Create commit message with timestamp
set commit_message=🔄 Hourly Update - %datestamp%

REM Commit changes
git commit -m "%commit_message%

- Progressive development update
- Timestamp: %datestamp%
- Auto-generated commit
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express + MongoDB"

REM Push to GitHub
git push origin main

echo ✅ Hourly commit completed successfully!
echo 📅 Timestamp: %datestamp%
echo 🚀 Changes pushed to GitHub
echo 📁 Structure: frontend/ (React) + backend/ (Node.js)

pause 