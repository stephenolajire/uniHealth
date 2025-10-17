import { useState, useEffect } from "react";
import {
  Heart,
  Shield,
  Globe,
  Users,
  CheckCircle,
  Lock,
  Zap,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Search,
  MapPin,
  Navigation,
  Phone,
  Clock,
  Star,
  Sparkles,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function UniHealthEnhanced() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distance, setDistance] = useState(10);
  const [selectedType, setSelectedType] = useState("all");
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  console.log(userLocation)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const hospitals = [
    {
      id: 1,
      name: "City Medical Center",
      type: "Hospital",
      address: "456 Healthcare Ave, New York, NY",
      phone: "+1 234 567 8900",
      distance: 2.5,
      rating: 4.8,
      reviews: 234,
      lat: 40.7589,
      lng: -73.9851,
      services: ["Emergency", "Surgery", "Cardiology"],
      hours: "24/7",
    },
    {
      id: 2,
      name: "General Hospital",
      type: "Hospital",
      address: "123 Medical St, New York, NY",
      phone: "+1 234 567 8901",
      distance: 5.2,
      rating: 4.6,
      reviews: 189,
      lat: 40.7489,
      lng: -73.9851,
      services: ["Emergency", "Pediatrics", "Oncology"],
      hours: "24/7",
    },
    {
      id: 3,
      name: "HealthFirst Clinic",
      type: "Clinic",
      address: "789 Wellness Blvd, New York, NY",
      phone: "+1 234 567 8902",
      distance: 3.8,
      rating: 4.7,
      reviews: 156,
      lat: 40.7689,
      lng: -73.9751,
      services: ["General Practice", "Vaccination"],
      hours: "8 AM - 8 PM",
    },
    {
      id: 4,
      name: "Metro Pharmacy",
      type: "Pharmacy",
      address: "321 Care Road, New York, NY",
      phone: "+1 234 567 8903",
      distance: 1.2,
      rating: 4.9,
      reviews: 98,
      lat: 40.7689,
      lng: -73.9951,
      services: ["Prescriptions", "Consultations"],
      hours: "7 AM - 10 PM",
    },
    {
      id: 5,
      name: "Advanced Diagnostics Lab",
      type: "Laboratory",
      address: "654 Lab Lane, New York, NY",
      phone: "+1 234 567 8904",
      distance: 4.5,
      rating: 4.5,
      reviews: 112,
      lat: 40.7389,
      lng: -73.9851,
      services: ["Blood Tests", "X-Ray", "MRI"],
      hours: "6 AM - 6 PM",
    },
    {
      id: 6,
      name: "Vision Care Center",
      type: "Clinic",
      address: "987 Eye St, New York, NY",
      phone: "+1 234 567 8905",
      distance: 6.8,
      rating: 4.8,
      reviews: 145,
      lat: 40.7289,
      lng: -73.9651,
      services: ["Eye Exams", "Surgery"],
      hours: "9 AM - 6 PM",
    },
  ];

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation({ lat: 40.7589, lng: -73.9851 });
        }
      );
    } else {
      setUserLocation({ lat: 40.7589, lng: -73.9851 });
    }
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = hospital.distance <= distance;
    const matchesType =
      selectedType === "all" ||
      hospital.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesDistance && matchesType;
  });

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Access your medical records from anywhere in the world",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Military-grade encryption protects your sensitive data",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Organization",
      description: "Connect seamlessly with providers worldwide",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Consent-Based",
      description: "You control who sees your records and when",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Updates",
      description: "Real-time sync across all healthcare providers",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Better Care",
      description: "Informed decisions with complete medical history",
      color: "from-rose-500 to-pink-500",
    },
  ];

  const benefits = [
    "No more repeating tests or diagnoses",
    "Seamless care when traveling abroad",
    "Emergency access to critical health information",
    "Complete control over your medical data",
    "Reduce healthcare costs and time",
    "One unified health record for life",
  ];

  const stats = [
    { number: "1,247", label: "Healthcare Providers", icon: <Users /> },
    { number: "50K+", label: "Patients Registered", icon: <Heart /> },
    { number: "45+", label: "Countries", icon: <Globe /> },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp /> },
  ];

  const HospitalFinderModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
        <div className="flex flex-col h-[90vh]">
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Find Healthcare Providers
              </h3>
              <p className="text-gray-600">
                Discover trusted providers in your area
              </p>
            </div>
            <button
              onClick={() => setShowMapModal(false)}
              className="p-2 hover:bg-white rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or location..."
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={getUserLocation}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center font-medium"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Use My Location
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              >
                <option value="all">All Types</option>
                <option value="hospital">Hospitals</option>
                <option value="clinic">Clinics</option>
                <option value="pharmacy">Pharmacies</option>
                <option value="laboratory">Laboratories</option>
              </select>

              <select
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              >
                <option value={5}>Within 5 km</option>
                <option value={10}>Within 10 km</option>
                <option value={20}>Within 20 km</option>
                <option value={50}>Within 50 km</option>
              </select>

              <div className="flex items-center px-4 py-2.5 bg-blue-50 rounded-xl border-2 border-blue-100">
                <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-blue-600">
                  {filteredHospitals.length} providers found
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="w-full md:w-1/2 overflow-y-auto p-6 space-y-4">
              {filteredHospitals.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold">
                    No providers found
                  </p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your filters or search radius
                  </p>
                </div>
              ) : (
                filteredHospitals.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="border-2 border-gray-100 rounded-2xl p-5 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">
                            {hospital.name}
                          </h4>
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                              hospital.type === "Hospital"
                                ? "bg-blue-100 text-blue-700"
                                : hospital.type === "Clinic"
                                ? "bg-green-100 text-green-700"
                                : hospital.type === "Pharmacy"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {hospital.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold text-gray-900">
                            {hospital.rating}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({hospital.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-blue-600 font-bold">
                          <MapPin className="w-4 h-4 mr-1" />
                          {hospital.distance} km
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{hospital.address}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{hospital.hours}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all text-sm font-bold">
                        View Details
                      </button>
                      <button className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-bold">
                        Directions
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="hidden md:block w-1/2 bg-gradient-to-br from-blue-50 to-green-50 relative">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <MapPin className="relative w-20 h-20 text-blue-600 mx-auto" />
                  </div>
                  <p className="text-gray-900 font-bold text-xl mb-2">
                    Interactive Map View
                  </p>
                  <p className="text-sm text-gray-600 max-w-xs mb-8">
                    In production, this shows a live map with all providers
                    marked by location
                  </p>
                  <div className="space-y-3">
                    {filteredHospitals.slice(0, 5).map((hospital, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center space-x-3 text-sm bg-white/60 backdrop-blur-sm rounded-xl p-3"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            hospital.type === "Hospital"
                              ? "bg-blue-600"
                              : hospital.type === "Clinic"
                              ? "bg-green-600"
                              : hospital.type === "Pharmacy"
                              ? "bg-purple-600"
                              : "bg-orange-600"
                          }`}
                        ></div>
                        <span className="text-gray-900 font-medium">
                          {hospital.name}
                        </span>
                        <span className="text-gray-600">
                          {hospital.distance}km
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-green-600 p-2.5 rounded-xl">
                  <Heart className="w-7 h-7 text-white" fill="white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                UniHealth
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Benefits
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                How It Works
              </a>
              <button
                onClick={() => setShowMapModal(true)}
                className="text-gray-700 hover:text-blue-600 transition flex items-center font-medium"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Find Providers
              </button>
              <button className="px-5 py-2.5 text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold">
                Sign In
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:shadow-xl transition transform hover:scale-105 font-semibold">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Benefits
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                How It Works
              </a>
              <button
                onClick={() => {
                  setShowMapModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 hover:text-blue-600 flex items-center font-medium"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Find Providers
              </button>
              <button className="w-full px-5 py-2.5 text-blue-600 border-2 border-blue-600 rounded-xl font-semibold">
                Sign In
              </button>
              <button className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 rounded-full text-sm font-bold flex items-center space-x-2 w-fit">
                  <Sparkles className="w-4 h-4" />
                  <span>Your Health, Anywhere 🌍</span>
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                Healthcare
                <br />
                Without
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                  {" "}
                  Borders
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                One unified health record. Accessible worldwide. You control who
                sees it. No more repeating diagnoses. Just seamless, informed
                care everywhere you go.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setShowMapModal(true)}
                  className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all hover:shadow-lg flex items-center justify-center"
                >
                  <MapPin className="mr-2 w-5 h-5" />
                  Find Providers
                </button>
              </div>
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-green-400 border-4 border-white shadow-lg"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Trusted by{" "}
                    <span className="font-black text-gray-900 text-lg">
                      50,000+
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">patients worldwide</p>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl transform rotate-3 opacity-10"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b-2 border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 rounded-full blur opacity-50"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-black text-xl">
                          JD
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-lg">John Doe</p>
                        <p className="text-sm text-gray-500 font-medium">
                          PAT202501234
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-2 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border-2 border-blue-200">
                      <p className="text-sm text-blue-700 font-semibold mb-1">
                        Blood Type
                      </p>
                      <p className="text-3xl font-black text-blue-600">O+</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200">
                      <p className="text-sm text-green-700 font-semibold mb-1">
                        Allergies
                      </p>
                      <p className="text-3xl font-black text-green-600">2</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <span className="text-sm font-medium text-gray-600">
                        Last Visit
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        City Hospital, NY
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <span className="text-sm font-medium text-gray-600">
                        Prescriptions
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        3 active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <span className="text-sm font-medium text-gray-600">
                        Shared With
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        5 providers
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105">
                    View Full Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="inline-block mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center text-blue-600 transition-all duration-300 ${
                      hoveredCard === index ? "scale-110 shadow-lg" : ""
                    }`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                ✨ Features
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Modern Healthcare
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your health records securely and
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                  activeFeature === index
                    ? "border-blue-300 scale-105"
                    : "border-gray-100"
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500 ${feature.color}"></div>
                <div className="relative">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold">
                💎 Benefits
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Why Choose UniHealth?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transform your healthcare experience with these powerful benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border-2 border-white/20 hover:border-white/40 group"
              >
                <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                </div>
                <p className="text-white text-lg font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                🚀 Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              How UniHealth Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is simple and takes just a few minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create your account and set up your health profile in minutes",
                icon: <Users className="w-8 h-8" />,
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "2",
                title: "Connect Providers",
                desc: "Grant access to your healthcare providers with one click",
                icon: <Shield className="w-8 h-8" />,
                color: "from-purple-500 to-purple-600",
              },
              {
                step: "3",
                title: "Access Anywhere",
                desc: "Your complete medical history available wherever you need care",
                icon: <Globe className="w-8 h-8" />,
                color: "from-green-500 to-green-600",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="relative inline-block mb-8">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                    ></div>
                    <div
                      className={`relative w-24 h-24 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                      <span className="text-xl font-black text-gray-900">
                        {item.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                {index < 2 && (
                  <ChevronRight className="hidden lg:block absolute top-12 -right-6 w-12 h-12 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block mb-6">
            <Activity className="w-16 h-16 text-blue-600 mx-auto" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Ready to Take Control
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              of Your Health?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of patients experiencing seamless healthcare
            worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-black text-lg hover:shadow-2xl transition-all transform hover:scale-105">
              Get Started Free
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setShowMapModal(true)}
              className="px-10 py-5 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-black text-lg hover:border-blue-600 hover:text-blue-600 transition-all hover:shadow-lg flex items-center justify-center"
            >
              <MapPin className="mr-2 w-5 h-5" />
              Find Providers
            </button>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            No credit card required • Free forever • HIPAA compliant
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2.5 rounded-xl">
                  <Heart className="w-7 h-7" fill="white" />
                </div>
                <span className="text-2xl font-black">UniHealth</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Healthcare without borders. Your health, your control.
              </p>
            </div>
            <div>
              <h4 className="font-black mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-6 text-lg">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 UniHealth. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Hospital Finder Modal */}
      {showMapModal && <HospitalFinderModal />}
    </div>
  );
}
