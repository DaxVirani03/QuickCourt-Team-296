# 📁 QuickCourt Project Structure

## 🎯 **New Organized Structure**

```
QuickCourt/
├── 📁 backend/                    # Backend (Node.js + Express + MongoDB)
│   ├── 📁 server/                # Server code
│   │   ├── 📁 models/           # MongoDB schemas
│   │   ├── 📁 routes/           # API endpoints
│   │   ├── 📁 middleware/       # Custom middleware
│   │   ├── 📁 utils/            # Utility functions
│   │   ├── 📁 uploads/          # File uploads
│   │   └── index.js             # Main server file
│   ├── package.json              # Backend dependencies
│   ├── package-lock.json         # Backend lock file
│   ├── node_modules/             # Backend node modules
│   └── .env                      # Environment variables
│
├── 📁 frontend/                   # Frontend (React + Tailwind CSS)
│   └── 📁 client/                # React application
│       ├── 📁 src/               # React source code
│       │   ├── 📁 components/    # React components
│       │   ├── 📁 contexts/      # React contexts
│       │   ├── 📁 pages/         # Page components
│       │   ├── App.js            # Main React app
│       │   ├── index.js          # React entry point
│       │   └── index.css         # Global styles
│       ├── 📁 public/            # Static assets
│       ├── package.json          # Frontend dependencies
│       ├── tailwind.config.js    # Tailwind configuration
│       └── postcss.config.js     # PostCSS configuration
│
├── package.json                   # Root project configuration
├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
├── GITHUB_SETUP.md               # GitHub setup guide
├── PROJECT_STRUCTURE.md           # This file
├── DEVELOPMENT_LOG.md             # Development progress log
├── hourly_commit.bat              # Windows commit script
├── hourly_commit.ps1              # PowerShell commit script
└── setup.js                       # Setup automation script
```

## 🚀 **How to Run the Project**

### **Option 1: Run Both Together (Recommended)**
```bash
# From project root
npm run dev
```

### **Option 2: Run Separately**

#### **Backend Only**
```bash
# From project root
npm run server

# Or from backend folder
cd backend
npm run server
```

#### **Frontend Only**
```bash
# From project root
npm run client

# Or from frontend folder
cd frontend/client
npm start
```

## 📦 **Installation Commands**

### **Install All Dependencies**
```bash
# From project root
npm run install-all
```

### **Install Separately**

#### **Backend Dependencies**
```bash
cd backend
npm install
```

#### **Frontend Dependencies**
```bash
cd frontend/client
npm install
```

## 🔧 **Development Workflow**

### **Backend Development**
```bash
# Navigate to backend
cd backend

# Start development server
npm run server

# The server will run on http://localhost:5000
```

### **Frontend Development**
```bash
# Navigate to frontend
cd frontend/client

# Start React development server
npm start

# The app will run on http://localhost:3000
```

### **Full Stack Development**
```bash
# From project root
npm run dev

# This will start both:
# - Backend on http://localhost:5000
# - Frontend on http://localhost:3000
```

## 📁 **Key File Locations**

### **Backend Files**
- **Server Entry**: `backend/server/index.js`
- **Database Models**: `backend/server/models/`
- **API Routes**: `backend/server/routes/`
- **Middleware**: `backend/server/middleware/`
- **Environment**: `backend/.env`
- **Dependencies**: `backend/package.json`

### **Frontend Files**
- **React Entry**: `frontend/client/src/index.js`
- **Main App**: `frontend/client/src/App.js`
- **Components**: `frontend/client/src/components/`
- **Styling**: `frontend/client/src/index.css`
- **Dependencies**: `frontend/client/package.json`

## 🎯 **Benefits of This Structure**

### **✅ Clear Separation**
- Backend and frontend are completely separate
- Easy to work on one without affecting the other
- Clear ownership of dependencies

### **✅ Easy Navigation**
- `backend/` - Everything server-related
- `frontend/` - Everything client-related
- No confusion about what goes where

### **✅ Independent Development**
- Backend team can work in `backend/`
- Frontend team can work in `frontend/client/`
- No conflicts or interference

### **✅ Easy Deployment**
- Backend can be deployed separately
- Frontend can be deployed to CDN
- Different hosting strategies possible

### **✅ Better Organization**
- Each folder has its own `package.json`
- Clear dependency management
- Easier to maintain and scale

## 🔄 **Git Workflow**

### **Hourly Commits**
```bash
# Run the automated script
./hourly_commit.bat

# Or manually
git add .
git commit -m "🔄 Hourly Update - $(date)"
git push origin main
```

### **Feature Development**
```bash
# Create feature branch
git checkout -b feature/new-feature

# Work on backend
cd backend
# ... make changes ...

# Work on frontend
cd frontend/client
# ... make changes ...

# Commit and push
git add .
git commit -m "✨ Add new feature"
git push origin feature/new-feature
```

## 📝 **Notes**

- **Environment Variables**: Store in `backend/.env`
- **Uploads**: Files go to `backend/server/uploads/`
- **Build Output**: Frontend builds to `frontend/client/build/`
- **Dependencies**: Each folder manages its own dependencies
- **Scripts**: Root `package.json` has convenience scripts

---

**🎉 This structure makes development much easier and more organized!** 