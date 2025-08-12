# QuickCourt - Local Sports Booking Platform

A complete MERN stack application for booking local sports facilities and courts. Built with MongoDB, Express.js, React.js, and Node.js with full authentication, role-based access control, and real-time booking management.

## 🏀 Features

### User Features
- **Home Page**: Welcome banner, popular venues, search functionality
- **Venue Browsing**: Filter by sport type, price, location, and rating
- **Court Booking**: Date/time selection with real-time availability
- **My Bookings**: View, manage, and cancel bookings
- **Profile Management**: Update personal information and preferences
- **Reviews & Ratings**: Rate facilities and read other users' reviews

### Facility Owner Features
- **Dashboard**: KPI overview and booking trends
- **Facility Management**: Add, edit, and manage sports facilities
- **Court Management**: Configure courts, pricing, and availability
- **Booking Overview**: View and manage incoming bookings
- **Analytics**: Track revenue and booking statistics

### Admin Features
- **Dashboard**: System-wide statistics and monitoring
- **Facility Approval**: Review and approve new facility submissions
- **User Management**: Manage user accounts and roles
- **System Analytics**: Comprehensive reporting and insights

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email notifications
- **Joi/express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **Recharts** - Data visualization
- **React DatePicker** - Date selection
- **Framer Motion** - Animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- MongoDB Compass (for database management)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd QuickCourt
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration
```bash
# Copy environment example
cp env.example .env

# Edit .env file with your configuration
nano .env
```

Required environment variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickcourt
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000
```

### 4. Database Setup
1. Start MongoDB service
2. Open MongoDB Compass
3. Connect to `mongodb://localhost:27017`
4. Create database named `quickcourt`

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# Run both backend and frontend concurrently
npm run dev
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

#### Separate Development
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## 📁 Project Structure

```
QuickCourt/
├── server/                 # Backend code
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── uploads/           # File uploads
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── package.json           # Backend dependencies
└── README.md             # Project documentation
```

## 🔐 Authentication & Roles

### User Roles
1. **User**: Can browse venues, make bookings, and manage profile
2. **Facility Owner**: Can manage facilities, courts, and view bookings
3. **Admin**: Full system access and user management

### Authentication Flow
1. User registration with email verification
2. JWT-based authentication
3. Role-based route protection
4. Password reset functionality

## 📊 Database Models

### Core Models
- **User**: User accounts and authentication
- **Facility**: Sports venues and facilities
- **Court**: Individual courts within facilities
- **Booking**: Court reservations and payments
- **Review**: User reviews and ratings

### Relationships
- User → Facility (Owner relationship)
- Facility → Court (One-to-many)
- User → Booking (One-to-many)
- Facility → Booking (One-to-many)
- Court → Booking (One-to-many)
- User → Review (One-to-many)
- Facility → Review (One-to-many)

## 🎨 UI/UX Features

### Design System
- **Colors**: Primary blue theme with sport-specific colors
- **Typography**: Inter for body text, Poppins for headings
- **Components**: Reusable button, input, card components
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and micro-interactions

### Key Components
- **Hero Section**: Eye-catching landing page
- **Venue Cards**: Rich facility information display
- **Booking Flow**: Step-by-step booking process
- **Dashboard Cards**: KPI and statistics display
- **Modal Dialogs**: Confirmation and form dialogs

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Facilities
- `GET /api/facilities` - Get all facilities
- `GET /api/facilities/:id` - Get facility details
- `POST /api/facilities` - Create facility (Owner/Admin)
- `PUT /api/facilities/:id` - Update facility
- `DELETE /api/facilities/:id` - Delete facility

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/availability/:courtId` - Check availability

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/facility/:facilityId` - Get facility reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Add Heroku remote
heroku git:remote -a your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

## 🧪 Testing

### Backend Testing
```bash
# Run backend tests
npm test

# Run with coverage
npm run test:coverage
```

### Frontend Testing
```bash
cd client
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team Members & Roles  

| Name        | Role                          | Responsibilities |
|-------------|-------------------------------|------------------|
| 🏀 **Rudra**  | 🎯 Frontend Developer          | Builds UI with React & Tailwind CSS, ensures responsive layouts, optimizes performance for a smooth booking experience. |
| 🎨 **Dax**    | 🖌️ UI/UX & Frontend Developer  | Designs intuitive user experiences, creates wireframes & prototypes, styles and animates the interface for engagement. |
| 💻 **Tirth**  | ⚙️ Backend Developer & Project Coordinator | Develops REST APIs with Node.js/Express, manages server-side logic, and integrates frontend with backend services. |
| 🗄️ **Hemang** | 📊 Backend & Database Engineer | Designs MongoDB schema, writes efficient queries, ensures data security, and maintains database performance. |


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Email: support@quickcourt.com
- Documentation: [docs.quickcourt.com](https://docs.quickcourt.com)

## 🙏 Acknowledgments

- [Excalidraw](https://excalidraw.com/) for UI mockups
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [MongoDB](https://www.mongodb.com/) for database
- [Express.js](https://expressjs.com/) for backend framework

---

**QuickCourt** - Making sports accessible to everyone! 🏀⚽🎾 
