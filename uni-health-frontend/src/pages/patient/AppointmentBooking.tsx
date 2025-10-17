import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Video,
  Building2,
  Star,
  Upload,
  MapPin,
  User,
  FileText,
  CheckCircle,
  Heart,
  Baby,
  Bone,
  Stethoscope,
  Smile,
  Brain,
} from "lucide-react";
import { Link } from "react-router-dom";

// Type Definitions
interface Department {
  id: number;
  name: string;
  doctorCount: number;
  icon: React.ComponentType<any>;
}

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

// interface Hospital {
//   id: number;
//   name: string;
//   address: string;
//   location: {
//     lat: number;
//     lng: number;
//   };
// }

// interface AppointmentBookingProps {
//   userRegisteredHospital: Hospital | null;
//   onBack: () => void;
//   onSwitchToNearby: () => void;
// }

type AppointmentType = "in-person" | "video";

const AppointmentBooking = () => {
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [registeredDoctors, setRegisteredDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentType, setAppointmentType] =
    useState<AppointmentType>("in-person");
  const [purposeOfVisit, setPurposeOfVisit] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const mockDepartments: Department[] = [
    { id: 1, name: "Cardiology", doctorCount: 5, icon: Heart },
    { id: 2, name: "Pediatrics", doctorCount: 8, icon: Baby },
    { id: 3, name: "Orthopedics", doctorCount: 6, icon: Bone },
    { id: 4, name: "General Medicine", doctorCount: 10, icon: Stethoscope },
    { id: 5, name: "Dermatology", doctorCount: 4, icon: Smile },
    { id: 6, name: "Neurology", doctorCount: 5, icon: Brain },
  ];

  const mockRegisteredDoctors: Record<string, Doctor[]> = {
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

  useEffect(() => {
    // Simulate fetching departments from API
    setDepartments(mockDepartments);
  }, []);

  const handleDepartmentSelect = (deptName: string) => {
    setSelectedDepartment(deptName);
    setRegisteredDoctors(mockRegisteredDoctors[deptName] || []);
    setBookingStep(2);
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedDepartment("");
    setSelectedDoctor(null);
    setPurposeOfVisit("");
    setAppointmentType("in-person");
    setTermsAccepted(false);
  };

  const handleSubmitBooking = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue.");
      return;
    }

    const bookingData = {
      //   hospital: userRegisteredHospital,
      department: selectedDepartment,
      doctor: selectedDoctor,
      appointmentType,
      purposeOfVisit,
      submittedAt: new Date().toISOString(),
    };

    console.log("Booking submitted:", bookingData);
    alert(
      "Appointment request submitted successfully! The doctor will schedule a date and time for you."
    );
    resetBooking();
  };

  const stepTitles = [
    "Select Department",
    "Choose Doctor",
    "Appointment Details",
    "Review & Submit",
  ];
  const totalSteps = 4;

  const canContinue = () => {
    switch (bookingStep) {
      case 1:
        return !!selectedDepartment;
      case 2:
        return !!selectedDoctor;
      case 3:
        return !!purposeOfVisit && !!appointmentType;
      case 4:
        return termsAccepted;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                // onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Book Appointment
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {/* {userRegisteredHospital?.name || "Your Registered Hospital"} */}
                </p>
              </div>
            </div>

            <Link to="/patient/nearby">
              <button
                //   onClick={onSwitchToNearby}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Find Nearby Hospitals</span>
                <span className="sm:hidden">Nearby</span>
              </button>
            </Link>
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
                    <span className="text-xs text-gray-600 mt-2 text-center hidden sm:block">
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
          {/* STEP 1: Department Selection */}
          {bookingStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Select Department
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => handleDepartmentSelect(dept.name)}
                      className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                    >
                      <div className="mb-3">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {dept.doctorCount}{" "}
                        {dept.doctorCount === 1 ? "doctor" : "doctors"}{" "}
                        available
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Doctor Selection */}
          {bookingStep === 2 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Choose Doctor - {selectedDepartment}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {registeredDoctors.length}{" "}
                    {registeredDoctors.length === 1 ? "doctor" : "doctors"}{" "}
                    available
                  </p>
                </div>
                <button
                  onClick={() => {
                    setBookingStep(1);
                    setSelectedDepartment("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change Department
                </button>
              </div>

              <div className="space-y-4">
                {registeredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setBookingStep(3);
                    }}
                    className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
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

          {/* STEP 3: Appointment Details */}
          {bookingStep === 3 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Appointment Details
                </h2>
                <button
                  onClick={() => {
                    setBookingStep(2);
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

          {/* STEP 4: Review & Submit */}
          {bookingStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Review Your Appointment Request
              </h2>

              <div className="space-y-6">
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
                          {appointmentType === "in-person"
                            ? "In-Person"
                            : "Video"}{" "}
                          Consultation
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
              onClick={() => {
                if (bookingStep === 1) {
                  //   onBack();
                } else {
                  setBookingStep(bookingStep - 1);
                }
              }}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {bookingStep === 1 ? "Cancel" : "Back"}
            </button>

            {bookingStep < totalSteps ? (
              <button
                onClick={() => setBookingStep(bookingStep + 1)}
                disabled={!canContinue()}
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

export default AppointmentBooking;
