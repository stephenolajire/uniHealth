import { useState } from "react";
import {
  Shield,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Calendar,
  AlertTriangle,
  FileText,
  MapPin,
  Activity,
  ChevronRight,
  Plus,
  Download,
  Bell,
  Pause,
  Play,
  Info,
  Building2,
  User,
  Phone,
  Mail,
} from "lucide-react";

type Provider = {
  name: string;
  type: string;
  org: string;
};

const AccessControlPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState< Provider |null >(null);
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [filterProvider, setFilterProvider] = useState("all");

  // Active Consents Data
  const activeConsents = [
    {
      id: 1,
      providerName: "Dr. Sarah Johnson",
      providerType: "Cardiologist",
      organization: "UniHealth Medical Center",
      accessLevel: "full",
      grantDate: "2025-08-15",
      expiryDate: "2026-08-15",
      status: "active",
      avatar: "SJ",
      lastAccessed: "2025-10-12",
      accessCount: 24,
      phone: "+234 803 123 4567",
      email: "s.johnson@unihealth.ng",
    },
    {
      id: 2,
      providerName: "Dr. Michael Chen",
      providerType: "General Practitioner",
      organization: "City Health Clinic",
      accessLevel: "view-only",
      grantDate: "2025-09-01",
      expiryDate: "2025-12-01",
      status: "active",
      avatar: "MC",
      lastAccessed: "2025-10-10",
      accessCount: 12,
      phone: "+234 805 987 6543",
      email: "m.chen@cityclinic.ng",
    },
    {
      id: 3,
      providerName: "Dr. Amina Okafor",
      providerType: "Dermatologist",
      organization: "Skin Care Institute",
      accessLevel: "specific",
      grantDate: "2025-07-20",
      expiryDate: "2025-10-20",
      status: "expiring-soon",
      avatar: "AO",
      lastAccessed: "2025-10-08",
      accessCount: 8,
      phone: "+234 807 456 7890",
      email: "a.okafor@skincare.ng",
    },
    {
      id: 4,
      providerName: "Dr. James Williams",
      providerType: "Orthopedist",
      organization: "Orthopedic Clinic",
      accessLevel: "full",
      grantDate: "2025-06-10",
      expiryDate: "2025-10-10",
      status: "expired",
      avatar: "JW",
      lastAccessed: "2025-10-05",
      accessCount: 15,
      phone: "+234 809 234 5678",
      email: "j.williams@orthoclinic.ng",
    },
    {
      id: 5,
      providerName: "Dr. Emily Nwosu",
      providerType: "Pediatrician",
      organization: "Children's Hospital",
      accessLevel: "view-only",
      grantDate: "2025-09-15",
      expiryDate: null,
      status: "paused",
      avatar: "EN",
      lastAccessed: "2025-09-20",
      accessCount: 5,
      phone: "+234 802 345 6789",
      email: "e.nwosu@childhospital.ng",
    },
  ];

  // Consent Requests Data
  const consentRequests = [
    {
      id: 1,
      providerName: "Dr. David Adeyemi",
      providerType: "Neurologist",
      organization: "Neuro Care Center",
      accessLevelRequested: "full",
      purpose:
        "Consultation for recurring headaches and neurological assessment",
      requestDate: "2025-10-13",
      urgency: "normal",
      avatar: "DA",
      phone: "+234 810 123 4567",
      email: "d.adeyemi@neurocare.ng",
    },
    {
      id: 2,
      providerName: "Dr. Blessing Eze",
      providerType: "Endocrinologist",
      organization: "Diabetes & Hormone Clinic",
      accessLevelRequested: "view-only",
      purpose: "Review diabetes management and medication history",
      requestDate: "2025-10-12",
      urgency: "normal",
      avatar: "BE",
      phone: "+234 813 987 6543",
      email: "b.eze@diabetesclinic.ng",
    },
    {
      id: 3,
      providerName: "Emergency Department",
      providerType: "Emergency Services",
      organization: "Central Hospital ER",
      accessLevelRequested: "full",
      purpose: "Emergency treatment - patient admitted with acute symptoms",
      requestDate: "2025-10-14",
      urgency: "urgent",
      avatar: "ER",
      phone: "+234 700 EMERGENCY",
      email: "er@centralhospital.ng",
    },
  ];

  // Access Activity Log Data
  const accessActivityLog = [
    {
      id: 1,
      providerName: "Dr. Sarah Johnson",
      organization: "UniHealth Medical Center",
      action: "Viewed medical records",
      recordType: "Lab Results",
      timestamp: "2025-10-14 09:30 AM",
      ipAddress: "197.210.xxx.xxx",
      location: "Port Harcourt, NG",
      status: "success",
    },
    {
      id: 2,
      providerName: "Dr. Michael Chen",
      organization: "City Health Clinic",
      action: "Updated prescription",
      recordType: "Medications",
      timestamp: "2025-10-13 02:15 PM",
      ipAddress: "197.210.xxx.xxx",
      location: "Port Harcourt, NG",
      status: "success",
    },
    {
      id: 3,
      providerName: "Dr. Sarah Johnson",
      organization: "UniHealth Medical Center",
      action: "Viewed medical history",
      recordType: "Consultation Notes",
      timestamp: "2025-10-12 11:45 AM",
      ipAddress: "197.210.xxx.xxx",
      location: "Port Harcourt, NG",
      status: "success",
    },
    {
      id: 4,
      providerName: "Dr. Amina Okafor",
      organization: "Skin Care Institute",
      action: "Downloaded imaging",
      recordType: "Medical Imaging",
      timestamp: "2025-10-11 04:20 PM",
      ipAddress: "197.210.xxx.xxx",
      location: "Port Harcourt, NG",
      status: "success",
    },
    {
      id: 5,
      providerName: "Unknown Provider",
      organization: "Unknown",
      action: "Failed access attempt",
      recordType: "Medical Records",
      timestamp: "2025-10-10 11:30 PM",
      ipAddress: "41.203.xxx.xxx",
      location: "Lagos, NG",
      status: "failed",
    },
  ];

  // Emergency Access Log
  const emergencyAccessLog = [
    {
      id: 1,
      providerName: "Emergency Department",
      organization: "Central Hospital ER",
      reason: "Acute cardiac event - immediate care required",
      timestamp: "2025-09-28 03:45 AM",
      approvedBy: "System (Break-glass)",
      recordsAccessed: "Full medical history, medications, allergies",
      status: "reviewed",
    },
    {
      id: 2,
      providerName: "Dr. Thomas Obi",
      organization: "City Emergency Services",
      reason: "Unconscious patient - allergies verification needed",
      timestamp: "2025-08-15 08:20 PM",
      approvedBy: "System (Break-glass)",
      recordsAccessed: "Allergies, current medications, emergency contacts",
      status: "reviewed",
    },
  ];

  const stats = {
    activeConsents: activeConsents.filter((c) => c.status === "active").length,
    pendingRequests: consentRequests.length,
    totalProviders: activeConsents.length,
    expiringThisMonth: activeConsents.filter(
      (c) => c.status === "expiring-soon"
    ).length,
    totalAccessEvents: accessActivityLog.length,
    emergencyAccess: emergencyAccessLog.length,
  };

  const getAccessLevelBadge = (level: any) => {
    switch (level) {
      case "full":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Full Access
          </span>
        );
      case "view-only":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            View Only
          </span>
        );
      case "specific":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
            Specific Records
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "active":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        );
      case "expired":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            <XCircle className="w-3 h-3" />
            Expired
          </span>
        );
      case "expiring-soon":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
            <AlertTriangle className="w-3 h-3" />
            Expiring Soon
          </span>
        );
      case "paused":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            <Pause className="w-3 h-3" />
            Paused
          </span>
        );
      default:
        return null;
    }
  };

  const GrantAccessModal = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      searchProvider: "",
      accessLevel: "view-only",
      expiryDate: "",
      purpose: "",
      includeAllergies: true,
      includeMedications: true,
      includeLabResults: true,
      includeImaging: false,
      includeNotes: true,
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Grant Access to Provider
              </h2>
              <button
                onClick={() => setShowGrantModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 ${
                  step >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="text-sm font-medium">Search Provider</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200">
                <div
                  className={`h-full ${
                    step >= 2 ? "bg-blue-600" : "bg-gray-200"
                  } transition-all`}
                  style={{ width: step >= 2 ? "100%" : "0%" }}
                ></div>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  step >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Set Permissions</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200">
                <div
                  className={`h-full ${
                    step >= 3 ? "bg-blue-600" : "bg-gray-200"
                  } transition-all`}
                  style={{ width: step >= 3 ? "100%" : "0%" }}
                ></div>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  step >= 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                  }`}
                >
                  3
                </div>
                <span className="text-sm font-medium">Confirm</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search for Healthcare Provider
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, specialty, or organization..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.searchProvider}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          searchProvider: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    {
                      name: "Dr. David Adeyemi",
                      type: "Neurologist",
                      org: "Neuro Care Center",
                    },
                    {
                      name: "Dr. Blessing Eze",
                      type: "Endocrinologist",
                      org: "Diabetes Clinic",
                    },
                    {
                      name: "Dr. Grace Okonkwo",
                      type: "Gynecologist",
                      org: "Women's Health Center",
                    },
                  ].map((provider: Provider, idx:number) => (
                    <div
                      key={idx}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
                      onClick={() => {
                        setSelectedProvider(provider);
                        setStep(2);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                          {provider.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {provider.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {provider.type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {provider.org}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                      {selectedProvider?.name
                        .split(" ")
                        .map((n: any) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {selectedProvider?.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedProvider?.type}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["view-only", "specific", "full"].map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          setFormData({ ...formData, accessLevel: level })
                        }
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          formData.accessLevel === level
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`text-sm font-medium ${
                            formData.accessLevel === level
                              ? "text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {level === "view-only"
                            ? "View Only"
                            : level === "full"
                            ? "Full Access"
                            : "Specific Records"}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.accessLevel === "specific" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Records to Share
                    </label>
                    <div className="space-y-2">
                      {[
                        { key: "includeAllergies", label: "Allergies" },
                        { key: "includeMedications", label: "Medications" },
                        { key: "includeLabResults", label: "Lab Results" },
                        { key: "includeImaging", label: "Medical Imaging" },
                        {
                          key: "includeNotes",
                          label: "Consultation Notes",
                        },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            // checked={formData[item.key]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [item.key]: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose / Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the reason for granting access..."
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">
                    Review Access Grant
                  </h3>
                  <p className="text-sm text-green-700">
                    Please review the details before confirming access.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Provider
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedProvider?.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {selectedProvider?.type} - {selectedProvider?.org}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Access Level
                      </p>
                      <p className="text-sm text-gray-900">
                        {formData.accessLevel === "view-only"
                          ? "View Only"
                          : formData.accessLevel === "full"
                          ? "Full Access"
                          : "Specific Records"}
                      </p>
                    </div>
                  </div>

                  {formData.expiryDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Expiration Date
                        </p>
                        <p className="text-sm text-gray-900">
                          {new Date(formData.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.purpose && (
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Purpose
                        </p>
                        <p className="text-sm text-gray-900">
                          {formData.purpose}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setShowGrantModal(false);
                      setStep(1);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Grant Access
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="w-full mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Shield className="w-8 h-8" />
                Access Control & Consent Management
              </h1>
              <p className="text-blue-100">
                Manage who can access your medical records
              </p>
            </div>
            <button
              onClick={() => setShowGrantModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Grant New Access
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Consents</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.activeConsents}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.pendingRequests}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Providers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalProviders}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Expiring This Month
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.expiringThisMonth}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: "active", label: "Active Consents", icon: CheckCircle },
                { id: "requests", label: "Consent Requests", icon: Bell },
                { id: "activity", label: "Access Activity", icon: Activity },
                {
                  id: "emergency",
                  label: "Emergency Access",
                  icon: AlertTriangle,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === "requests" && stats.pendingRequests > 0 && (
                    <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                      {stats.pendingRequests}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Consents Tab */}
          {activeTab === "active" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search providers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expiring">Expiring Soon</option>
                    <option value="expired">Expired</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {activeConsents.map((consent) => (
                  <div
                    key={consent.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {consent.avatar}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {consent.providerName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {consent.providerType}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {consent.organization}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {consent.phone}
                            </span>
                            <span className="text-gray-300">•</span>
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {consent.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(consent.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          Access Level
                        </p>
                        {getAccessLevelBadge(consent.accessLevel)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Granted</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(consent.grantDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          {consent.expiryDate ? "Expires" : "Expiration"}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {consent.expiryDate
                            ? new Date(consent.expiryDate).toLocaleDateString()
                            : "No expiry"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          Last Access
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(consent.lastAccessed).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Activity className="w-4 h-4" />
                        <span>{consent.accessCount} total accesses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          View History
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                          Modify
                        </button>
                        {consent.status === "paused" ? (
                          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 border border-green-300 rounded-lg transition-colors">
                            <Play className="w-4 h-4" />
                            Resume
                          </button>
                        ) : (
                          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50 border border-orange-300 rounded-lg transition-colors">
                            <Pause className="w-4 h-4" />
                            Pause
                          </button>
                        )}
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 border border-red-300 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consent Requests Tab */}
          {activeTab === "requests" && (
            <div className="p-6">
              {consentRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Pending Requests
                  </h3>
                  <p className="text-gray-600">
                    You don't have any consent requests at the moment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {consentRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`border-2 rounded-lg p-6 ${
                        request.urgency === "urgent"
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {request.urgency === "urgent" && (
                        <div className="flex items-center gap-2 mb-4 text-red-600">
                          <AlertTriangle className="w-5 h-5" />
                          <span className="font-semibold text-sm">
                            URGENT REQUEST
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {request.avatar}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {request.providerName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {request.providerType}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {request.organization}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {request.phone}
                              </span>
                              <span className="text-gray-300">•</span>
                              <Mail className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {request.email}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Requested{" "}
                            {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">
                              Access Level Requested
                            </p>
                            {getAccessLevelBadge(request.accessLevelRequested)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Purpose</p>
                          <p className="text-sm text-gray-900">
                            {request.purpose}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                          <CheckCircle className="w-5 h-5" />
                          Approve
                        </button>
                        <button className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                          Modify & Approve
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                          <XCircle className="w-5 h-5" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Access Activity Tab */}
          {activeTab === "activity" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterDateRange}
                    onChange={(e) => setFilterDateRange(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterProvider}
                    onChange={(e) => setFilterProvider(e.target.value)}
                  >
                    <option value="all">All Providers</option>
                    {activeConsents.map((consent) => (
                      <option key={consent.id} value={consent.id}>
                        {consent.providerName}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Log
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Provider
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Action
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Record Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Timestamp
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessActivityLog.map((log) => (
                      <tr
                        key={log.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 ${
                          log.status === "failed" ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {log.providerName}
                            </p>
                            <p className="text-xs text-gray-600">
                              {log.organization}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">{log.action}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {log.recordType}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">
                            {log.timestamp}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-600">
                              {log.location}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {log.ipAddress}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          {log.status === "success" ? (
                            <span className="flex items-center gap-1 text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              Success
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600 text-sm">
                              <XCircle className="w-4 h-4" />
                              Failed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {accessActivityLog.some((log) => log.status === "failed") && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">
                        Suspicious Activity Detected
                      </h4>
                      <p className="text-sm text-red-700 mb-3">
                        We detected failed access attempts to your medical
                        records. Please review and report if you don't recognize
                        this activity.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                        Report Suspicious Activity
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Emergency Access Tab */}
          {activeTab === "emergency" && (
            <div className="p-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-1">
                      About Emergency Access
                    </h4>
                    <p className="text-sm text-orange-700">
                      Emergency access allows healthcare providers to access
                      your records in life-threatening situations without prior
                      consent. All emergency accesses are logged and you'll be
                      notified.
                    </p>
                  </div>
                </div>
              </div>

              {emergencyAccessLog.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Emergency Access Events
                  </h3>
                  <p className="text-gray-600">
                    Your records have not been accessed via emergency protocols.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {emergencyAccessLog.map((log) => (
                    <div
                      key={log.id}
                      className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {log.providerName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {log.organization}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {log.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            log.status === "reviewed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {log.status === "reviewed"
                            ? "Reviewed"
                            : "Pending Review"}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Reason</p>
                          <p className="text-sm text-gray-900">{log.reason}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Records Accessed
                          </p>
                          <p className="text-sm text-gray-900">
                            {log.recordsAccessed}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Approved By
                          </p>
                          <p className="text-sm text-gray-900">
                            {log.approvedBy}
                          </p>
                        </div>
                      </div>

                      {log.status !== "reviewed" && (
                        <div className="mt-4 pt-4 border-t border-orange-200">
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium mr-2">
                            Mark as Reviewed
                          </button>
                          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                            Report Issue
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showGrantModal && <GrantAccessModal />}
    </div>
  );
};

export default AccessControlPage;
