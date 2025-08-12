import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Filter, MapPin, Star, Clock, Users, Calendar, LogOut, Trophy, Zap, Target, Building2, DollarSign, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VenuesPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sports = [
    { id: 'all', name: 'All Sports', icon: Trophy, color: 'from-primary-500 to-primary-600' },
    { id: 'basketball', name: 'Basketball', icon: Target, color: 'from-accent-500 to-accent-600' },
    { id: 'tennis', name: 'Tennis', icon: Zap, color: 'from-secondary-500 to-secondary-600' },
    { id: 'football', name: 'Football', icon: Target, color: 'from-primary-500 to-primary-600' },
    { id: 'badminton', name: 'Badminton', icon: Zap, color: 'from-accent-500 to-accent-600' },
    { id: 'volleyball', name: 'Volleyball', icon: Target, color: 'from-secondary-500 to-secondary-600' },
    { id: 'cricket', name: 'Cricket', icon: Trophy, color: 'from-primary-500 to-primary-600' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices', icon: DollarSign, color: 'from-gray-500 to-gray-600' },
    { id: 'low', name: 'Under ₹1500', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { id: 'medium', name: '₹1500 - ₹4000', icon: DollarSign, color: 'from-yellow-500 to-yellow-600' },
    { id: 'high', name: 'Over ₹4000', icon: DollarSign, color: 'from-red-500 to-red-600' }
  ];

  // Mock data - replace with API call
  useEffect(() => {
    setTimeout(() => {
      setVenues([
        {
          id: 1,
          name: "Surat Indoor Stadium",
          sport: "basketball",
          price: 1200,
          rating: 4.8,
          reviews: 110,
          location: "Athwa, Surat",
          image: "/images/1.jpg",
          description: "State-of-the-art indoor basketball court with wooden flooring and LED lighting",
          amenities: ["Parking", "Air Conditioning", "Equipment Rental", "Cafeteria"],
          featured: true
        },
        {
          id: 2,
          name: "Lalbhai Tennis Academy",
          sport: "tennis",
          price: 1200,
          rating: 4.9,
          reviews: 95,
          location: "Piplod, Surat",
          image: "/images/2.jpg",
          description: "Premium tennis courts with professional coaching and synthetic surfaces",
          amenities: ["Locker Rooms", "Pro Shop", "Coaching", "Cafe"],
          featured: true
        },
        {
          id: 3,
          name: "Surat Badminton Arena",
          sport: "badminton",
          price: 600,
          rating: 4.6,
          reviews: 80,
          location: "Vesu, Surat",
          image: "/images/3.jpg",
          description: "Modern indoor badminton facility with cushioned courts and LED lighting",
          amenities: ["Parking", "Water Dispenser", "Changing Rooms"],
          featured: false
        },
        {
          id: 4,
          name: "Sardar Patel Football Turf",
          sport: "football",
          price: 3000,
          rating: 4.7,
          reviews: 140,
          location: "Adajan, Surat",
          image: "/images/4.jpg",
          description: "High-quality artificial turf for 5-a-side and 7-a-side football",
          amenities: ["Floodlights", "Parking", "Refreshments", "First Aid"],
          featured: true
        },
        {
          id: 5,
          name: "Surat Volleyball Court",
          sport: "volleyball",
          price: 2000,
          rating: 4.5,
          reviews: 60,
          location: "Nanpura, Surat",
          image: "/images/5.jpg",
          description: "Beach-style sand volleyball courts with evening lighting",
          amenities: ["Sand Courts", "Refreshments", "Changing Rooms"],
          featured: false
        },
        {
          id: 6,
          name: "Gujarat Cricket Academy",
          sport: "cricket",
          price: 3500,
          rating: 4.8,
          reviews: 120,
          location: "Katargam, Surat",
          image: "/images/6.jpg",
          description: "International standard cricket pitch with practice nets and pavilion",
          amenities: ["Practice Nets", "Parking", "Scoreboard", "Refreshments"],
          featured: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'all' || venue.sport === selectedSport;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && venue.price < 1500) ||
                        (priceRange === 'medium' && venue.price >= 1500 && venue.price <= 4000) ||
                        (priceRange === 'high' && venue.price > 4000);
    
    return matchesSearch && matchesSport && matchesPrice;
  });

  const getSportIcon = (sportId) => {
    const sport = sports.find(s => s.id === sportId);
    return sport ? sport.icon : Target;
  };

  const getSportColor = (sportId) => {
    const sport = sports.find(s => s.id === sportId);
    return sport ? sport.color : 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Trophy className="w-8 h-8 text-white" />
          </motion.div>
          <p className="text-gray-600 font-medium">Loading amazing venues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      {/* Header */}
      <motion.div 
        className="bg-white/95 backdrop-blur-md shadow-lg border-b border-primary-100/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect Court{' '}
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  🏀
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Discover and book sports facilities near you. From basketball to tennis, 
                we've got the perfect venue for your game.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="btn-primary inline-flex items-center px-6 py-3 rounded-xl shadow-lg hover:shadow-xl"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <motion.button
                    onClick={handleLogout}
                    className="btn-secondary inline-flex items-center px-6 py-3 rounded-xl shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div 
          className="glass-effect-sports rounded-3xl p-8 mb-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search venues or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-sports pl-12 pr-4 group-focus-within:border-primary-500 group-focus-within:shadow-lg w-full"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div className="relative group">
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="input-sports w-full group-focus-within:border-primary-500 group-focus-within:shadow-lg cursor-pointer"
              >
                {sports.map(sport => (
                  <option key={sport.id} value={sport.id}>{sport.name}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative group">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="input-sports w-full group-focus-within:border-primary-500 group-focus-within:shadow-lg cursor-pointer"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mt-6">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary w-full inline-flex items-center justify-center px-6 py-3 rounded-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Advanced Filters
            </motion.button>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-6 space-y-4"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sport Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {sports.slice(1).map(sport => (
                        <motion.button
                          key={sport.id}
                          onClick={() => setSelectedSport(sport.id)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            selectedSport === sport.id
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 bg-white hover:border-primary-200'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${sport.color}`}></div>
                            <span className="text-sm font-medium">{sport.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      {priceRanges.slice(1).map(range => (
                        <motion.button
                          key={range.id}
                          onClick={() => setPriceRange(range.id)}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            priceRange === range.id
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 bg-white hover:border-primary-200'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${range.color}`}></div>
                            <span className="text-sm font-medium">{range.name}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-600 font-medium">
              Found <span className="text-primary-600 font-bold">{filteredVenues.length}</span> venue{filteredVenues.length !== 1 ? 's' : ''}
            </p>
            
            {/* Clear Filters Button */}
            {(searchTerm || selectedSport !== 'all' || priceRange !== 'all') && (
              <motion.button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSport('all');
                  setPriceRange('all');
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                className="card-hover overflow-hidden group"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Image */}
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Featured Badge */}
                  {venue.featured && (
                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ Featured
                      </span>
                    </motion.div>
                  )}
                  
                  {/* Price Badge */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                  >
                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-xl text-sm font-bold shadow-lg border border-white/20">
                      ₹{venue.price}/hour
                    </span>
                  </motion.div>
                  
                  {/* Sport Icon */}
                  <motion.div
                    className="absolute bottom-4 left-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${getSportColor(venue.sport)} rounded-xl flex items-center justify-center shadow-lg`}>
                      {React.createElement(getSportIcon(venue.sport), { className: "w-6 h-6 text-white" })}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {venue.name}
                    </h3>
                    <motion.div 
                      className="flex items-center bg-yellow-50 px-3 py-1 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900 ml-1">{venue.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({venue.reviews})</span>
                    </motion.div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{venue.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="font-medium">{venue.location}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {venue.amenities.slice(0, 3).map((amenity, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full border border-primary-100"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        {amenity}
                      </motion.span>
                    ))}
                    {venue.amenities.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{venue.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={`/venues/${venue.id}`}
                        className="btn-secondary w-full text-center py-3 rounded-xl"
                      >
                        View Details
                      </Link>
                    </motion.div>
                    
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={`/book/${venue.id}/1`}
                        className="btn-primary w-full text-center py-3 rounded-xl"
                      >
                        Book Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredVenues.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No venues found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find the perfect sports venue
            </p>
            <motion.button
              onClick={() => {
                setSearchTerm('');
                setSelectedSport('all');
                setPriceRange('all');
              }}
              className="btn-primary inline-flex items-center px-6 py-3 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4 mr-2" />
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VenuesPage; 