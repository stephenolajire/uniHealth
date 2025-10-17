import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  //   Eye,
  Edit,
  //   Trash2,
  FileText,
  User,
  Settings,
  LogIn,
  CreditCard,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// Types
interface ActivityLog {
  id: number;
  action: string;
  category: string;
  description: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  browser: string;
  location: string;
  status: "success" | "warning" | "error" | "info";
  metadata?: Record<string, any>;
}

interface ActivityStats {
  totalActivities: number;
  loginCount: number;
  changesMade: number;
  securityEvents: number;
}

const ActivityLogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedDevice, setSelectedDevice] = useState("all");

  // Sample activity data
  const activities: ActivityLog[] = [
    {
      id: 1,
      action: "Login",
      category: "authentication",
      description: "Successful login to account",
      timestamp: "2025-10-16T09:30:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
    },
    {
      id: 2,
      action: "Profile Update",
      category: "account",
      description: "Updated profile information (phone number)",
      timestamp: "2025-10-16T08:45:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: {
        field: "phone_number",
        oldValue: "+234 80X XXX XXXX",
        newValue: "+234 81X XXX XXXX",
      },
    },
    {
      id: 3,
      action: "Appointment Booked",
      category: "medical",
      description: "Booked appointment with Dr. Sarah Johnson",
      timestamp: "2025-10-15T16:20:00",
      ipAddress: "197.210.123.45",
      device: "Mobile",
      browser: "Safari 17.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: {
        doctor: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        date: "2025-10-25",
      },
    },
    {
      id: 4,
      action: "Failed Login Attempt",
      category: "security",
      description: "Failed login attempt - incorrect password",
      timestamp: "2025-10-15T14:30:00",
      ipAddress: "41.203.45.123",
      device: "Mobile",
      browser: "Chrome Mobile 118.0",
      location: "Lagos, Lagos State, NG",
      status: "error",
    },
    {
      id: 5,
      action: "Password Changed",
      category: "security",
      description: "Password successfully updated",
      timestamp: "2025-10-15T14:35:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
    },
    {
      id: 6,
      action: "Document Downloaded",
      category: "documents",
      description: "Downloaded lab results (CBC Test)",
      timestamp: "2025-10-15T12:10:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: { documentName: "CBC_Test_Results.pdf", size: "2.4 MB" },
    },
    {
      id: 7,
      action: "Two-Factor Authentication",
      category: "security",
      description: "2FA verification code sent to mobile",
      timestamp: "2025-10-15T09:30:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "info",
    },
    {
      id: 8,
      action: "Prescription Refill Request",
      category: "medical",
      description: "Requested refill for Lisinopril 10mg",
      timestamp: "2025-10-14T18:45:00",
      ipAddress: "197.210.123.45",
      device: "Mobile",
      browser: "Safari 17.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: {
        medication: "Lisinopril 10mg",
        pharmacy: "HealthPlus Pharmacy",
      },
    },
    {
      id: 9,
      action: "Email Notification Settings",
      category: "settings",
      description: "Updated email notification preferences",
      timestamp: "2025-10-14T16:00:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: {
        appointmentReminders: true,
        labResults: true,
        promotions: false,
      },
    },
    {
      id: 10,
      action: "Session Timeout",
      category: "security",
      description: "Session automatically logged out due to inactivity",
      timestamp: "2025-10-14T15:30:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "warning",
    },
    {
      id: 11,
      action: "Medical Record Shared",
      category: "medical",
      description: "Shared medical records with Dr. James Williams",
      timestamp: "2025-10-13T11:20:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: {
        doctor: "Dr. James Williams",
        recordType: "Lab Results",
        expiresAt: "2025-10-20",
      },
    },
    {
      id: 12,
      action: "Payment Processed",
      category: "billing",
      description: "Payment for consultation fee processed",
      timestamp: "2025-10-13T10:15:00",
      ipAddress: "197.210.123.45",
      device: "Mobile",
      browser: "Safari 17.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: {
        amount: "₦15,000",
        method: "Card",
        transactionId: "TXN123456789",
      },
    },
    {
      id: 13,
      action: "Login",
      category: "authentication",
      description: "Successful login to account",
      timestamp: "2025-10-13T09:00:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
    },
    {
      id: 14,
      action: "Appointment Cancelled",
      category: "medical",
      description: "Cancelled appointment with Dr. Michael Chen",
      timestamp: "2025-10-12T17:30:00",
      ipAddress: "197.210.123.45",
      device: "Mobile",
      browser: "Safari 17.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "warning",
      metadata: {
        doctor: "Dr. Michael Chen",
        originalDate: "2025-10-18",
        reason: "Schedule conflict",
      },
    },
    {
      id: 15,
      action: "Document Uploaded",
      category: "documents",
      description: "Uploaded insurance card document",
      timestamp: "2025-10-12T14:20:00",
      ipAddress: "197.210.123.45",
      device: "Desktop",
      browser: "Chrome 118.0",
      location: "Port Harcourt, Rivers State, NG",
      status: "success",
      metadata: { documentName: "Insurance_Card.pdf", size: "1.8 MB" },
    },
  ];

  // Calculate stats
  const stats: ActivityStats = {
    totalActivities: activities.length,
    loginCount: activities.filter((a) => a.action === "Login").length,
    changesMade: activities.filter(
      (a) => a.category === "account" || a.category === "settings"
    ).length,
    securityEvents: activities.filter((a) => a.category === "security").length,
  };

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      searchQuery === "" ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || activity.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || activity.status === selectedStatus;
    const matchesDevice =
      selectedDevice === "all" || activity.device === selectedDevice;

    return matchesSearch && matchesCategory && matchesStatus && matchesDevice;
  });

  // Helper functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "info":
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-orange-100 text-orange-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication":
        return <LogIn className="w-5 h-5" />;
      case "security":
        return <Shield className="w-5 h-5" />;
      case "account":
        return <User className="w-5 h-5" />;
      case "medical":
        return <Activity className="w-5 h-5" />;
      case "documents":
        return <FileText className="w-5 h-5" />;
      case "settings":
        return <Settings className="w-5 h-5" />;
      case "billing":
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="w-full mx-auto px-6 py-6">
          <div className="md:flex items-center justify-between ">
            <div>
              <h1 className="text-3xl font-bold mb-2">Activity Log</h1>
              <p className="text-blue-100">
                Track your account activity and security events
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2 md:mt-0">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Log
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Activities
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalActivities}
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Last 7 days
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Login Sessions
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.loginCount}
                </p>
                <p className="text-xs text-gray-500 mt-2">Successful logins</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <LogIn className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Changes Made
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.changesMade}
                </p>
                <p className="text-xs text-gray-500 mt-2">Profile & settings</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Security Events
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.securityEvents}
                </p>
                <p className="text-xs text-gray-500 mt-2">Auth & security</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="authentication">Authentication</option>
                <option value="security">Security</option>
                <option value="account">Account</option>
                <option value="medical">Medical</option>
                <option value="documents">Documents</option>
                <option value="settings">Settings</option>
                <option value="billing">Billing</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            </div>

            {/* Device Filter */}
            <div className="relative">
              <Monitor className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Devices</option>
                <option value="Desktop">Desktop</option>
                <option value="Mobile">Mobile</option>
                <option value="Tablet">Tablet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Activity Timeline
            <span className="ml-auto text-sm font-normal text-gray-600">
              Showing {filteredActivities.length} of {activities.length}{" "}
              activities
            </span>
          </h2>

          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="relative pl-8 pb-8 last:pb-0 border-l-2 border-gray-200 hover:border-blue-400 transition-colors"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-600"></div>

                {/* Activity Card */}
                <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {getCategoryIcon(activity.category)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {activity.action}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {activity.description}
                        </p>

                        {/* Metadata */}
                        {activity.metadata && (
                          <div className="bg-white rounded-lg p-3 mb-2 border border-gray-200">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {Object.entries(activity.metadata).map(
                                ([key, value]) => (
                                  <div key={key}>
                                    <span className="font-medium text-gray-700 capitalize">
                                      {key.replace(/([A-Z])/g, " $1").trim()}:
                                    </span>
                                    <span className="text-gray-600 ml-1">
                                      {String(value)}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Info Row */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimestamp(activity.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            {getDeviceIcon(activity.device)}
                            {activity.device} • {activity.browser}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {activity.ipAddress}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {getStatusIcon(activity.status)}
                        {activity.status.charAt(0).toUpperCase() +
                          activity.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No activities found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results
              </p>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Security & Privacy Notice
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                We track your activity to help keep your account secure and
                provide you with a better experience. If you notice any
                suspicious activity, please contact support immediately.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Report Suspicious Activity
                </button>
                <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  Security Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogPage;
