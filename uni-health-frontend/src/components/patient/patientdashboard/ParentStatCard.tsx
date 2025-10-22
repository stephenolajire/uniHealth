import { useState } from "react";
import StatCard from "./StatCard";
import { Activity, Pill, FileText, Users, Heart, Bell, Clock, Calendar } from "lucide-react";

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

const ParentStatCard = () => {
  
  const [selectedYear, setSelectedYear] = useState(2025);
  return (
    <div>
      <div className="bg-blue-700 text-white shadow-lg mb-7">
        <div className="w-full mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, Stephen Olajire!
              </h1>
              <p className="text-blue-100">
                Here's your health overview for today
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value={2024} className="text-gray-900">
                    2024
                  </option>
                  <option value={2025} className="text-gray-900">
                    2025
                  </option>
                </select>
              </div>
              <button className="relative p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Bell className="w-6 h-6" />
                {dashboardStats.unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {dashboardStats.unreadNotifications}
                  </span>
                )}
              </button>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                PN
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Medical Visits"
          value={dashboardStats.totalVisits}
          subtitle="Total consultations"
          icon={Activity}
          color="bg-blue-600"
        />
        <StatCard
          title="Active Prescriptions"
          value={dashboardStats.activePrescriptions}
          subtitle="Current medications"
          icon={Pill}
          color="bg-green-600"
        />
        <StatCard
          title="Pending Lab Results"
          value={dashboardStats.pendingLabResults}
          subtitle="Awaiting review"
          icon={FileText}
          color="bg-purple-600"
        />
        <StatCard
          title="Healthcare Providers"
          value={dashboardStats.healthcareProviders}
          subtitle="With access"
          icon={Users}
          color="bg-teal-600"
        />
        <StatCard
          title="Upcoming Appointments"
          value={dashboardStats.upcomingAppointments}
          subtitle={`Next in ${dashboardStats.daysUntilNextAppointment} days`}
          icon={Calendar}
          color="bg-indigo-600"
        />
        <StatCard
          title="Unread Notifications"
          value={dashboardStats.unreadNotifications}
          subtitle="New updates"
          icon={Bell}
          color="bg-orange-600"
        />
        <StatCard
          title="Health Score"
          value={`${dashboardStats.healthScore}%`}
          subtitle="Wellness indicator"
          icon={Heart}
          color="bg-rose-600"
          trend="+5%"
        />
        <StatCard
          title="Next Appointment"
          value={`${dashboardStats.daysUntilNextAppointment} days`}
          subtitle="Until next visit"
          icon={Clock}
          color="bg-cyan-600"
        />
      </div>
    </div>
  );
};

export default ParentStatCard;
