import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/not-found';

import Dashboard from './pages/Dashboard';
import PlayPage from './pages/PlayPage';
import TopicsPage from './pages/TopicsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ShopPage from './pages/ShopPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import MazePage from './pages/MazePage';
import CommunityPage from './pages/CommunityPage';
import DuelsPage from './pages/DuelsPage';
import RegionPage from './pages/RegionPage';

import { useAuth } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected App Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={isAuthenticated ? <Dashboard /> : <Navigate to="/login?dest=/dashboard?return=/login" />} />
          <Route path="play" element={isAuthenticated ? <PlayPage /> : <Navigate to="/login?dest=/dashboard/play?return=/login" />} />
          <Route path="play/maze" element={isAuthenticated ? <MazePage /> : <Navigate to="/login?dest=/dashboard/play/maze?return=/login" />} />
          <Route path="topics" element={isAuthenticated ? <TopicsPage /> : <Navigate to="/login?dest=/dashboard/topics?return=/login" />} />
          <Route path="topics/:regionId" element={isAuthenticated ? <RegionPage /> : <Navigate to="/login?dest=/dashboard/topics?return=/login" />} />
          <Route path="leaderboard" element={isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login?dest=/dashboard/leaderboard?return=/login" />} />
          <Route path="shop" element={isAuthenticated ? <ShopPage /> : <Navigate to="/login?dest=/dashboard/shop?return=/login" />} />
          <Route path="settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login?dest=/dashboard/settings?return=/login" />} />
          <Route path="profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login?dest=/dashboard/profile?return=/login" />} />
          <Route path="community" element={isAuthenticated ? <CommunityPage /> : <Navigate to="/login?dest=/dashboard/community?return=/login" />} />
          <Route path="duels" element={isAuthenticated ? <DuelsPage /> : <Navigate to="/login?dest=/dashboard/duels?return=/login" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
