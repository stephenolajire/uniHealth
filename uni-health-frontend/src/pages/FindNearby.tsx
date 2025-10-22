import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  Building2,
  Loader2,
  Navigation,
  Clock,
  Star,
  MapPin,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom user location icon
const userIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzIxOTZmMyIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjgiLz48L3N2Zz4=",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Custom hospital icon
const hospitalIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2RjMjYyNiIgd2lkdGg9IjQ4cHgiIGhlaWdodD0iNDhweCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xOSAySDVhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNGEyIDIgMCAwIDAtMi0yem0tNyAxNGgtMnYtNEg2di0yaDR2LTRoMnY0aDR2MmgtNHY0eiIvPjwvc3ZnPg==",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface Hospital {
  id: number;
  name: string;
  address: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  hours: string;
  rating: number;
  services: string[];
  type: string;
  emergency: boolean;
}

// Enhanced hospital data with more details
const nearbyHospitals: Hospital[] = [
  {
    id: 1,
    name: "City General Hospital",
    address: "123 Healthcare Ave, Port Harcourt",
    distance: "2.3 km",
    coordinates: { lat: 4.8156, lng: 7.0498 },
    phone: "+234 803 123 4567",
    hours: "24/7 Emergency Care",
    rating: 4.5,
    services: ["Emergency Care", "Surgery", "ICU", "Pediatrics"],
    type: "General Hospital",
    emergency: true,
  },
  {
    id: 2,
    name: "Riverbank Medical Center",
    address: "456 Wellness St, Port Harcourt",
    distance: "3.1 km",
    coordinates: { lat: 4.82, lng: 7.06 },
    phone: "+234 803 234 5678",
    hours: "Mon-Sat: 8AM-8PM",
    rating: 4.2,
    services: ["General Medicine", "Diagnostics", "Pharmacy"],
    type: "Medical Center",
    emergency: false,
  },
  {
    id: 3,
    name: "Lakeside Clinic",
    address: "789 Healing Blvd, Port Harcourt",
    distance: "4.5 km",
    coordinates: { lat: 4.81, lng: 7.04 },
    phone: "+234 803 345 6789",
    hours: "Mon-Fri: 9AM-5PM",
    rating: 4.0,
    services: ["Consultation", "Laboratory", "Vaccination"],
    type: "Clinic",
    emergency: false,
  },
];

// Component to handle map center updates
const ChangeMapView = ({
  coords,
}: {
  coords: { lat: number; lng: number };
}) => {
  const map = useMap();
  map.setView(coords, 15);
  return null;
};

const FindNearby = () => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        () => {
          // Default to Port Harcourt coordinates
          setUserLocation({ lat: 4.8156, lng: 7.0498 });
          setIsLoading(false);
        }
      );
    }
  }, []);

  const getDirections = (hospital: Hospital) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`;
      window.open(url, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Locating nearby hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-25 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Find Nearby Healthcare
              </h1>
              <p className="text-gray-600 mt-1">
                Discover hospitals and clinics near your location in Port
                Harcourt
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-25 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Hospitals List */}
          <div className="w-full lg:w-2/5 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {nearbyHospitals.length} Healthcare Facilities
                </h2>
                <span className="text-sm text-gray-500">
                  Sorted by distance
                </span>
              </div>
            </div>

            {nearbyHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`bg-white rounded-lg cursor-pointer transition-all ${
                  selectedHospital?.id === hospital.id
                    ? "border-2 border-primary-600 shadow-md"
                    : "border border-gray-200 hover:border-primary-400 hover:shadow-sm"
                }`}
                onClick={() => setSelectedHospital(hospital)}
              >
                <div className="p-4">
                  {/* Hospital Name and Type */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">
                          {hospital.type}
                        </span>
                        {hospital.emergency && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            24/7 Emergency
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-900">
                        {hospital.rating}
                      </span>
                    </div>
                  </div>

                  {/* Location and Distance */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {hospital.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-600">
                      <Navigation className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {hospital.distance} away
                      </span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {hospital.services.slice(0, 3).map((service, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {hospital.services.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{hospital.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contact and Hours */}
                  <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3 mt-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{hospital.hours}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(hospital);
                      }}
                      className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      <Navigation className="w-4 h-4" />
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-[800px] lg:sticky lg:top-8">
              {userLocation && (
                <MapContainer
                  center={[userLocation.lat, userLocation.lng]}
                  zoom={14}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {/* User Location Marker */}
                  <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={userIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <p className="font-semibold text-blue-600">
                          Your Location
                        </p>
                        <p className="text-sm text-gray-600">
                          Port Harcourt, Rivers State
                        </p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Hospital Markers */}
                  {nearbyHospitals.map((hospital) => (
                    <Marker
                      key={hospital.id}
                      position={[
                        hospital.coordinates.lat,
                        hospital.coordinates.lng,
                      ]}
                      icon={hospitalIcon}
                      eventHandlers={{
                        click: () => setSelectedHospital(hospital),
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h3 className="font-bold text-gray-900 mb-2">
                            {hospital.name}
                          </h3>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="font-semibold">
                                {hospital.rating}
                              </span>
                            </div>
                            <p className="text-gray-600">{hospital.address}</p>
                            <p className="font-semibold text-blue-600">
                              {hospital.distance}
                            </p>
                            <p className="text-gray-600">{hospital.phone}</p>
                            <div className="pt-2 border-t border-gray-200 mt-2">
                              <p className="text-xs text-gray-500 mb-1">
                                Services:
                              </p>
                              <p className="text-xs text-gray-700">
                                {hospital.services.join(", ")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Update map center when selecting hospital */}
                  {selectedHospital && (
                    <ChangeMapView coords={selectedHospital.coordinates} />
                  )}
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindNearby;
