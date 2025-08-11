#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏀 QuickCourt Setup Script');
console.log('========================\n');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js ${nodeVersion} detected`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v16 or higher.');
  process.exit(1);
}

// Check if npm is available
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm ${npmVersion} detected`);
} catch (error) {
  console.error('❌ npm is not available. Please install npm.');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env file...');
  
  const envContent = `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickcourt
JWT_SECRET=quickcourt_jwt_secret_key_2024_${Date.now()}
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000`;

  // Ensure backend directory exists
  if (!fs.existsSync(path.join(__dirname, 'backend'))) {
    fs.mkdirSync(path.join(__dirname, 'backend'), { recursive: true });
  }

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully in backend folder');
  console.log('⚠️  Please update the email configuration in backend/.env file');
} else {
  console.log('✅ .env file already exists');
}

// Install root dependencies
console.log('\n📦 Installing root dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
} catch (error) {
  console.error('❌ Failed to install root dependencies');
  process.exit(1);
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'frontend', 'client'), stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'backend', 'server', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Uploads directory created');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Update the backend/.env file with your email configuration');
console.log('3. Run the application: npm run dev');
console.log('\n📁 Project Structure:');
console.log('├── backend/          # Node.js + Express server');
console.log('│   ├── server/       # Server code');
console.log('│   ├── package.json  # Backend dependencies');
console.log('│   └── .env          # Environment variables');
console.log('├── frontend/         # React application');
console.log('│   └── client/       # React source code');
console.log('└── package.json      # Root project configuration');
console.log('\n🚀 Happy coding! 🏀'); 