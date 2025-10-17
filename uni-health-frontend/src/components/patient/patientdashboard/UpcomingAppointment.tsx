import { Video, Calendar, ChevronRight, Building2, MapPin, Clock } from "lucide-react";

const upcomingAppointments = [
  {
    id: 1,
    date: "2025-10-17",
    time: "10:00 AM",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "UniHealth Medical Center",
    type: "Follow-up",
    mode: "In-person",
    location: "123 Medical Plaza, Port Harcourt",
  },
  {
    id: 2,
    date: "2025-10-20",
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    specialty: "General Practitioner",
    hospital: "City Health Clinic",
    type: "Consultation",
    mode: "Virtual",
    location: "Online",
  },
  {
    id: 3,
    date: "2025-10-25",
    time: "11:15 AM",
    doctor: "Dr. Amina Okafor",
    specialty: "Dermatologist",
    hospital: "Skin Care Institute",
    type: "Check-up",
    mode: "In-person",
    location: "456 Health Street, Port Harcourt",
  },
];

const UpcomingAppointment = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Upcoming Appointments
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        {upcomingAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                  {appointment.doctor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {appointment.doctor}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {appointment.specialty}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {appointment.hospital}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                  <Clock className="w-4 h-4 text-blue-600" />
                  {appointment.time}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {appointment.type}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                  appointment.mode === "Virtual"
                    ? "bg-green-100 text-green-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {appointment.mode === "Virtual" ? (
                  <Video className="w-3 h-3" />
                ) : (
                  <MapPin className="w-3 h-3" />
                )}
                {appointment.mode}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Reschedule
              </button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingAppointment
