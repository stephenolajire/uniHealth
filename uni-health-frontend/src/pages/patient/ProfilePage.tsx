import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Heart,
  Activity,
//   FileText,
  Shield,
  Camera,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Upload,
  Download,
  AlertCircle,
  CheckCircle,
//   Clock,
  Users,
  Droplet,
  Ruler,
  Weight,
//   CreditCard,
//   Building2,
  IdCard,
  Globe,
//   UserPlus,
//   Pill,
  Stethoscope,
  Syringe,
  Cigarette,
  Wine,
//   Dna,
//   Hospital,
  Image,
} from "lucide-react";

const ProfilePage = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  const [isEditingMedical, setIsEditingMedical] = useState(false);
//   const [isEditingInsurance, setIsEditingInsurance] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Profile Data
  const [profileData, setProfileData] = useState({
    // Personal Information
    fullName: "John Chukwuemeka Okafor",
    email: "john.okafor@email.com",
    phone: "+234 803 123 4567",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    bloodGroup: "O+",
    height: 175, // cm
    weight: 78, // kg
    address: "123 University Road, Port Harcourt, Rivers State, Nigeria",
    nationalId: "12345678901",
    preferredLanguage: "English",
    profilePicture: null,

    // Emergency Contacts
    emergencyContact: {
      name: "Mary Okafor",
      relationship: "Spouse",
      phone: "+234 805 987 6543",
      email: "mary.okafor@email.com",
    },
    secondaryEmergencyContact: {
      name: "Dr. Peter Okafor",
      relationship: "Brother",
      phone: "+234 807 456 7890",
      email: "peter.okafor@email.com",
    },

    // Medical Information
    allergies: [
      { id: 1, name: "Penicillin", severity: "High", reaction: "Anaphylaxis" },
      { id: 2, name: "Peanuts", severity: "Moderate", reaction: "Hives" },
    ],
    chronicConditions: [
      {
        id: 1,
        name: "Hypertension",
        diagnosedDate: "2020-03-15",
        status: "Controlled",
      },
      {
        id: 2,
        name: "Type 2 Diabetes",
        diagnosedDate: "2021-08-20",
        status: "Monitoring",
      },
    ],
    pastSurgeries: [
      {
        id: 1,
        procedure: "Appendectomy",
        date: "2015-06-10",
        hospital: "City General Hospital",
      },
      {
        id: 2,
        procedure: "Knee Arthroscopy",
        date: "2019-11-22",
        hospital: "Orthopedic Center",
      },
    ],
    familyHistory: [
      { id: 1, condition: "Heart Disease", relative: "Father", age: 55 },
      { id: 2, condition: "Diabetes", relative: "Mother", age: 50 },
    ],
    geneticConditions: [],
    organDonor: true,
    bloodDonations: [
      { id: 1, date: "2024-08-15", location: "Red Cross Center" },
      { id: 2, date: "2024-05-20", location: "City Hospital" },
      { id: 3, date: "2024-02-10", location: "Red Cross Center" },
    ],
    immunizations: [
      {
        id: 1,
        vaccine: "COVID-19 Booster",
        date: "2024-09-01",
        nextDue: "2025-09-01",
      },
      {
        id: 2,
        vaccine: "Hepatitis B",
        date: "2023-03-15",
        nextDue: "2028-03-15",
      },
      { id: 3, vaccine: "Tetanus", date: "2022-07-20", nextDue: "2032-07-20" },
    ],
    lifestyle: {
      smoking: "Never",
      smokingDetails: "",
      alcohol: "Occasionally",
      alcoholDetails: "Social drinking, 1-2 drinks per week",
      exercise: "Moderate",
      exerciseDetails: "3-4 times per week, jogging and gym",
      diet: "Balanced",
      dietDetails: "Low sodium, controlled carbohydrates",
    },

    // Insurance Information
    insurances: [
      {
        id: 1,
        provider: "HealthGuard Insurance",
        policyNumber: "HG-2024-789456",
        groupNumber: "GRP-45678",
        coverage: "Comprehensive",
        expirationDate: "2025-12-31",
        isPrimary: true,
        cardFront: null,
        cardBack: null,
      },
      {
        id: 2,
        provider: "MediCare Plus",
        policyNumber: "MC-2024-123789",
        groupNumber: "GRP-98765",
        coverage: "Supplemental",
        expirationDate: "2025-06-30",
        isPrimary: false,
        cardFront: null,
        cardBack: null,
      },
    ],
  });

  const calculateAge = (dob:string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const calculateBMI = (weight:number, height:number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi:any) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { text: "Normal", color: "text-green-600" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-600" };
    return { text: "Obese", color: "text-red-600" };
  };

  type InfoCardProps = {
    icon: React.ComponentType<any>;
    label: string;
    value: string | number;
    editable?: boolean;
 };

  const InfoCard = ({ icon: Icon, label, value}: InfoCardProps) => (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-600 mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-900 break-words">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="w-full mx-auto px-6 py-8">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                {profileData.profilePicture ? (
                  <img
                    src={profileData.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  profileData.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors border-4 border-white">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {profileData.fullName}
              </h1>
              <div className="flex flex-wrap gap-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {calculateAge(profileData.dateOfBirth)} years old
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  <span className="text-sm">
                    Blood Type: {profileData.bloodGroup}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">
                    BMI: {calculateBMI(profileData.weight, profileData.height)}{" "}
                    (
                    {
                      getBMICategory(
                        calculateBMI(profileData.weight, profileData.height)
                      ).text
                    }
                    )
                  </span>
                </div>
                {profileData.organDonor && (
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Organ Donor</span>
                  </div>
                )}
              </div>
            </div>

            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Profile
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { id: "personal", label: "Personal Info", icon: User },
                { id: "emergency", label: "Emergency Contacts", icon: Phone },
                { id: "medical", label: "Medical Info", icon: Stethoscope },
                { id: "insurance", label: "Insurance", icon: Shield },
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
                </button>
              ))}
            </div>
          </div>

          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h2>
                {!isEditingPersonal ? (
                  <button
                    onClick={() => setIsEditingPersonal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingPersonal(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingPersonal(false)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {isEditingPersonal ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={profileData.gender}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          gender: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={profileData.bloodGroup}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          bloodGroup: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={profileData.height}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          height: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={profileData.weight}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          weight: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      National ID / SSN
                    </label>
                    <input
                      type="text"
                      value={profileData.nationalId}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          nationalId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language
                    </label>
                    <select
                      value={profileData.preferredLanguage}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          preferredLanguage: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="English">English</option>
                      <option value="Igbo">Igbo</option>
                      <option value="Yoruba">Yoruba</option>
                      <option value="Hausa">Hausa</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      rows={2}
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard
                    icon={User}
                    label="Full Name"
                    value={profileData.fullName}
                  />
                  <InfoCard
                    icon={Mail}
                    label="Email"
                    value={profileData.email}
                  />
                  <InfoCard
                    icon={Phone}
                    label="Phone"
                    value={profileData.phone}
                  />
                  <InfoCard
                    icon={Calendar}
                    label="Date of Birth"
                    value={`${new Date(
                      profileData.dateOfBirth
                    ).toLocaleDateString()} (${calculateAge(
                      profileData.dateOfBirth
                    )} years)`}
                  />
                  <InfoCard
                    icon={User}
                    label="Gender"
                    value={profileData.gender}
                  />
                  <InfoCard
                    icon={Droplet}
                    label="Blood Group"
                    value={profileData.bloodGroup}
                  />
                  <InfoCard
                    icon={Ruler}
                    label="Height"
                    value={`${profileData.height} cm`}
                  />
                  <InfoCard
                    icon={Weight}
                    label="Weight"
                    value={`${profileData.weight} kg`}
                  />
                  <InfoCard
                    icon={Activity}
                    label="BMI"
                    value={`${calculateBMI(
                      profileData.weight,
                      profileData.height
                    )} (${
                      getBMICategory(
                        calculateBMI(profileData.weight, profileData.height)
                      ).text
                    })`}
                  />
                  <InfoCard
                    icon={IdCard}
                    label="National ID"
                    value={profileData.nationalId}
                  />
                  <InfoCard
                    icon={Globe}
                    label="Preferred Language"
                    value={profileData.preferredLanguage}
                  />
                  <div className="md:col-span-2 lg:col-span-3">
                    <InfoCard
                      icon={MapPin}
                      label="Address"
                      value={profileData.address}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Emergency Contacts Tab */}
          {activeTab === "emergency" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Emergency Contacts
                </h2>
                {!isEditingEmergency ? (
                  <button
                    onClick={() => setIsEditingEmergency(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Contacts
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingEmergency(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingEmergency(false)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Primary Emergency Contact */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Primary Emergency Contact
                    </h3>
                  </div>

                  {isEditingEmergency ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.secondaryEmergencyContact.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              secondaryEmergencyContact: {
                                ...profileData.secondaryEmergencyContact,
                                name: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Relationship
                        </label>
                        <input
                          type="text"
                          value={
                            profileData.secondaryEmergencyContact.relationship
                          }
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              secondaryEmergencyContact: {
                                ...profileData.secondaryEmergencyContact,
                                relationship: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.secondaryEmergencyContact.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              secondaryEmergencyContact: {
                                ...profileData.secondaryEmergencyContact,
                                phone: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={profileData.secondaryEmergencyContact.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              secondaryEmergencyContact: {
                                ...profileData.secondaryEmergencyContact,
                                email: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoCard
                        icon={User}
                        label="Name"
                        value={profileData.secondaryEmergencyContact.name}
                      />
                      <InfoCard
                        icon={Users}
                        label="Relationship"
                        value={
                          profileData.secondaryEmergencyContact.relationship
                        }
                      />
                      <InfoCard
                        icon={Phone}
                        label="Phone"
                        value={profileData.secondaryEmergencyContact.phone}
                      />
                      <InfoCard
                        icon={Mail}
                        label="Email"
                        value={profileData.secondaryEmergencyContact.email}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Medical Information Tab */}
          {activeTab === "medical" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Medical Information
                </h2>
                {!isEditingMedical ? (
                  <button
                    onClick={() => setIsEditingMedical(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Medical Info
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingMedical(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingMedical(false)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Allergies Section */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Allergies
                      </h3>
                    </div>
                    {isEditingMedical && (
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                        <Plus className="w-4 h-4" />
                        Add Allergy
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.allergies.map((allergy) => (
                      <div
                        key={allergy.id}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {allergy.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Reaction: {allergy.reaction}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              allergy.severity === "High"
                                ? "bg-red-200 text-red-800"
                                : "bg-orange-200 text-orange-800"
                            }`}
                          >
                            {allergy.severity}
                          </span>
                          {isEditingMedical && (
                            <button className="p-1 hover:bg-red-100 rounded">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chronic Conditions Section */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-orange-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Chronic Conditions
                      </h3>
                    </div>
                    {isEditingMedical && (
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                        <Plus className="w-4 h-4" />
                        Add Condition
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.chronicConditions.map((condition) => (
                      <div
                        key={condition.id}
                        className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {condition.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Diagnosed:{" "}
                            {new Date(
                              condition.diagnosedDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {condition.status}
                          </span>
                          {isEditingMedical && (
                            <button className="p-1 hover:bg-yellow-100 rounded">
                              <Trash2 className="w-4 h-4 text-orange-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Past Surgeries Section */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Past Surgeries
                      </h3>
                    </div>
                    {isEditingMedical && (
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                        <Plus className="w-4 h-4" />
                        Add Surgery
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.pastSurgeries.map((surgery) => (
                      <div
                        key={surgery.id}
                        className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {surgery.procedure}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(surgery.date).toLocaleDateString()} •{" "}
                            {surgery.hospital}
                          </p>
                        </div>
                        {isEditingMedical && (
                          <button className="p-1 hover:bg-blue-100 rounded">
                            <Trash2 className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Family Medical History */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Family Medical History
                      </h3>
                    </div>
                    {isEditingMedical && (
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                        <Plus className="w-4 h-4" />
                        Add History
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.familyHistory.map((history) => (
                      <div
                        key={history.id}
                        className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {history.condition}
                          </p>
                          <p className="text-sm text-gray-600">
                            {history.relative} • Age {history.age} at diagnosis
                          </p>
                        </div>
                        {isEditingMedical && (
                          <button className="p-1 hover:bg-purple-100 rounded">
                            <Trash2 className="w-4 h-4 text-purple-600" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Immunization History */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Syringe className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Immunization History
                      </h3>
                    </div>
                    {isEditingMedical && (
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                        <Plus className="w-4 h-4" />
                        Add Immunization
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {profileData.immunizations.map((immunization) => (
                      <div
                        key={immunization.id}
                        className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {immunization.vaccine}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date:{" "}
                            {new Date(immunization.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Next due:</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(
                              immunization.nextDue
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blood Donation History */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Blood Donation History
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {profileData.bloodDonations.map((donation) => (
                      <div
                        key={donation.id}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {donation.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(donation.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Heart className="w-5 h-5 text-red-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lifestyle Factors */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-teal-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Lifestyle Factors
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Cigarette className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-medium text-gray-700">
                          Smoking
                        </p>
                      </div>
                      <p className="text-sm text-gray-900">
                        {profileData.lifestyle.smoking}
                      </p>
                      {profileData.lifestyle.smokingDetails && (
                        <p className="text-xs text-gray-600 mt-1">
                          {profileData.lifestyle.smokingDetails}
                        </p>
                      )}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Wine className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-medium text-gray-700">
                          Alcohol
                        </p>
                      </div>
                      <p className="text-sm text-gray-900">
                        {profileData.lifestyle.alcohol}
                      </p>
                      {profileData.lifestyle.alcoholDetails && (
                        <p className="text-xs text-gray-600 mt-1">
                          {profileData.lifestyle.alcoholDetails}
                        </p>
                      )}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-medium text-gray-700">
                          Exercise
                        </p>
                      </div>
                      <p className="text-sm text-gray-900">
                        {profileData.lifestyle.exercise}
                      </p>
                      {profileData.lifestyle.exerciseDetails && (
                        <p className="text-xs text-gray-600 mt-1">
                          {profileData.lifestyle.exerciseDetails}
                        </p>
                      )}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-medium text-gray-700">
                          Diet
                        </p>
                      </div>
                      <p className="text-sm text-gray-900">
                        {profileData.lifestyle.diet}
                      </p>
                      {profileData.lifestyle.dietDetails && (
                        <p className="text-xs text-gray-600 mt-1">
                          {profileData.lifestyle.dietDetails}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Organ Donor Status */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-red-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Organ Donor Status
                        </h3>
                        <p className="text-sm text-gray-600">
                          Help save lives through organ donation
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileData.organDonor}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            organDonor: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                        disabled={!isEditingMedical}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Insurance Tab */}
          {activeTab === "insurance" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Insurance Information
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Insurance
                </button>
              </div>

              <div className="space-y-6">
                {profileData.insurances.map((insurance) => (
                  <div
                    key={insurance.id}
                    className="border-2 border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white flex-shrink-0">
                          <Shield className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {insurance.provider}
                            </h3>
                            {insurance.isPrimary && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {insurance.coverage} Coverage
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Policy Number
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {insurance.policyNumber}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Group Number
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {insurance.groupNumber}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Expiration Date
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(
                            insurance.expirationDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Insurance Card Images
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                          <div className="text-center">
                            {insurance.cardFront ? (
                              <div className="relative">
                                <img
                                  src={insurance.cardFront}
                                  alt="Card Front"
                                  className="w-full h-40 object-cover rounded-lg"
                                />
                                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                                  <X className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  Card Front
                                </p>
                                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mx-auto">
                                  <Upload className="w-4 h-4" />
                                  Upload Image
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                          <div className="text-center">
                            {insurance.cardBack ? (
                              <div className="relative">
                                <img
                                  src={insurance.cardBack}
                                  alt="Card Back"
                                  className="w-full h-40 object-cover rounded-lg"
                                />
                                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                                  <X className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  Card Back
                                </p>
                                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mx-auto">
                                  <Upload className="w-4 h-4" />
                                  Upload Image
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
