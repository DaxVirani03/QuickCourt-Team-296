import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Plus, 
  Search, 
  TrendingUp,
  Award,
  Users,
  Activity,
  LogOut
} from 'lucide-react';

const UserDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for now - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          facilityName: "Sports Complex Central",
          courtName: "Basketball Court 1",
          date: "2024-01-15",
          time: "14:00",
          duration: 2,
          status: "confirmed",
          price: 40
        },
        {
          id: 2,
          facilityName: "Elite Tennis Club",
          courtName: "Tennis Court 3",
          date: "2024-01-18",
          time: "16:00",
          duration: 1.5,
          status: "upcoming",
          price: 35
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    { title: "Total Bookings", value: "12", icon: Calendar, color: "blue" },
    { title: "This Month", value: "3", icon: TrendingUp, color: "green" },
    { title: "Favorite Sport", value: "Basketball", icon: Award, color: "purple" },
    { title: "Total Spent", value: "₹19,200", icon: Activity, color: "orange" }
  ];

  const quickActions = [
    { title: "Book New Court", icon: Plus, link: "/venues", color: "primary" },
    { title: "My Bookings", icon: Calendar, link: "/my-bookings", color: "blue" },
    { title: "Browse Venues", icon: Search, link: "/venues", color: "green" },
    { title: "Profile Settings", icon: Users, link: "/profile", color: "purple" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.fullName?.split(' ')[0]}! 🏀
              </h1>
              <p className="text-gray-600 mt-1">
                Ready to book your next game?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/venues"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Book Court
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                      <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">{action.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                <Link
                  to="/my-bookings"
                  className="text-sm font-medium text-primary-600 hover:text-primar y-500"
                >
                  View all
                </Link>
              </div>
              
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No bookings yet</p>
                  <Link
                    to="/venues"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Book Your First Court
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium text-gray-900">{booking.facilityName}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{booking.courtName}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.time} ({booking.duration}h)
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">₹{booking.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Star className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <MapPin className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Venues */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "Surat Indoor Stadium",
                  sports: "Basketball, Tennis, Badminton",
                  rating: 4.8,
                  price: "₹1,200/hour",
                  image: "/images/1.jpg"
                },
                {
                  id: 2,
                  name: "Lalbhai Tennis Academy",
                  sports: "Tennis, Coaching",
                  rating: 4.9,
                  price: "₹1,200/hour",
                  image: "/images/2.jpg"
                },
                {
                  id: 3,
                  name: "Surat Badminton Arena",
                  sports: "Badminton, Indoor Courts",
                  rating: 4.6,
                  price: "₹600/hour",
                  image: "/images/3.jpg"
                }
              ].map((venue) => (
                <div key={venue.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="h-32 relative overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{venue.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{venue.sports}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({venue.rating})</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-medium text-gray-900">From {venue.price}</span>
                      <Link
                        to={`/venues/${venue.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
