import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
//   Legend,
  ResponsiveContainer,
//   BarChart,
//   Bar,
} from "recharts";
import {
  Search,
//   Filter,
  Download,
  Printer,
  Calendar,
  FileText,
  Pill,
  FlaskConical,
  Scan,
  FolderOpen,
  ChevronRight,
  User,
  Building2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Eye,
  Share2,
  Upload,
  Image as ImageIcon,
  Shield,
  Activity,
  CheckCircle,
  Info,
  Microscope,
  Stethoscope,
  Heart,
  Thermometer,
  Weight,
  Ruler,
} from "lucide-react";
import Prescription from "../../components/patient/medicalrecord/Prescription";

const MedicalRecordsPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);

  // Sample data
  const medicalVisits = [
    {
      id: 1,
      date: "2025-10-05",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      hospital: "UniHealth Medical Center",
      diagnosis: "Hypertension follow-up",
      detailedNotes:
        "Patient presents for routine follow-up of hypertension. Reports good medication compliance. No chest pain or shortness of breath.",
      vitals: {
        bloodPressure: "128/82",
        heartRate: 72,
        temperature: 98.2,
        weight: 75,
        height: 170,
        bmi: 25.9,
      },
      treatmentPlan:
        "Continue current medication regimen (Lisinopril 10mg daily). Monitor BP at home weekly.",
      followUp: "Return in 3 months for routine follow-up",
      attachments: ["ecg_report.pdf", "blood_work.pdf"],
      doctorCredentials: "MD, FACC",
    },
    {
      id: 2,
      date: "2025-09-28",
      doctor: "Dr. James Williams",
      specialty: "Orthopedist",
      hospital: "Orthopedic Clinic",
      diagnosis: "Knee pain assessment",
      detailedNotes:
        "Patient complains of right knee pain for 2 weeks. Pain worse with activity. No history of trauma.",
      vitals: {
        bloodPressure: "125/80",
        heartRate: 68,
        temperature: 98.6,
        weight: 75,
        height: 170,
        bmi: 25.9,
      },
      treatmentPlan:
        "Physical therapy 3x weekly for 4 weeks. NSAIDs as needed for pain. Ice application.",
      followUp: "Follow-up in 4 weeks to assess progress",
      attachments: ["knee_xray.jpg"],
      doctorCredentials: "MD, FAAOS",
    },
    {
      id: 3,
      date: "2025-09-15",
      doctor: "Dr. Michael Chen",
      specialty: "General Practitioner",
      hospital: "City Health Clinic",
      diagnosis: "Annual check-up",
      detailedNotes:
        "Annual wellness visit. Patient reports feeling well overall. No new complaints.",
      vitals: {
        bloodPressure: "122/78",
        heartRate: 70,
        temperature: 98.4,
        weight: 74,
        height: 170,
        bmi: 25.6,
      },
      treatmentPlan:
        "Continue healthy lifestyle. Annual lab work ordered. Flu vaccine administered.",
      followUp: "Return in 1 year for annual check-up",
      attachments: [],
      doctorCredentials: "MD, FAAFP",
    },
  ];

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "90 days",
      prescribedBy: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      prescriptionDate: "2025-10-05",
      startDate: "2025-10-05",
      endDate: "2026-01-03",
      daysRemaining: 81,
      refillsRemaining: 2,
      pharmacy: "HealthPlus Pharmacy, Port Harcourt",
      pharmacyPhone: "+234 123 456 7890",
      instructions: "Take with food. Avoid potassium supplements.",
      sideEffects: ["Dizziness", "Dry cough", "Fatigue"],
      interactions: ["NSAIDs may reduce effectiveness"],
      status: "active",
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "90 days",
      prescribedBy: "Dr. Michael Chen",
      specialty: "General Practitioner",
      prescriptionDate: "2025-09-15",
      startDate: "2025-09-15",
      endDate: "2025-12-14",
      daysRemaining: 61,
      refillsRemaining: 3,
      pharmacy: "City Pharmacy, Port Harcourt",
      pharmacyPhone: "+234 098 765 4321",
      instructions: "Take with meals. Monitor blood sugar levels.",
      sideEffects: ["Nausea", "Diarrhea", "Stomach upset"],
      interactions: ["Alcohol may increase risk of lactic acidosis"],
      status: "active",
    },
    {
      id: 3,
      medication: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      duration: "30 days",
      prescribedBy: "Dr. James Williams",
      specialty: "Orthopedist",
      prescriptionDate: "2025-09-28",
      startDate: "2025-09-28",
      endDate: "2025-10-28",
      daysRemaining: 14,
      refillsRemaining: 0,
      pharmacy: "HealthPlus Pharmacy, Port Harcourt",
      pharmacyPhone: "+234 123 456 7890",
      instructions: "Take with food. Do not exceed 1200mg per day.",
      sideEffects: ["Stomach upset", "Heartburn", "Dizziness"],
      interactions: ["May interact with blood pressure medications"],
      status: "active",
    },
  ];

  const labResults = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      date: "2025-10-05",
      orderedBy: "Dr. Sarah Johnson",
      hospital: "UniHealth Medical Center",
      status: "completed",
      results: [
        {
          parameter: "White Blood Cells",
          value: 7.2,
          unit: "K/uL",
          normalRange: "4.5-11.0",
          status: "normal",
        },
        {
          parameter: "Red Blood Cells",
          value: 4.8,
          unit: "M/uL",
          normalRange: "4.5-5.5",
          status: "normal",
        },
        {
          parameter: "Hemoglobin",
          value: 14.5,
          unit: "g/dL",
          normalRange: "13.5-17.5",
          status: "normal",
        },
        {
          parameter: "Platelets",
          value: 245,
          unit: "K/uL",
          normalRange: "150-400",
          status: "normal",
        },
      ],
      doctorNotes:
        "All values within normal limits. Continue current management.",
      historicalData: [
        { date: "2024-10", value: 14.2 },
        { date: "2025-01", value: 14.3 },
        { date: "2025-04", value: 14.4 },
        { date: "2025-07", value: 14.6 },
        { date: "2025-10", value: 14.5 },
      ],
    },
    {
      id: 2,
      testName: "Lipid Panel",
      date: "2025-10-05",
      orderedBy: "Dr. Sarah Johnson",
      hospital: "UniHealth Medical Center",
      status: "completed",
      results: [
        {
          parameter: "Total Cholesterol",
          value: 195,
          unit: "mg/dL",
          normalRange: "<200",
          status: "normal",
        },
        {
          parameter: "LDL Cholesterol",
          value: 118,
          unit: "mg/dL",
          normalRange: "<100",
          status: "high",
        },
        {
          parameter: "HDL Cholesterol",
          value: 52,
          unit: "mg/dL",
          normalRange: ">40",
          status: "normal",
        },
        {
          parameter: "Triglycerides",
          value: 125,
          unit: "mg/dL",
          normalRange: "<150",
          status: "normal",
        },
      ],
      doctorNotes:
        "LDL slightly elevated. Consider dietary modifications and continue monitoring.",
      historicalData: [
        { date: "2024-10", value: 125 },
        { date: "2025-01", value: 122 },
        { date: "2025-04", value: 120 },
        { date: "2025-07", value: 119 },
        { date: "2025-10", value: 118 },
      ],
    },
    {
      id: 3,
      testName: "Blood Glucose",
      date: "2025-09-15",
      orderedBy: "Dr. Michael Chen",
      hospital: "City Health Clinic",
      status: "completed",
      results: [
        {
          parameter: "Fasting Glucose",
          value: 108,
          unit: "mg/dL",
          normalRange: "70-100",
          status: "high",
        },
        {
          parameter: "HbA1c",
          value: 6.2,
          unit: "%",
          normalRange: "<5.7",
          status: "high",
        },
      ],
      doctorNotes:
        "Elevated glucose and HbA1c consistent with pre-diabetes. Continue Metformin and lifestyle modifications.",
      historicalData: [
        { date: "2024-09", value: 6.5 },
        { date: "2024-12", value: 6.4 },
        { date: "2025-03", value: 6.3 },
        { date: "2025-06", value: 6.2 },
        { date: "2025-09", value: 6.2 },
      ],
    },
  ];

  const imagingStudies = [
    {
      id: 1,
      studyType: "Chest X-Ray",
      date: "2025-10-05",
      orderedBy: "Dr. Sarah Johnson",
      facility: "UniHealth Imaging Center",
      status: "completed",
      radiologistReport:
        "Heart size normal. Lungs are clear. No acute cardiopulmonary process.",
      findings: "Normal chest radiograph",
      images: ["chest_xray_front.jpg", "chest_xray_side.jpg"],
      radiologist: "Dr. Patricia Adams",
      radiologistCredentials: "MD, Board Certified Radiologist",
    },
    {
      id: 2,
      studyType: "Knee X-Ray (Right)",
      date: "2025-09-28",
      orderedBy: "Dr. James Williams",
      facility: "Orthopedic Imaging Center",
      status: "completed",
      radiologistReport:
        "Mild degenerative changes noted in the medial compartment. No acute fracture or dislocation.",
      findings: "Mild osteoarthritis",
      images: ["knee_xray_ap.jpg", "knee_xray_lateral.jpg"],
      radiologist: "Dr. Robert Lee",
      radiologistCredentials: "MD, FACR",
    },
  ];

  const documents = [
    {
      id: 1,
      name: "Health Insurance Card",
      category: "insurance",
      uploadDate: "2025-01-15",
      fileSize: "2.4 MB",
      fileType: "PDF",
    },
    {
      id: 2,
      name: "COVID-19 Vaccination Record",
      category: "vaccination",
      uploadDate: "2024-12-10",
      fileSize: "1.8 MB",
      fileType: "PDF",
    },
    {
      id: 3,
      name: "Medical Certificate - Annual Physical",
      category: "certificate",
      uploadDate: "2025-09-15",
      fileSize: "856 KB",
      fileType: "PDF",
    },
    {
      id: 4,
      name: "Hospital Discharge Summary",
      category: "discharge",
      uploadDate: "2024-08-22",
      fileSize: "3.2 MB",
      fileType: "PDF",
    },
  ];

  const filterData = () => {
    let filteredVisits = medicalVisits;
    let filteredPrescriptions = prescriptions;
    let filteredLabs = labResults;
    let filteredImaging = imagingStudies;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredVisits = filteredVisits.filter(
        (v) =>
          v.diagnosis.toLowerCase().includes(query) ||
          v.doctor.toLowerCase().includes(query)
      );
      filteredPrescriptions = filteredPrescriptions.filter(
        (p) =>
          p.medication.toLowerCase().includes(query) ||
          p.prescribedBy.toLowerCase().includes(query)
      );
      filteredLabs = filteredLabs.filter((l) =>
        l.testName.toLowerCase().includes(query)
      );
      filteredImaging = filteredImaging.filter((i) =>
        i.studyType.toLowerCase().includes(query)
      );
    }

    // Apply doctor filter
    if (selectedDoctor !== "all") {
      filteredVisits = filteredVisits.filter(
        (v) => v.doctor === selectedDoctor
      );
    }

    // Apply hospital filter
    if (selectedHospital !== "all") {
      filteredVisits = filteredVisits.filter(
        (v) => v.hospital === selectedHospital
      );
    }

    return {
      visits: filteredVisits,
      prescriptions: filteredPrescriptions,
      labs: filteredLabs,
      imaging: filteredImaging,
    };
  };

  const filtered = filterData();

  const toggleRecordSelection = (id: number) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter((rid) => rid !== id));
    } else {
      setSelectedRecords([...selectedRecords, id]);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "normal")
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === "high" || status === "low")
      return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    return <Info className="w-4 h-4 text-blue-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "normal") return "text-green-600 bg-green-50";
    if (status === "high" || status === "low")
      return "text-orange-600 bg-orange-50";
    return "text-blue-600 bg-blue-50";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "insurance":
        return <Shield className="w-5 h-5" />;
      case "vaccination":
        return <Activity className="w-5 h-5" />;
      case "certificate":
        return <FileText className="w-5 h-5" />;
      case "discharge":
        return <Building2 className="w-5 h-5" />;
      default:
        return <FolderOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="w-full mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
              <p className="text-blue-100">
                Access and manage your complete health records
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export All
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Printer className="w-5 h-5" />
                Print Selected
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date Range */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Doctor Filter */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Doctors</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. James Williams">Dr. James Williams</option>
                <option value="Dr. Michael Chen">Dr. Michael Chen</option>
              </select>
            </div>

            {/* Hospital Filter */}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Hospitals</option>
                <option value="UniHealth Medical Center">
                  UniHealth Medical Center
                </option>
                <option value="Orthopedic Clinic">Orthopedic Clinic</option>
                <option value="City Health Clinic">City Health Clinic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-2 p-2 border-b border-gray-200 overflow-x-auto">
            {[
              { id: "all", label: "All Records", icon: FileText },
              { id: "visits", label: "Medical Visits", icon: Stethoscope },
              { id: "prescriptions", label: "Prescriptions", icon: Pill },
              { id: "labs", label: "Lab Results", icon: FlaskConical },
              { id: "imaging", label: "Imaging", icon: Scan },
              { id: "documents", label: "Documents", icon: FolderOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Medical Visits Section */}
        {(selectedTab === "all" || selectedTab === "visits") && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              Medical Visits
            </h2>
            <div className="space-y-4">
              {filtered.visits.map((visit) => (
                <div
                  key={visit.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(visit.id)}
                        onChange={() => toggleRecordSelection(visit.id)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {visit.diagnosis}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(visit.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {visit.doctor} - {visit.specialty}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {visit.hospital}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Detailed Notes */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Visit Notes
                    </h4>
                    <p className="text-sm text-gray-700">
                      {visit.detailedNotes}
                    </p>
                  </div>

                  {/* Vital Signs */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-medium text-gray-600">
                          Blood Pressure
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {visit.vitals.bloodPressure}
                      </p>
                      <p className="text-xs text-gray-500">mmHg</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-gray-600">
                          Heart Rate
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {visit.vitals.heartRate}
                      </p>
                      <p className="text-xs text-gray-500">bpm</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-medium text-gray-600">
                          Temperature
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {visit.vitals.temperature}
                      </p>
                      <p className="text-xs text-gray-500">°F</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Weight className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-gray-600">
                          Weight
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {visit.vitals.weight}
                      </p>
                      <p className="text-xs text-gray-500">kg</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Ruler className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-600">
                          Height
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {visit.vitals.height}
                      </p>
                      <p className="text-xs text-gray-500">cm</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-medium text-gray-600">
                          BMI
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {visit.vitals.bmi}
                      </p>
                      <p className="text-xs text-gray-500">kg/m²</p>
                    </div>
                  </div>

                  {/* Treatment Plan */}
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Treatment Plan
                    </h4>
                    <p className="text-sm text-gray-700">
                      {visit.treatmentPlan}
                    </p>
                  </div>

                  {/* Follow-up */}
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      Follow-up Recommendations
                    </h4>
                    <p className="text-sm text-gray-700">{visit.followUp}</p>
                  </div>

                  {/* Attachments and Doctor Info */}
                  <div className="flex items-center justify-between">
                    {visit.attachments.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">
                          Attachments:
                        </span>
                        {visit.attachments.map((file, idx) => (
                          <button
                            key={idx}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            <FileText className="w-4 h-4" />
                            {file}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{visit.doctor}</span> -{" "}
                      {visit.doctorCredentials}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prescriptions Section */}
        {(selectedTab === "all" || selectedTab === "prescriptions") && (
          <Prescription
            filtered={filtered}
            selectedRecords={selectedRecords}
            toggleRecordSelection={toggleRecordSelection}
          />
        )}

        {/* Lab Results Section */}
        {(selectedTab === "all" || selectedTab === "labs") && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-purple-600" />
              Lab Results
            </h2>
            <div className="space-y-6">
              {filtered.labs.map((lab) => (
                <div
                  key={lab.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(lab.id)}
                        onChange={() => toggleRecordSelection(lab.id)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {lab.testName}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(lab.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Ordered by {lab.orderedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {lab.hospital}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Results Table */}
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Parameter
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Result
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Normal Range
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {lab.results.map((result, idx) => (
                          <tr key={idx} className="border-t border-gray-200">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {result.parameter}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {result.value} {result.unit}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {result.normalRange}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  result.status
                                )}`}
                              >
                                {getStatusIcon(result.status)}
                                {result.status.charAt(0).toUpperCase() +
                                  result.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Trend Chart */}
                  {lab.historicalData && lab.historicalData.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Trend Over Time
                      </h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={lab.historicalData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#fff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: "#3b82f6", r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {/* Doctor's Notes */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Microscope className="w-4 h-4 text-blue-600" />
                      Doctor's Interpretation
                    </h4>
                    <p className="text-sm text-gray-700">{lab.doctorNotes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Imaging Section */}
        {(selectedTab === "all" || selectedTab === "imaging") && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scan className="w-6 h-6 text-indigo-600" />
              Imaging & Radiology
            </h2>
            <div className="space-y-4">
              {filtered.imaging.map((study) => (
                <div
                  key={study.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(study.id)}
                        onChange={() => toggleRecordSelection(study.id)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {study.studyType}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(study.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Ordered by {study.orderedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {study.facility}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Image Thumbnails */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {study.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 px-2">{image}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Findings */}
                  <div className="bg-purple-50 rounded-lg p-4 mb-3">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Findings
                    </h4>
                    <p className="text-sm font-medium text-purple-800">
                      {study.findings}
                    </p>
                  </div>

                  {/* Radiologist Report */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-3">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Radiologist Report
                    </h4>
                    <p className="text-sm text-gray-700">
                      {study.radiologistReport}
                    </p>
                  </div>

                  {/* Radiologist Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <span className="font-medium">{study.radiologist}</span> -{" "}
                      {study.radiologistCredentials}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Full Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Section */}
        {(selectedTab === "all" || selectedTab === "documents") && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FolderOpen className="w-6 h-6 text-teal-600" />
                Documents
              </h2>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Document
              </button>
            </div>

            {/* Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { name: "Insurance", count: 2, icon: Shield, color: "blue" },
                {
                  name: "Vaccination",
                  count: 3,
                  icon: Activity,
                  color: "green",
                },
                {
                  name: "Certificates",
                  count: 5,
                  icon: FileText,
                  color: "purple",
                },
                {
                  name: "Discharge",
                  count: 2,
                  icon: Building2,
                  color: "orange",
                },
              ].map((category) => (
                <div
                  key={category.name}
                  className={`p-4 rounded-lg border-2 border-${category.color}-200 bg-${category.color}-50 hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-${category.color}-100 flex items-center justify-center`}
                      >
                        <category.icon
                          className={`w-5 h-5 text-${category.color}-600`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.count} documents
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Document List */}
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      {getCategoryIcon(doc.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span>{doc.fileType}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
