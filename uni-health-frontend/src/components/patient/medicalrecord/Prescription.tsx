import { Pill, User,Calendar, AlertTriangle, Bell, RefreshCw, XCircle } from "lucide-react";
import type { FilteredData } from "../../../types/patient/type";


interface PrescriptionProps {
  filtered: FilteredData;
  selectedRecords: number[];
  toggleRecordSelection: (id: number) => void;
}

const Prescription = ({
  filtered,
  selectedRecords,
  toggleRecordSelection,
}: PrescriptionProps) => {
  const getDaysRemainingColor = (days: number) => {
    if (days <= 7) return "text-red-600 bg-red-100";
    if (days <= 30) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Pill className="w-6 h-6 text-green-600" />
        Prescriptions
      </h2>
      <div className="space-y-4">
        {filtered.prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedRecords.includes(prescription.id)}
                  onChange={() => toggleRecordSelection(prescription.id)}
                  className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {prescription.medication}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {prescription.dosage} - {prescription.frequency}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {prescription.prescribedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(
                        prescription.prescriptionDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getDaysRemainingColor(
                    prescription.daysRemaining
                  )}`}
                >
                  {prescription.daysRemaining} days remaining
                </span>
                <span className="text-xs text-gray-600">
                  {prescription.refillsRemaining} refills left
                </span>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 mb-3">
              <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
              <p className="text-sm text-gray-700">
                {prescription.instructions}
              </p>
            </div>

            {/* Side Effects */}
            <div className="bg-orange-50 rounded-lg p-4 mb-3">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Possible Side Effects
              </h4>
              <div className="flex flex-wrap gap-2">
                {prescription.sideEffects.map((effect, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white rounded text-xs text-gray-700"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>

            {/* Drug Interactions */}
            {prescription.interactions.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4 mb-3">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Drug Interactions
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {prescription.interactions.map((interaction, idx) => (
                    <li key={idx}>• {interaction}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pharmacy Info and Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <p className="font-medium">{prescription.pharmacy}</p>
                <p className="text-xs">{prescription.pharmacyPhone}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Request Refill
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescription;
