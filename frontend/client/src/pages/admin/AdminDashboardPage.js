import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API calls
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalFacilities: 89,
        totalBookings: 3456,
        totalRevenue: 1250000,
        pendingApprovals: 12,
        activeBookings: 234,
        monthlyGrowth: 15.4,
        userGrowth: 8.2
      });
      setLoading(false);
    }, 1000);
  }, []);

  const kpiCards = [
    {
      title: "Total Users",
      value: stats.totalUsers?.toLocaleString() || "0",
      icon: Users,
      color: "blue",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Total Facilities",
      value: stats.totalFacilities?.toLocaleString() || "0",
      icon: Building2,
      color: "green",
      change: "+5%",
      changeType: "increase"
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings?.toLocaleString() || "0",
      icon: Calendar,
      color: "purple",
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
    }
  ];

  const quickActions = [
    {
      title: "Facility Approvals",
      description: "Review pending facility applications",
      icon: AlertTriangle,
      link: "/admin/facilities/approval",
      count: stats.pendingApprovals || 0,
      color: "red"
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      link: "/admin/users",
      count: null,
      color: "blue"
    },
    {
      title: "Revenue Analytics",
      description: "View detailed revenue reports",
      icon: BarChart3,
      link: "/admin/analytics",
      count: null,
      color: "green"
    },
    {
      title: "System Health",
      description: "Monitor system performance",
      icon: Activity,
      link: "/admin/system",
      count: null,
      color: "purple"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "facility_approved",
      message: "Sports Complex Central approved",
      time: "2 minutes ago",
      icon: CheckCircle,
      color: "green"
    },
    {
      id: 2,
      type: "new_user",
      message: "New user registered: John Doe",
      time: "5 minutes ago",
      icon: Users,
      color: "blue"
    },
    {
      id: 3,
      type: "booking",
      message: "Large booking made: ₹2,500",
      time: "10 minutes ago",
      icon: Calendar,
      color: "purple"
    },
    {
      id: 4,
      type: "payment",
      message: "Payment processed: ₹1,200",
      time: "15 minutes ago",
      icon: DollarSign,
      color: "orange"
    }
  ];

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
                Admin Dashboard 🛡️
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your sports booking platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
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
                    {action.count && (
                      <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${action.color}-100 text-${action.color}-800`}>
                        {action.count}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <Link
                  to="/admin/activities"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                      <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
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

export default AdminDashboardPage;
