import { Heart, CheckCircle } from "lucide-react";

const healthSummary = {
  allergies: [
    { name: "Penicillin", severity: "High" },
    { name: "Peanuts", severity: "Moderate" },
  ],
  chronicConditions: [
    { name: "Hypertension", status: "Controlled" },
    { name: "Type 2 Diabetes", status: "Monitoring" },
  ],
  bloodType: "O+",
  currentMedications: 3,
  bmi: 24.5,
  lastCheckup: "2025-09-15",
};

const HealthSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-green-600" />
        Health Summary
      </h2>
      <div className="space-y-4">
        {/* Blood Type */}
        <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Blood Type
            </span>
            <span className="text-2xl font-bold text-red-600">
              {healthSummary.bloodType}
            </span>
          </div>
        </div>

        {/* BMI */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">BMI</span>
            <span className="text-2xl font-bold text-blue-600">
              {healthSummary.bmi}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Normal Range</p>
        </div>

        {/* Allergies */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Allergies
          </h3>
          <div className="space-y-2">
            {healthSummary.allergies.map((allergy, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-red-50 rounded-lg"
              >
                <span className="text-sm text-gray-900">{allergy.name}</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    allergy.severity === "High"
                      ? "bg-red-200 text-red-800"
                      : "bg-orange-200 text-orange-800"
                  }`}
                >
                  {allergy.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Chronic Conditions
          </h3>
          <div className="space-y-2">
            {healthSummary.chronicConditions.map((condition, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg"
              >
                <span className="text-sm text-gray-900">{condition.name}</span>
                <span className="text-xs font-medium text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {condition.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Current Medications</span>
            <span className="text-sm font-semibold text-gray-900">
              {healthSummary.currentMedications}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Check-up</span>
            <span className="text-sm font-semibold text-gray-900">
              {new Date(healthSummary.lastCheckup).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthSummary
