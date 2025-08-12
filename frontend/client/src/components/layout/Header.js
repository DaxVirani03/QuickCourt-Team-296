import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Home, Calendar, MapPin, Building2, Menu, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  const navItems = [
    ...(user.role === 'user' ? [{ to: '/venues', icon: MapPin, label: 'Venues' }] : []),
    ...(user.role === 'facility_owner' ? [{ to: '/owner/facilities', icon: Building2, label: 'Facilities' }] : []),
    { to: user.role === 'facility_owner' ? '/owner/dashboard' : '/dashboard', icon: Home, label: 'Dashboard' },
    { to: user.role === 'facility_owner' ? '/owner/bookings' : '/my-bookings', icon: Calendar, label: 'Bookings' }
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link to={user.role === 'facility_owner' ? '/owner/dashboard' : '/dashboard'} className="flex items-center space-x-3 group">
              <motion.div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <Trophy className="text-white w-6 h-6" />
              </motion.div>
              <span className="text-2xl font-bold text-gray-900">QuickCourt</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div key={item.to} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                <Link
                  to={item.to}
                  className={`group relative flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive(item.to)
                      ? 'text-blue-600 bg-blue-50 border-2 border-blue-200 shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 border-2 border-transparent hover:border-blue-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-all duration-300 ${isActive(item.to) ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}`} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <motion.div className="hidden md:flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user.fullName}</p>
                <p className="text-blue-600 font-medium capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            </motion.div>

            <motion.button onClick={handleLogout} className="hidden md:inline-flex items-center px-4 py-2 border-2 border-gray-200 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 shadow-md hover:shadow-lg" whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.95 }}>
              <span className="sr-only">Logout</span>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </motion.button>

            {/* Mobile menu button */}
            <motion.button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200" whileTap={{ scale: 0.95 }}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.div key={item.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.3 }}>
                  <Link to={item.to} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive(item.to) ? 'text-blue-600 bg-blue-50 border-2 border-blue-200' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'}`}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.1, duration: 0.3 }} className="pt-4 border-t border-gray-200">
                <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 