import AdminDashboardData from "./DashBoard/AdminDashboardData";
import EmployeeTaskBoard from "./DashBoard/EmployeeTaskBoard";
import ManagerTeamView from "./DashBoard/ManagerTeamView";
import useAuthStore from "../Store/useAuthStore";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 font-sans">
        <main className="p-8">
          <AdminDashboardData />
          <ManagerTeamView />
          <EmployeeTaskBoard />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
