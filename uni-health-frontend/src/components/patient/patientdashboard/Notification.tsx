import { Bell, FileText, Calendar, Shield, Pill } from "lucide-react";

const dashboardStats = {
  totalVisits: 24,
  activePrescriptions: 3,
  pendingLabResults: 2,
  healthcareProviders: 5,
  upcomingAppointments: 4,
  unreadNotifications: 7,
  healthScore: 85,
  daysUntilNextAppointment: 3,
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "lab-result":
      return <FileText className="w-5 h-5" />;
    case "appointment":
      return <Calendar className="w-5 h-5" />;
    case "consent":
      return <Shield className="w-5 h-5" />;
    case "prescription":
      return <Pill className="w-5 h-5" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "lab-result":
      return "bg-blue-100 text-blue-600";
    case "appointment":
      return "bg-green-100 text-green-600";
    case "consent":
      return "bg-purple-100 text-purple-600";
    case "prescription":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const notifications = [
  {
    id: 1,
    type: "lab-result",
    title: "Lab Results Available",
    message: "Your blood test results from Oct 5 are ready",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "appointment",
    title: "Appointment Reminder",
    message: "You have an appointment with Dr. Sarah Johnson in 3 days",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "consent",
    title: "Access Request",
    message: "Dr. Michael Chen requested access to your medical records",
    time: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "prescription",
    title: "Prescription Refill",
    message: "Your Lisinopril prescription is ready for refill",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "appointment",
    title: "Appointment Confirmed",
    message: "Your appointment with Dr. Amina Okafor has been confirmed",
    time: "3 days ago",
    read: true,
  },
];

const Notification = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-600" />
          Notifications
          {dashboardStats.unreadNotifications > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              {dashboardStats.unreadNotifications}
            </span>
          )}
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {notifications.slice(0, 5).map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${
              notification.read
                ? "bg-gray-50 border-gray-200"
                : "bg-blue-50 border-blue-200 hover:shadow-md"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(
                  notification.type
                )}`}
              >
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {notification.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {notification.message}
                </p>
                <span className="text-xs text-gray-500">
                  {notification.time}
                </span>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        Mark All as Read
      </button>
    </div>
  );
};

export default Notification;
