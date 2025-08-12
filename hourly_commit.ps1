# QuickCourt - Hourly Development Update Script
# PowerShell version for automated commits

Write-Host "🏀 QuickCourt - Hourly Development Update" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Navigate to project directory
Set-Location "C:\Users\Hemang\Desktop\Odoo"

# Get current timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Host "📅 Current time: $timestamp" -ForegroundColor Yellow
Write-Host "📁 Project structure: frontend/ + backend/" -ForegroundColor Green

# Check for changes
$status = git status --porcelain

if (-not $status) {
    Write-Host "ℹ️ No changes detected. Skipping commit." -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit
}

Write-Host "🔄 Changes detected. Committing..." -ForegroundColor Green

# Add all changes
git add .

# Create commit message
$commitMessage = @"
🔄 Hourly Update - $timestamp

- Progressive development update
- Timestamp: $timestamp
- Auto-generated commit
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express + MongoDB
"@

# Commit and push
git commit -m $commitMessage
git push origin main

Write-Host "✅ Hourly commit completed successfully!" -ForegroundColor Green
Write-Host "📅 Timestamp: $timestamp" -ForegroundColor Cyan
Write-Host "🚀 Changes pushed to GitHub" -ForegroundColor Green
Write-Host "📁 Structure: frontend/ (React) + backend/ (Node.js)" -ForegroundColor Magenta

Read-Host "Press Enter to continue" 