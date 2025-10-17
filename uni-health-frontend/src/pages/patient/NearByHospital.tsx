import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Video,
  Building2,
  Star,
  Upload,
  Map as MapIcon,
  Navigation,
  User,
  FileText,
  CheckCircle,
  Heart,
  Smile,
  Baby,
  Bone,
  Stethoscope,
  Brain,
} from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  departments: string[];
}

interface Department {
  id: number;
  name: string;
  doctorCount: number;
  icon: React.ComponentType<any> | string;
}

const isDepartmentName = (name: string): name is DepartmentName => {
  return [
    "Cardiology",
    "Pediatrics",
    "Orthopedics",
    "General Medicine",
    "Dermatology",
    "Neurology",
  ].includes(name);
};

interface Doctor {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  fee: string;
  bio: string;
  supportsVideo: boolean;
  supportsInPerson: boolean;
}

type DepartmentName =
  | "Cardiology"
  | "Pediatrics"
  | "Orthopedics"
  | "General Medicine"
  | "Dermatology"
  | "Neurology";

type DoctorsMap = {
  [K in DepartmentName]: Doctor[];
};

const NearbyHospitalsBooking = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  // Fix the typing for nearbyHospitals state
  const [nearbyHospitals, setNearbyHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [hospitalDepartments, setHospitalDepartments] = useState<Department[]>(
    []
  );
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [hospitalDoctors, setHospitalDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentType, setAppointmentType] = useState<"in-person" | "video">(
    "in-person"
  );
  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [showBackConfirmation, setShowBackConfirmation] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const mockDepartments: Department[] = [
    { id: 1, name: "Cardiology", doctorCount: 5, icon: Heart },
    { id: 2, name: "Pediatrics", doctorCount: 8, icon: Baby },
    { id: 3, name: "Orthopedics", doctorCount: 6, icon: Bone },
    { id: 4, name: "General Medicine", doctorCount: 10, icon: Stethoscope },
    { id: 5, name: "Dermatology", doctorCount: 4, icon: Smile },
    { id: 6, name: "Neurology", doctorCount: 5, icon: Brain},
  ];

  const mockDoctors: DoctorsMap = {
    Cardiology: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        avatar: "SJ",
        specialty: "Cardiologist",
        experience: "15 years",
        rating: 4.8,
        reviews: 230,
        fee: "₦15,000",
        bio: "Specialized in heart disease prevention and treatment",
        supportsVideo: true,
        supportsInPerson: true,
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        avatar: "MC",
        specialty: "Cardiologist",
        experience: "12 years",
        rating: 4.9,
        reviews: 198,
        fee: "₦18,000",
        bio: "Expert in cardiac imaging and interventional cardiology",
        supportsVideo: true,
        supportsInPerson: true,
      },
    ],
    Pediatrics: [
      {
        id: 3,
        name: "Dr. Emily Brown",
        avatar: "EB",
        specialty: "Pediatrician",
        experience: "10 years",
        rating: 4.9,
        reviews: 312,
        fee: "₦12,000",
        bio: "Focused on child development and preventive care",
        supportsVideo: true,
        supportsInPerson: true,
      },
      {
        id: 4,
        name: "Dr. James Wilson",
        avatar: "JW",
        specialty: "Pediatrician",
        experience: "8 years",
        rating: 4.7,
        reviews: 156,
        fee: "₦10,000",
        bio: "Specialist in pediatric infectious diseases",
        supportsVideo: false,
        supportsInPerson: true,
      },
    ],
    Orthopedics: [
      {
        id: 5,
        name: "Dr. David Martinez",
        avatar: "DM",
        specialty: "Orthopedic Surgeon",
        experience: "18 years",
        rating: 4.8,
        reviews: 275,
        fee: "₦20,000",
        bio: "Expert in joint replacement and sports medicine",
        supportsVideo: false,
        supportsInPerson: true,
      },
    ],
    "General Medicine": [
      {
        id: 6,
        name: "Dr. Amara Okafor",
        avatar: "AO",
        specialty: "General Practitioner",
        experience: "9 years",
        rating: 4.6,
        reviews: 189,
        fee: "₦8,000",
        bio: "Comprehensive primary care for all ages",
        supportsVideo: true,
        supportsInPerson: true,
      },
    ],
    Dermatology: [
      {
        id: 7,
        name: "Dr. Lisa Anderson",
        avatar: "LA",
        specialty: "Dermatologist",
        experience: "11 years",
        rating: 4.9,
        reviews: 223,
        fee: "₦14,000",
        bio: "Specialist in medical and cosmetic dermatology",
        supportsVideo: true,
        supportsInPerson: true,
      },
    ],
    Neurology: [
      {
        id: 8,
        name: "Dr. Chukwu Nwosu",
        avatar: "CN",
        specialty: "Neurologist",
        experience: "16 years",
        rating: 4.7,
        reviews: 167,
        fee: "₦17,000",
        bio: "Expert in neurological disorders and brain health",
        supportsVideo: true,
        supportsInPerson: true,
      },
    ],
  };

  const mockNearbyHospitals: Hospital[] = [
    {
      id: 1,
      name: "City General Hospital",
      address: "45 Aba Road, Port Harcourt",
      distance: "2.3 km",
      rating: 4.5,
      reviews: 456,
      coordinates: { lat: 4.8156, lng: 7.0498 },
      departments: [
        "Cardiology",
        "Pediatrics",
        "General Medicine",
        "Orthopedics",
      ],
    },
    {
      id: 2,
      name: "St. Mary's Medical Center",
      address: "12 Ikwerre Road, Port Harcourt",
      distance: "3.8 km",
      rating: 4.7,
      reviews: 328,
      coordinates: { lat: 4.82, lng: 7.04 },
      departments: [
        "Neurology",
        "Dermatology",
        "General Medicine",
        "Pediatrics",
      ],
    },
    {
      id: 3,
      name: "Rivers State University Teaching Hospital",
      address: "East-West Road, Port Harcourt",
      distance: "5.1 km",
      rating: 4.6,
      reviews: 892,
      coordinates: { lat: 4.81, lng: 7.06 },
      departments: [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "General Medicine",
        "Pediatrics",
        "Dermatology",
      ],
    },
    {
      id: 4,
      name: "Braithwaite Memorial Hospital",
      address: "2 Harley Street, Port Harcourt",
      distance: "4.2 km",
      rating: 4.4,
      reviews: 567,
      coordinates: { lat: 4.805, lng: 7.035 },
      departments: ["General Medicine", "Pediatrics", "Dermatology"],
    },
  ];

  const handleBack = () => {
    if (bookingStep === 1) {
      setShowBackConfirmation(true);
    } else {
      setBookingStep(bookingStep - 1);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setNearbyHospitals(mockNearbyHospitals);
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation({ lat: 4.8156, lng: 7.0498 });
          setNearbyHospitals(mockNearbyHospitals);
          setLocationLoading(false);
        }
      );
    } else {
      setUserLocation({ lat: 4.8156, lng: 7.0498 });
      setNearbyHospitals(mockNearbyHospitals);
      setLocationLoading(false);
    }
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setHospitalDepartments(
      hospital.departments
        .map((deptName) => mockDepartments.find((d) => d.name === deptName))
        .filter((dept): dept is Department => dept !== undefined)
    );
    setBookingStep(2);
  };

  const handleDepartmentSelect = (deptName: DepartmentName) => {
    setSelectedDepartment(deptName);
    setHospitalDoctors(mockDoctors[deptName] || []);
    setBookingStep(3);
  };
  const resetBooking = () => {
    setBookingStep(1);
    setSelectedHospital(null);
    setSelectedDepartment("");
    setSelectedDoctor(null);
    setPurposeOfVisit("");
    setAppointmentType("in-person");
  };

  const handleSubmitBooking = () => {
    const bookingData = {
      hospital: selectedHospital,
      department: selectedDepartment,
      doctor: selectedDoctor,
      appointmentType,
      purposeOfVisit,
      //   attachedDocuments,
    };

    console.log("Booking submitted:", bookingData);
    alert(
      "Appointment request submitted successfully! The doctor will schedule a date and time for you."
    );
    resetBooking();
  };

  const stepTitles = [
    "Select Hospital",
    "Select Department",
    "Choose Doctor",
    "Appointment Details",
    "Review & Submit",
  ];
  const totalSteps = 5;

  const BackConfirmationDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cancel Booking?
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel? Your booking progress will be lost.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowBackConfirmation(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            No, Continue
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showBackConfirmation && <BackConfirmationDialog />}
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Find Nearby Hospitals
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Book appointments at hospitals near you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const step = index + 1;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        bookingStep >= step
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {bookingStep > step ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step
                      )}
                    </div>
                    <span className="text-xs text-gray-600 mt-2 text-center">
                      {stepTitles[index]}
                    </span>
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        bookingStep > step ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* STEP 1: Hospital Selection */}
          {bookingStep === 1 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Hospitals Near You
                </h2>
                {userLocation && (
                  <button
                    onClick={getUserLocation}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                  >
                    <Navigation className="w-4 h-4" />
                    Update Location
                  </button>
                )}
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-80 mb-6 flex items-center justify-center relative overflow-hidden">
                <MapIcon className="w-16 h-16 text-blue-300 absolute" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center z-10">
                    <p className="text-gray-700 font-semibold text-lg mb-2">
                      Map View
                    </p>
                    <p className="text-sm text-gray-600">
                      {locationLoading
                        ? "Getting your location..."
                        : "Showing hospitals near you"}
                    </p>
                  </div>
                </div>

                {/* Map Markers Simulation */}
                {!locationLoading &&
                  nearbyHospitals.map((hospital, index) => (
                    <div
                      key={hospital.id}
                      className="absolute w-10 h-10 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold animate-pulse"
                      style={{
                        left: `${20 + index * 18}%`,
                        top: `${30 + (index % 2) * 25}%`,
                      }}
                    >
                      {index + 1}
                    </div>
                  ))}
              </div>

              {/* Hospital List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {nearbyHospitals.length} Hospitals Found
                </h3>

                {nearbyHospitals.map((hospital, index) => (
                  <div
                    key={hospital.id}
                    onClick={() => handleHospitalSelect(hospital)}
                    className="border-2 border-gray-200 rounded-lg p-5 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {hospital.name}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <MapPin className="w-4 h-4" />
                              {hospital.address}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-blue-600">
                            {hospital.distance}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-sm">
                            {hospital.rating}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({hospital.reviews} reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {hospital.departments.slice(0, 3).map((dept) => (
                            <span
                              key={dept}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {dept}
                            </span>
                          ))}
                          {hospital.departments.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{hospital.departments.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Department Selection */}
          {bookingStep === 2 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Select Department
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedHospital?.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setBookingStep(1);
                    setSelectedHospital(null);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change Hospital
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitalDepartments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => {
                      if (isDepartmentName(dept.name)) {
                        handleDepartmentSelect(dept.name);
                      }
                    }}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="text-4xl mb-3">
                      {typeof dept.icon === "string" ? (
                        dept.icon
                      ) : (
                        <dept.icon className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {dept.doctorCount}{" "}
                      {dept.doctorCount === 1 ? "doctor" : "doctors"} available
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Doctor Selection */}
          {bookingStep === 3 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Choose Doctor - {selectedDepartment}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedHospital?.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setBookingStep(2);
                    setSelectedDepartment("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change Department
                </button>
              </div>

              <div className="space-y-4">
                {hospitalDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setBookingStep(4);
                    }}
                    className="border-2 border-gray-200 rounded-lg p-5 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {doctor.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {doctor.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {doctor.specialty} • {doctor.experience}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {doctor.fee}
                            </p>
                            <p className="text-xs text-gray-500">
                              consultation
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-sm">
                            {doctor.rating}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({doctor.reviews} reviews)
                          </span>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">
                          {doctor.bio}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                          {doctor.supportsVideo && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Video Consultation
                            </span>
                          )}
                          {doctor.supportsInPerson && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              In-Person Visit
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Appointment Details */}
          {bookingStep === 4 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Appointment Details
                </h2>
                <button
                  onClick={() => {
                    setBookingStep(3);
                    setSelectedDoctor(null);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change Doctor
                </button>
              </div>

              <div className="space-y-6">
                {/* Selected Doctor Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
                      {selectedDoctor?.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedDoctor?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedDoctor?.specialty}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Consultation Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDoctor?.supportsInPerson && (
                      <button
                        onClick={() => setAppointmentType("in-person")}
                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                          appointmentType === "in-person"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Building2 className="w-6 h-6 text-blue-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">
                            In-Person Visit
                          </p>
                          <p className="text-xs text-gray-600">
                            Visit the hospital
                          </p>
                        </div>
                      </button>
                    )}
                    {selectedDoctor?.supportsVideo && (
                      <button
                        onClick={() => setAppointmentType("video")}
                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                          appointmentType === "video"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Video className="w-6 h-6 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">
                            Video Consultation
                          </p>
                          <p className="text-xs text-gray-600">
                            Online video call
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Purpose of Visit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Appointment *
                  </label>
                  <textarea
                    value={purposeOfVisit}
                    onChange={(e) => setPurposeOfVisit(e.target.value)}
                    rows={5}
                    placeholder="Please describe your symptoms, concerns, or reason for this appointment in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This information helps the doctor prepare for your
                    consultation
                  </p>
                </div>

                {/* Upload Documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach Medical Documents (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      Previous test results, prescriptions, medical reports
                      (PDF, JPG, PNG - Max 10MB)
                    </p>
                  </div>
                </div>

                {/* Info Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <FileText className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900 mb-1">
                        About Scheduling
                      </p>
                      <p className="text-xs text-yellow-800">
                        After submitting your appointment request, the doctor
                        will review your information and schedule a suitable
                        date and time. You will be notified via SMS and email
                        once the appointment is confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {bookingStep === 5 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Review Your Appointment Request
              </h2>

              <div className="space-y-6">
                {/* Hospital Info */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Hospital
                  </h3>
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedHospital?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedHospital?.address}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        {selectedHospital?.distance} away
                      </p>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Healthcare Provider
                  </h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                      {selectedDoctor?.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-lg">
                        {selectedDoctor?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedDoctor?.specialty}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedDepartment} Department
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">
                          {selectedDoctor?.rating}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({selectedDoctor?.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Appointment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      {appointmentType === "video" ? (
                        <Video className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Consultation Type
                        </p>
                        <p className="text-sm text-gray-900 capitalize">
                          {appointmentType} Consultation
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Purpose of Visit
                        </p>
                        <p className="text-sm text-gray-900">
                          {purposeOfVisit}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Consultation Fee
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedDoctor?.fee}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    What happens next?
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>
                        The doctor will review your appointment request within
                        24 hours
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>
                        You'll receive a notification with the confirmed date
                        and time
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>
                        Reminders will be sent 24 hours and 1 hour before your
                        appointment
                      </span>
                    </li>
                    {appointmentType === "video" && (
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>
                          A video call link will be sent to you before the
                          appointment
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Terms Checkbox */}
                <div className="border-t border-gray-200 pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that the information provided is accurate and I
                      agree to the cancellation policy. I understand that
                      cancellations with less than 24 hours notice may incur a
                      fee.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {bookingStep === 1 ? "Cancel" : "Back"}
            </button>

            {bookingStep < totalSteps ? (
              <button
                onClick={() => {
                  if (bookingStep === 1 && !selectedHospital) return;
                  if (bookingStep === 2 && !selectedDepartment) return;
                  if (bookingStep === 3 && !selectedDoctor) return;
                  if (
                    bookingStep === 4 &&
                    (!purposeOfVisit || !appointmentType)
                  )
                    return;
                  setBookingStep(bookingStep + 1);
                }}
                disabled={
                  (bookingStep === 1 && !selectedHospital) ||
                  (bookingStep === 2 && !selectedDepartment) ||
                  (bookingStep === 3 && !selectedDoctor) ||
                  (bookingStep === 4 && (!purposeOfVisit || !appointmentType))
                }
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmitBooking}
                disabled={!termsAccepted}
                className="px-8 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-5 h-5" />
                Submit Appointment Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyHospitalsBooking;
