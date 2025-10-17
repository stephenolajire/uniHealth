import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Search,
  ChevronRight,
  ChevronLeft,
  Building2,
  Plus,
  List,
  Grid,
} from "lucide-react";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "upcoming" | "past" | "cancelled"
  >("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const appointments = [
    {
      id: 1,
      date: "2025-10-17",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      hospital: "UniHealth Medical Center",
      type: "Follow-up",
      mode: "In-person",
      status: "upcoming",
      location: "123 Medical Plaza, Port Harcourt",
      phone: "+234 803 123 4567",
      email: "sarah.johnson@unihealth.com",
      rating: 4.8,
      experience: "15 years",
      avatar: "SJ",
      reason: "Hypertension follow-up",
      preparationNotes:
        "Bring blood pressure log from past month. Fast for 8 hours before appointment.",
      requiredDocs: [
        "Blood pressure log",
        "Previous prescription",
        "Insurance card",
      ],
      virtualLink: null,
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
      status: "upcoming",
      location: "Online",
      phone: "+234 803 234 5678",
      email: "michael.chen@cityhealth.com",
      rating: 4.9,
      experience: "12 years",
      avatar: "MC",
      reason: "Annual check-up consultation",
      preparationNotes:
        "Test your camera and microphone 5 minutes before appointment. Have your medical history ready.",
      requiredDocs: ["Previous lab results", "Medication list"],
      virtualLink: "https://meet.unihealth.com/appointment-2",
    },
    {
      id: 3,
      date: "2025-09-28",
      time: "11:15 AM",
      doctor: "Dr. James Williams",
      specialty: "Orthopedist",
      hospital: "Orthopedic Clinic",
      type: "Check-up",
      mode: "In-person",
      status: "past",
      location: "456 Health Street, Port Harcourt",
      phone: "+234 803 345 6789",
      email: "james.williams@orthoclinic.com",
      rating: 4.7,
      experience: "20 years",
      avatar: "JW",
      reason: "Knee pain assessment",
      preparationNotes: "Wear comfortable clothing. Bring X-rays if available.",
      requiredDocs: ["X-ray images", "Referral letter"],
      virtualLink: null,
    },
    {
      id: 4,
      date: "2025-09-15",
      time: "9:00 AM",
      doctor: "Dr. Amina Okafor",
      specialty: "Dermatologist",
      hospital: "Skin Care Institute",
      type: "Treatment",
      mode: "In-person",
      status: "past",
      location: "789 Wellness Blvd, Port Harcourt",
      phone: "+234 803 456 7890",
      email: "amina.okafor@skincare.com",
      rating: 4.9,
      experience: "10 years",
      avatar: "AO",
      reason: "Skin condition treatment",
      preparationNotes: "Avoid makeup on the day of appointment.",
      requiredDocs: ["Previous treatment records"],
      virtualLink: null,
    },
    {
      id: 5,
      date: "2025-08-20",
      time: "3:00 PM",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      hospital: "UniHealth Medical Center",
      type: "Follow-up",
      mode: "In-person",
      status: "cancelled",
      location: "123 Medical Plaza, Port Harcourt",
      phone: "+234 803 123 4567",
      email: "sarah.johnson@unihealth.com",
      rating: 4.8,
      experience: "15 years",
      avatar: "SJ",
      reason: "Routine check-up",
      preparationNotes: "",
      requiredDocs: [],
      virtualLink: null,
    },
  ];

  const filteredAppointments = appointments
    .filter((apt) => {
      if (filterStatus === "all") return true;
      return apt.status === filterStatus;
    })
    .filter((apt) => {
      if (!searchQuery) return true;
      return (
        apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getAppointmentsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split("T")[0];
    return appointments.filter((apt) => apt.date === dateString);
  };

  // const DetailsModal = () => {
  //   if (!selectedAppointment) return null;

  //   return (
  //     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  //       <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
  //         {/* Header */}
  //         <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 flex items-center justify-between">
  //           <div>
  //             <h2 className="text-2xl font-bold">Appointment Details</h2>
  //             <p className="text-blue-100 text-sm mt-1">
  //               {selectedAppointment.date} at {selectedAppointment.time}
  //             </p>
  //           </div>
  //           <button
  //             onClick={() => {
  //               setShowDetailsModal(false);
  //               setSelectedAppointment(null);
  //             }}
  //             className="p-2 hover:bg-white/20 rounded-full transition-colors"
  //           >
  //             <X className="w-6 h-6" />
  //           </button>
  //         </div>

  //         <div className="p-6">
  //           {/* Status Badge */}
  //           <div className="mb-6">
  //             <span
  //               className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
  //                 selectedAppointment.status === "upcoming"
  //                   ? "bg-blue-100 text-blue-700"
  //                   : selectedAppointment.status === "past"
  //                   ? "bg-gray-100 text-gray-700"
  //                   : "bg-red-100 text-red-700"
  //               }`}
  //             >
  //               {selectedAppointment.status === "upcoming" && (
  //                 <Clock className="w-4 h-4" />
  //               )}
  //               {selectedAppointment.status === "past" && (
  //                 <CheckCircle className="w-4 h-4" />
  //               )}
  //               {selectedAppointment.status === "cancelled" && (
  //                 <XCircle className="w-4 h-4" />
  //               )}
  //               {selectedAppointment.status.charAt(0).toUpperCase() +
  //                 selectedAppointment.status.slice(1)}
  //             </span>
  //           </div>

  //           {/* Doctor Information */}
  //           <div className="bg-gray-50 rounded-lg p-6 mb-6">
  //             <h3 className="text-lg font-semibold text-gray-900 mb-4">
  //               Healthcare Provider
  //             </h3>
  //             <div className="flex items-start gap-4">
  //               <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-2xl">
  //                 {selectedAppointment.avatar}
  //               </div>
  //               <div className="flex-1">
  //                 <h4 className="font-semibold text-gray-900 text-lg">
  //                   {selectedAppointment.doctor}
  //                 </h4>
  //                 <p className="text-gray-600 mb-2">
  //                   {selectedAppointment.specialty} •{" "}
  //                   {selectedAppointment.experience}
  //                 </p>
  //                 <div className="flex items-center gap-1 mb-3">
  //                   <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
  //                   <span className="font-medium text-gray-900">
  //                     {selectedAppointment.rating}
  //                   </span>
  //                   <span className="text-sm text-gray-600">/5.0</span>
  //                 </div>
  //                 <div className="space-y-2">
  //                   <div className="flex items-center gap-2 text-sm text-gray-600">
  //                     <Phone className="w-4 h-4" />
  //                     <span>{selectedAppointment.phone}</span>
  //                   </div>
  //                   <div className="flex items-center gap-2 text-sm text-gray-600">
  //                     <Mail className="w-4 h-4" />
  //                     <span>{selectedAppointment.email}</span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Appointment Details */}
  //           <div className="mb-6">
  //             <h3 className="text-lg font-semibold text-gray-900 mb-4">
  //               Appointment Information
  //             </h3>
  //             <div className="space-y-3">
  //               <div className="flex items-start gap-3">
  //                 <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
  //                 <div>
  //                   <p className="text-sm text-gray-600">Date & Time</p>
  //                   <p className="font-medium text-gray-900">
  //                     {new Date(selectedAppointment.date).toLocaleDateString(
  //                       "en-US",
  //                       {
  //                         weekday: "long",
  //                         month: "long",
  //                         day: "numeric",
  //                         year: "numeric",
  //                       }
  //                     )}{" "}
  //                     at {selectedAppointment.time}
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className="flex items-start gap-3">
  //                 <FileText className="w-5 h-5 text-green-600 mt-0.5" />
  //                 <div>
  //                   <p className="text-sm text-gray-600">Type</p>
  //                   <p className="font-medium text-gray-900">
  //                     {selectedAppointment.type}
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className="flex items-start gap-3">
  //                 {selectedAppointment.mode === "Virtual" ? (
  //                   <Video className="w-5 h-5 text-purple-600 mt-0.5" />
  //                 ) : (
  //                   <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
  //                 )}
  //                 <div>
  //                   <p className="text-sm text-gray-600">Mode</p>
  //                   <p className="font-medium text-gray-900">
  //                     {selectedAppointment.mode}
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className="flex items-start gap-3">
  //                 <Building2 className="w-5 h-5 text-orange-600 mt-0.5" />
  //                 <div>
  //                   <p className="text-sm text-gray-600">Location</p>
  //                   <p className="font-medium text-gray-900">
  //                     {selectedAppointment.hospital}
  //                   </p>
  //                   <p className="text-sm text-gray-600">
  //                     {selectedAppointment.location}
  //                   </p>
  //                 </div>
  //               </div>
  //               {selectedAppointment.reason && (
  //                 <div className="flex items-start gap-3">
  //                   <Stethoscope className="w-5 h-5 text-teal-600 mt-0.5" />
  //                   <div>
  //                     <p className="text-sm text-gray-600">Reason for Visit</p>
  //                     <p className="font-medium text-gray-900">
  //                       {selectedAppointment.reason}
  //                     </p>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           </div>

  //           {/* Virtual Appointment Link */}
  //           {selectedAppointment.mode === "Virtual" &&
  //             selectedAppointment.virtualLink &&
  //             selectedAppointment.status === "upcoming" && (
  //               <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
  //                 <div className="flex items-start gap-3">
  //                   <Video className="w-5 h-5 text-green-600 mt-0.5" />
  //                   <div className="flex-1">
  //                     <h4 className="font-semibold text-gray-900 mb-1">
  //                       Virtual Consultation Ready
  //                     </h4>
  //                     <p className="text-sm text-gray-600 mb-3">
  //                       Join your video consultation when it's time. We
  //                       recommend testing your camera and microphone 5 minutes
  //                       before.
  //                     </p>
  //                     <div className="flex gap-2">
  //                       <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2">
  //                         <Video className="w-4 h-4" />
  //                         Join Consultation
  //                       </button>
  //                       <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
  //                         <Settings className="w-4 h-4" />
  //                         Test Setup
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}

  //           {/* Map for In-Person */}
  //           {selectedAppointment.mode === "In-person" && (
  //             <div className="mb-6">
  //               <h3 className="text-lg font-semibold text-gray-900 mb-3">
  //                 Location & Directions
  //               </h3>
  //               <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-3">
  //                 <div className="text-center">
  //                   <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
  //                   <p className="text-sm text-gray-600">Map View</p>
  //                 </div>
  //               </div>
  //               <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
  //                 <Navigation className="w-4 h-4" />
  //                 Get Directions
  //               </button>
  //             </div>
  //           )}

  //           {/* Preparation Instructions */}
  //           {selectedAppointment.preparationNotes && (
  //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
  //               <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
  //                 <AlertCircle className="w-5 h-5 text-yellow-600" />
  //                 Preparation Instructions
  //               </h3>
  //               <p className="text-sm text-gray-700">
  //                 {selectedAppointment.preparationNotes}
  //               </p>
  //             </div>
  //           )}

  //           {/* Required Documents */}
  //           {selectedAppointment.requiredDocs &&
  //             selectedAppointment.requiredDocs.length > 0 && (
  //               <div className="mb-6">
  //                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
  //                   Required Documents
  //                 </h3>
  //                 <div className="space-y-2">
  //                   {selectedAppointment.requiredDocs.map(
  //                     (doc: string, index: number) => (
  //                       <div
  //                         key={index}
  //                         className="flex items-center gap-2 text-sm text-gray-700"
  //                       >
  //                         <CheckCircle className="w-4 h-4 text-green-600" />
  //                         <span>{doc}</span>
  //                       </div>
  //                     )
  //                   )}
  //                 </div>
  //               </div>
  //             )}

  //           {/* Action Buttons */}
  //           <div className="border-t border-gray-200 pt-6 space-y-3">
  //             {selectedAppointment.status === "upcoming" && (
  //               <>
  //                 <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
  //                   <Calendar className="w-5 h-5" />
  //                   Add to Calendar
  //                 </button>
  //                 <div className="grid grid-cols-2 gap-3">
  //                   <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
  //                     Reschedule
  //                   </button>
  //                   <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
  //                     Cancel
  //                   </button>
  //                 </div>
  //                 <div className="grid grid-cols-3 gap-2">
  //                   <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium flex items-center justify-center gap-1">
  //                     <Share2 className="w-4 h-4" />
  //                     Share
  //                   </button>
  //                   <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium flex items-center justify-center gap-1">
  //                     <Download className="w-4 h-4" />
  //                     Download
  //                   </button>
  //                   <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium flex items-center justify-center gap-1">
  //                     <Printer className="w-4 h-4" />
  //                     Print
  //                   </button>
  //                 </div>
  //               </>
  //             )}

  //             {selectedAppointment.status === "past" && (
  //               <div className="grid grid-cols-2 gap-3">
  //                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
  //                   <FileText className="w-4 h-4" />
  //                   View Summary
  //                 </button>
  //                 <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
  //                   <Calendar className="w-4 h-4" />
  //                   Book Follow-up
  //                 </button>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="w-full mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
              <p className="text-blue-100">
                Manage your healthcare appointments
              </p>
            </div>
            <Link to="/patient/booking">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-6 py-8">
        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Appointments</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded transition-colors ${
                    view === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView("calendar")}
                  className={`p-2 rounded transition-colors ${
                    view === "calendar"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* List View */}
        {view === "list" && (
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by booking your first appointment with a healthcare
                  provider.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Book Appointment
                </button>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {appointment.avatar}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {appointment.doctor}
                            </h3>
                            <p className="text-gray-600">
                              {appointment.specialty}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              appointment.status === "upcoming"
                                ? "bg-blue-100 text-blue-700"
                                : appointment.status === "past"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="w-4 h-4" />
                            <span className="truncate">
                              {appointment.hospital}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            {appointment.mode === "Virtual" ? (
                              <>
                                <Video className="w-4 h-4" />
                                <span>Virtual</span>
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4" />
                                <span>In-person</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            {appointment.type}
                          </span>
                          {appointment.reason && (
                            <span className="text-xs text-gray-600">
                              • {appointment.reason}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Calendar View */}
        {view === "calendar" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1
                      )
                    )
                  }
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {getDaysInMonth(currentMonth).map((date, index) => {
                const dayAppointments = getAppointmentsForDate(date);
                const isToday =
                  date && date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={index}
                    className={`min-h-24 border rounded-lg p-2 ${
                      date
                        ? "bg-white hover:bg-gray-50 cursor-pointer"
                        : "bg-gray-50"
                    } ${
                      isToday ? "border-blue-500 border-2" : "border-gray-200"
                    }`}
                  >
                    {date && (
                      <>
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isToday ? "text-blue-600" : "text-gray-900"
                          }`}
                        >
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayAppointments.map((apt) => (
                            <div
                              key={apt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className={`text-xs p-1 rounded truncate ${
                                apt.status === "upcoming"
                                  ? "bg-blue-100 text-blue-700"
                                  : apt.status === "past"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                              title={`${apt.time} - ${apt.doctor}`}
                            >
                              {apt.time.split(" ")[0]}{" "}
                              {apt.doctor.split(" ")[1]}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span className="text-sm text-gray-600">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-500"></div>
                <span className="text-sm text-gray-600">Past</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <span className="text-sm text-gray-600">Cancelled</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
