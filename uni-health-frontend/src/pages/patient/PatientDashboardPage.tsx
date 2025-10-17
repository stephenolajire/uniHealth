import Chart from "../../components/patient/patientdashboard/Chart";
import HealthSummary from "../../components/patient/patientdashboard/HealthSummary";
import Notification from "../../components/patient/patientdashboard/Notification";
import ParentQuickActionCard from "../../components/patient/patientdashboard/ParentQuickActionCard";
import ParentStatCard from "../../components/patient/patientdashboard/ParentStatCard";
import RecentMedicalVisit from "../../components/patient/patientdashboard/RecentMedicalVisit";
import UpcomingAppointment from "../../components/patient/patientdashboard/UpcomingAppointment";

const PatientDashboardPage = () => {
  return (
    <div>
      <section>
        <ParentStatCard />
        <ParentQuickActionCard />
        <Chart />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <UpcomingAppointment />
          <HealthSummary />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RecentMedicalVisit />
          <Notification />
        </div>
      </section>
    </div>
  );
};

export default PatientDashboardPage;
