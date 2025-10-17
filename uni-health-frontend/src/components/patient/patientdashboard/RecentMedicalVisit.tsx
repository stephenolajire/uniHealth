import { Stethoscope, ChevronRight, Building2, FileText, Download } from "lucide-react";

const recentVisits = [
  {
    id: 1,
    date: "2025-10-05",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    diagnosis: "Hypertension follow-up",
    hospital: "UniHealth Medical Center",
    notes: "Blood pressure stable, continue medication",
  },
  {
    id: 2,
    date: "2025-09-28",
    doctor: "Dr. James Williams",
    specialty: "Orthopedist",
    diagnosis: "Knee pain assessment",
    hospital: "Orthopedic Clinic",
    notes: "Recommended physical therapy",
  },
  {
    id: 3,
    date: "2025-09-15",
    doctor: "Dr. Michael Chen",
    specialty: "General Practitioner",
    diagnosis: "Annual check-up",
    hospital: "City Health Clinic",
    notes: "All vitals normal, lab work ordered",
  },
];

const RecentMedicalVisit = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-green-600" />
          Recent Medical Visits
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        {recentVisits.map((visit) => (
          <div
            key={visit.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {visit.diagnosis}
                </h3>
                <p className="text-sm text-gray-600">
                  {visit.doctor} - {visit.specialty}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {visit.hospital}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {new Date(visit.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded mt-2">
              {visit.notes}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <FileText className="w-4 h-4" />
                View Details
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download Summary
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMedicalVisit;
