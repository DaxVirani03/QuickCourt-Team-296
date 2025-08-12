import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users,
  Star,
  Clock,
  MapPin,
  Plus,
  Settings,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const OwnerDashboardPage = () => {
  const [stats, setStats] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    setTimeout(() => {
      setStats({
        totalFacilities: 3,
        totalBookings: 156,
        totalRevenue: 45000,
        averageRating: 4.6,
        activeBookings: 23,
        monthlyGrowth: 12.5,
        revenueGrowth: 8.3
      });

      setFacilities([
        {
          id: 1,
          name: "Sports Complex Central",
          sport: "Basketball",
          status: "active",
          bookings: 45,
          revenue: 18000,
          rating: 4.8
        },
        {
          id: 2,
          name: "Elite Tennis Club",
          sport: "Tennis",
          status: "active",
          bookings: 67,
          revenue: 22000,
          rating: 4.9
        },
        {
          id: 3,
          name: "Community Badminton Center",
          sport: "Badminton",
          status: "maintenance",
          bookings: 44,
          revenue: 5000,
          rating: 4.2
        }
      ]);

      setRecentBookings([
        {
          id: 1,
          facility: "Sports Complex Central",
          court: "Basketball Court 1",
          user: "John Doe",
          date: "2024-01-15",
          time: "14:00",
          duration: 2,
          amount: 800,
          status: "confirmed"
        },
        {
          id: 2,
          facility: "Elite Tennis Club",
          court: "Tennis Court 3",
          user: "Jane Smith",
          date: "2024-01-15",
          time: "16:00",
          duration: 1.5,
          amount: 1050,
          status: "confirmed"
        },
        {
          id: 3,
          facility: "Sports Complex Central",
          court: "Basketball Court 2",
          user: "Mike Johnson",
          date: "2024-01-16",
          time: "10:00",
          duration: 1,
          amount: 400,
          status: "pending"
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const kpiCards = [
    {
      title: "Total Facilities",
      value: stats.totalFacilities?.toString() || "0",
      icon: Building2,
      color: "blue",
      change: "+1",
      changeType: "increase"
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings?.toLocaleString() || "0",
      icon: Calendar,
      color: "green",
      change: "+23%",
      changeType: "increase"
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "orange",
      change: "+18%",
      changeType: "increase"
    },
    {
      title: "Average Rating",
      value: stats.averageRating?.toString() || "0.0",
      icon: Star,
      color: "purple",
      change: "+0.2",
      changeType: "increase"
    }
  ];

  const quickActions = [
    {
      title: "Add New Facility",
      description: "Register a new sports facility",
      icon: Plus,
      link: "/owner/facilities/new",
      color: "green"
    },
    {
      title: "Manage Facilities",
      description: "Edit facility details and settings",
      icon: Settings,
      link: "/owner/facilities",
      color: "blue"
    },
    {
      title: "View Bookings",
      description: "See all booking requests",
      icon: Calendar,
      link: "/owner/bookings",
      color: "purple"
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: BarChart3,
      link: "/owner/analytics",
      color: "orange"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
                Facility Owner Dashboard 🏢
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your sports facilities and bookings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/owner/facilities/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Facility
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center mt-2">
                    {card.changeType === "increase" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${
                      card.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}>
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                  <card.icon className={`w-6 h-6 text-${card.color}-600`} />
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
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className={`p-3 rounded-lg bg-${action.color}-100`}>
                      <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Facilities Overview */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Facilities</h2>
                <Link
                  to="/owner/facilities"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {facilities.map((facility) => (
                  <div key={facility.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{facility.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(facility.status)}`}>
                        {facility.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{facility.sport}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">{facility.bookings} bookings</span>
                        <span className="text-gray-600">₹{facility.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-600">{facility.rating}</span>
                      </div>
                    </div>
                  </div>
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
                  to="/owner/bookings"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{booking.facility}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{booking.court} • {booking.user}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {booking.time} ({booking.duration}h)
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">₹{booking.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Chart will be implemented</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Distribution</h3>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Chart will be implemented</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
