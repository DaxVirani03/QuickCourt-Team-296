import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';

// Layout Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';

// Public Pages
import HomePage from './pages/HomePage';
import VenuesPage from './pages/VenuesPage';
import VenueDetailPage from './pages/VenueDetailPage';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// User Pages
import UserDashboardPage from './pages/user/UserDashboardPage';
import MyBookingsPage from './pages/user/MyBookingsPage';
import BookingPage from './pages/user/BookingPage';
import ProfilePage from './pages/user/ProfilePage';

// Facility Owner Pages
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage';
import FacilityManagementPage from './pages/owner/FacilityManagementPage';
import CourtManagementPage from './pages/owner/CourtManagementPage';
import BookingOverviewPage from './pages/owner/BookingOverviewPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import FacilityApprovalPage from './pages/admin/FacilityApprovalPage';
import UserManagementPage from './pages/admin/UserManagementPage';

// Error Pages
import NotFoundPage from './pages/NotFoundPage';

// Loading Component
import LoadingSpinner from './components/common/LoadingSpinner';

// Page transition variants (horizontal slide)
const pageVariants = {
  initial: {
    opacity: 0,
    x: 40,
    scale: 0.98
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: -40,
    scale: 0.98
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:id" element={<VenueDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['user']}>
                <UserDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['user']}>
                <MyBookingsPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/book/:facilityId/:courtId" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['user']}>
                <BookingPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* Protected Facility Owner Routes */}
          <Route path="/owner/dashboard" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['facility_owner']}>
                <OwnerDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/owner/facilities" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['facility_owner']}>
                <FacilityManagementPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/owner/facilities/:id/courts" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['facility_owner']}>
                <CourtManagementPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/owner/bookings" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['facility_owner']}>
                <BookingOverviewPage />
              </RoleRoute>
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/admin/facilities/approval" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['admin']}>
                <FacilityApprovalPage />
              </RoleRoute>
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={['admin']}>
                <UserManagementPage />
              </RoleRoute>
            </ProtectedRoute>
          } />

          {/* Error Routes */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading QuickCourt..." />
      </div>
    );
  }

  return <AnimatedRoutes />;
}

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
            <Layout>
              <AppRoutes />
            </Layout>
            
            {/* Enhanced Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                success: {
                  duration: 3000,
                  iconTheme: { primary: '#22c55e', secondary: '#fff' },
                  style: { border: '1px solid rgba(34, 197, 94, 0.3)', background: 'rgba(34, 197, 94, 0.05)' },
                },
                error: {
                  duration: 5000,
                  iconTheme: { primary: '#ef4444', secondary: '#fff' },
                  style: { border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' },
                },
                loading: {
                  style: { border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(59, 130, 246, 0.05)' },
                },
              }}
            />
          </div>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App; 