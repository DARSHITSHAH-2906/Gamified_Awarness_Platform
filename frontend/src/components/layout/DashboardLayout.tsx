import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useAuth } from '@/context/AuthContext';

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-light">
      <DashboardSidebar onLogout={handleLogout} />
      {/* Main Content Area */}
      <main className="lg:ml-64 p-4 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
