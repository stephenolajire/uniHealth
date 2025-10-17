import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  UserCircle,
  // Pill,
  Shield,
  // FileText,
  ClipboardList,
  Settings,
  MapPin,
  LogOut,
  TrendingUp,
} from "lucide-react";

const Sidebar = () => {
  const navLinks = [
    {
      title: "Overview",
      path: "/patient",
      icon: LayoutDashboard,
    },
    {
      title: "Appointments History",
      path: "/patient/appointments",
      icon: Calendar,
    },
    {
      title: "Book Appointment",
      path: "/patient/booking",
      icon: Calendar,
    },
    {
      title: "Consent Management",
      path: "/patient/consent",
      icon: Shield,
    },
    {
      title: "Nearby Booking",
      path: "/patient/nearby",
      icon: MapPin,
    },
    {
      title: "Medical Records",
      path: "/patient/medical-records",
      icon: ClipboardList,
    },
    {
      title: "Activity Log",
      path: "/patient/activity",
      icon: TrendingUp,
    },
    {
      title: "Profile",
      path: "/patient/profile",
      icon: UserCircle,
    },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">UniHealth</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {link.title}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;