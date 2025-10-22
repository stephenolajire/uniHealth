import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientDashboardPage from "./pages/patient/PatientDashboardPage";
import PatientLayout from "./components/layout/dashboardlayout/PatientLayout";
import PatientAppointments from "./pages/patient/AppointmentsPage";
import AppointmentBooking from "./pages/patient/AppointmentBooking";
import NearbyHospitalsBooking from "./pages/patient/NearByHospital";
import ProfilePage from "./pages/patient/ProfilePage";
import UniHealthEnhanced from "./pages/HomePage";
import AccessControlPage from "./pages/patient/ConsentPage";
import MedicalRecordsPage from "./pages/patient/MedicalRecordPage";
import ActivityLogPage from "./pages/patient/ActivityLog";
import LoginPage from "./pages/auth/LoginPage";
import VerifyEmail from "./pages/auth/VerifyEmail";
import FindNearby from "./pages/FindNearby";
import MainLayout from "./components/layout/mainlayout/MainLayout";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<UniHealthEnhanced />} />
            <Route path="find-a-provider" element={<FindNearby />} />
          </Route>
        

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<PatientDashboardPage />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="booking" element={<AppointmentBooking />} />
            <Route path="nearby" element={<NearbyHospitalsBooking />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="consent" element={<AccessControlPage />} />
            <Route path="medical-records" element={<MedicalRecordsPage />} />
            <Route path="activity" element={<ActivityLogPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
