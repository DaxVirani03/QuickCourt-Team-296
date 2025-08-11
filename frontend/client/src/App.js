import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import VerifyEmail from './components/auth/VerifyEmail';

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

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/venues" element={<VenuesPage />} />
      <Route path="/venues/:id" element={<VenueDetailPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

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
  );
}

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Layout>
              <AppRoutes />
            </Layout>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
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