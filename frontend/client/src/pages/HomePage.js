import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building, Users, Calendar, Star, ArrowRight, Trophy, Zap, Target, MapPin, Clock, Shield, Award, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const carouselSlides = [
    {
      title: "Premium Sports Facilities",
      description: "Access the best courts and facilities in your area",
      icon: Trophy,
      color: "from-primary-500 to-primary-600",
      bgColor: "from-primary-50 to-primary-100"
    },
    {
      title: "Instant Booking",
      description: "Book your preferred time slot in seconds",
      icon: Zap,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "from-secondary-50 to-secondary-100"
    },
    {
      title: "Verified Venues",
      description: "All facilities are verified and quality-checked",
      icon: Shield,
      color: "from-accent-500 to-accent-600",
      bgColor: "from-accent-50 to-accent-100"
    }
  ];

  const features = [
    {
      icon: Building,
      title: "Premium Facilities",
      description: "Access to the best sports facilities in your area with detailed information and photos.",
      color: "primary"
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book courts instantly with our streamlined booking process and real-time availability.",
      color: "secondary"
    },
    {
      icon: Star,
      title: "Verified Reviews",
      description: "Read authentic reviews from other players to make informed decisions.",
      color: "accent"
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "See live availability and book instantly without waiting for confirmation.",
      color: "primary"
    },
    {
      icon: MapPin,
      title: "Local Discovery",
      description: "Find hidden gems and local favorites in your neighborhood.",
      color: "secondary"
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "All facilities meet our strict quality standards and safety requirements.",
      color: "accent"
    }
  ];

  const stats = [
    { number: "500+", label: "Sports Venues", icon: Building },
    { number: "10K+", label: "Happy Players", icon: Users },
    { number: "50K+", label: "Bookings Made", icon: Calendar },
    { number: "4.8", label: "Average Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden hero-section">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-sports-pattern opacity-20"></div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-primary-400/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Trophy className="w-24 h-24" />
        </motion.div>
        
        <motion.div
          className="absolute top-40 right-20 text-secondary-400/20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Target className="w-20 h-20" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                QuickCourt
              </span>
              {' '}🏀
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Your ultimate platform for booking local sports facilities and courts. 
              Find, book, and play your favorite sports with ease and confidence.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="btn-sports inline-flex items-center px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-glow-strong"
                    >
                      Get Started
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="btn-secondary inline-flex items-center px-10 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/venues"
                      className="btn-sports inline-flex items-center px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-glow-strong"
                    >
                      Browse Venues
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/dashboard"
                      className="btn-secondary inline-flex items-center px-10 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl"
                    >
                      Go to Dashboard
                    </Link>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Carousel Section */}
      <div className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary-600">QuickCourt</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for seamless sports facility booking
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <div className={`w-full max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br ${carouselSlides[currentSlide].bgColor} shadow-2xl`}>
                    <div className="text-center">
                      <motion.div
                        className={`mx-auto w-24 h-24 bg-gradient-to-br ${carouselSlides[currentSlide].color} rounded-full flex items-center justify-center mb-8 shadow-xl`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                      >
                        {React.createElement(carouselSlides[currentSlide].icon, { className: "w-12 h-12 text-white" })}
                      </motion.div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {carouselSlides[currentSlide].title}
                      </h3>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {carouselSlides[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {carouselSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Carousel Arrows */}
            <motion.button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <motion.button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-sports p-8 text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className={`mx-auto w-20 h-20 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className={`w-10 h-10 text-${feature.color}-600`} />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-primary-100">
              Join the growing community of sports enthusiasts
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                
                <p className="text-primary-100 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-basketball-pattern opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Playing?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of players who trust QuickCourt for their sports facility bookings. 
              Your next game is just a click away!
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {!user ? (
                <Link
                  to="/register"
                  className="btn-sports inline-flex items-center px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-glow-strong"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Create Free Account
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              ) : (
                <Link
                  to="/venues"
                  className="btn-sports inline-flex items-center px-10 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-glow-strong"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Browse Venues
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 