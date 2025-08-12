# 🚀 GitHub Setup & Progressive Development Guide

## 📋 Prerequisites

### 1. Install Git
**Windows:**
- Download from: https://git-scm.com/download/win
- Install with default settings
- Restart terminal/PowerShell

**Alternative (if you have Chocolatey):**
```bash
choco install git
```

**Alternative (if you have Winget):**
```bash
winget install --id Git.Git -e --source winget
```

### 2. Verify Git Installation
```bash
git --version
```

## 🔗 Connect to GitHub Repository

### Step 1: Initialize Git Repository
```bash
# Navigate to your project directory
cd C:\Users\Hemang\Desktop\Odoo

# Initialize git repository
git init

# Configure your Git identity
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Add Remote Repository
```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub details
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote connection
git remote -v
```

### Step 3: Create .gitignore File
Create a `.gitignore` file in your project root:

```bash
# Create .gitignore file
echo "# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
/build
/dist

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Uploads directory (contains user uploaded files)
server/uploads/*
!server/uploads/.gitkeep

# Logs
logs
*.log

# Temporary files
tmp/
temp/" > .gitignore
```

### Step 4: Initial Commit
```bash
# Add all files to staging
git add .

# Make initial commit
git commit -m "🎉 Initial commit: QuickCourt MERN stack application

- Complete backend with Express.js and MongoDB
- User authentication with JWT
- Role-based access control (User, Facility Owner, Admin)
- Facility and court management
- Booking system with availability checking
- Review and rating system
- React frontend with Tailwind CSS
- Responsive design and modern UI components
- MongoDB Compass integration ready"

# Push to GitHub
git push -u origin main
```

## ⏰ Progressive Development with Hourly Commits

### Automated Commit Script
Create a script to automate hourly commits:

```bash
# Create commit script
echo "@echo off
echo 🏀 QuickCourt - Hourly Development Update
echo ======================================

REM Get current timestamp
for /f \"tokens=2 delims==\" %%a in ('wmic OS Get localdatetime /value') do set \"dt=%%a\"
set \"YY=%dt:~2,2%\" & set \"YYYY=%dt:~0,4%\" & set \"MM=%dt:~4,2%\" & set \"DD=%dt:~6,2%\"
set \"HH=%dt:~8,2%\" & set \"Min=%dt:~10,2%\" & set \"Sec=%dt:~12,2%\"
set \"datestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%\"

REM Check if there are changes
git status --porcelain > temp_status.txt
set /p changes=<temp_status.txt
del temp_status.txt

if \"%changes%\"==\"\" (
    echo No changes detected. Skipping commit.
    exit /b
)

REM Add all changes
git add .

REM Create commit message with timestamp
set commit_message=🔄 Hourly Update - %datestamp%

REM Commit changes
git commit -m \"%commit_message%%

- Progressive development update
- Timestamp: %datestamp%
- Auto-generated commit\"

REM Push to GitHub
git push origin main

echo ✅ Hourly commit completed successfully!
echo 📅 Timestamp: %datestamp%
" > hourly_commit.bat
```

### Manual Hourly Commit Process
If you prefer manual commits, follow this process:

```bash
# 1. Check what files have changed
git status

# 2. Add specific files or all changes
git add .

# 3. Create descriptive commit message
git commit -m "🔄 Hourly Update - $(date '+%Y-%m-%d %H:%M:%S')

- [Feature] Added user authentication system
- [Fix] Resolved booking validation issue
- [UI] Updated venue card design
- [API] Enhanced facility search endpoint"

# 4. Push to GitHub
git push origin main
```

## 📊 Development Tracking

### Commit Message Templates
Use these templates for different types of changes:

```bash
# Feature development
git commit -m "✨ [Feature] User authentication system

- JWT token implementation
- Login/logout functionality
- Password reset flow
- Email verification"

# Bug fixes
git commit -m "🐛 [Fix] Booking validation error

- Fixed date validation logic
- Resolved time slot conflict issue
- Updated error messages"

# UI improvements
git commit -m "🎨 [UI] Enhanced venue cards

- Added hover effects
- Improved responsive design
- Updated color scheme
- Added loading states"

# API enhancements
git commit -m "🔧 [API] Enhanced facility search

- Added filtering by sport type
- Implemented price range search
- Added location-based sorting
- Optimized query performance"

# Database changes
git commit -m "🗄️ [DB] Updated user model

- Added phone number field
- Enhanced address structure
- Added preferences object
- Updated validation rules"
```

### Development Branches
Create feature branches for major development:

```bash
# Create and switch to feature branch
git checkout -b feature/user-authentication

# Make changes and commit
git add .
git commit -m "✨ Add user authentication system"

# Push feature branch
git push origin feature/user-authentication

# Merge back to main when complete
git checkout main
git merge feature/user-authentication
git push origin main

# Delete feature branch
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

## 🔄 Automated Workflow

### Windows Task Scheduler (Automated Hourly Commits)
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger to "Daily" and repeat every 1 hour
4. Action: Start a program
5. Program: `cmd.exe`
6. Arguments: `/c "cd /d C:\Users\Hemang\Desktop\Odoo && hourly_commit.bat"`

### PowerShell Script Alternative
Create `hourly_commit.ps1`:

```powershell
# Navigate to project directory
Set-Location "C:\Users\Hemang\Desktop\Odoo"

# Check for changes
$status = git status --porcelain

if ($status) {
    # Add all changes
    git add .
    
    # Create commit message
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "🔄 Hourly Update - $timestamp`n`n- Progressive development update`n- Timestamp: $timestamp`n- Auto-generated commit"
    
    # Commit and push
    git commit -m $commitMessage
    git push origin main
    
    Write-Host "✅ Hourly commit completed at $timestamp"
} else {
    Write-Host "ℹ️ No changes detected. Skipping commit."
}
```

## 📈 Progress Tracking

### Development Log
Create a development log file:

```bash
# Create development log
echo "# QuickCourt Development Log

## Project Progress

### Day 1 - Initial Setup
- [x] Project structure created
- [x] Backend models implemented
- [x] API routes configured
- [x] Frontend setup with React
- [x] Authentication system
- [x] Database integration

### Day 2 - Core Features
- [ ] User registration and login
- [ ] Facility management
- [ ] Court booking system
- [ ] Payment integration
- [ ] Review system

### Day 3 - Advanced Features
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Email notifications
- [ ] Mobile responsiveness
- [ ] Testing and optimization

## Hourly Updates

### $(date '+%Y-%m-%d %H:%M:%S')
- Initial project setup
- Backend API structure
- Database models
- Authentication middleware

" > DEVELOPMENT_LOG.md
```

### GitHub Issues for Task Tracking
Create issues for each major feature:

```bash
# Example issues to create:
# 1. User Authentication System
# 2. Facility Management
# 3. Court Booking System
# 4. Payment Integration
# 5. Admin Dashboard
# 6. Review System
# 7. Email Notifications
# 8. Mobile Responsiveness
# 9. Testing and Optimization
# 10. Deployment Setup
```

## 🚀 Quick Start Commands

```bash
# 1. Initialize and connect to GitHub
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 2. First commit
git add .
git commit -m "🎉 Initial commit: QuickCourt MERN stack application"
git push -u origin main

# 3. Start development with hourly commits
# Run this every hour or set up automation:
git add .
git commit -m "🔄 Hourly Update - $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
```

## 📱 GitHub Mobile App
Install GitHub mobile app to monitor commits on the go:
- iOS: App Store
- Android: Google Play Store

## 🔔 Notifications
Enable GitHub notifications for:
- Repository activity
- Pull request reviews
- Issue updates
- Commit comments

---

**Happy Coding! 🏀⚽🎾** 