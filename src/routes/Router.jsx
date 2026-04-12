import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Landing from '../pages/Landing';
import Loading from '../pages/Loading';
import AppShell from '../components/templates/AppShell';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Settings from '../pages/common/Settings';
import Notifications from '../pages/common/Notifications';
import ProjectDetail from '../pages/common/ProjectDetail';
import BrowseCampaigns from '../pages/influencer/BrowseCampaigns';
import MyApplications from '../pages/influencer/MyApplications';
import InfluencerProfile from '../pages/influencer/InfluencerProfile';
import ActiveProjects from '../pages/influencer/ActiveProjects';
import Earnings from '../pages/influencer/Earnings';
import Analytics from '../pages/influencer/Analytics';
import Messages from '../pages/influencer/Messages';
import CreateCampaign from '../pages/brand/CreateCampaign';
import MyCampaigns from '../pages/brand/MyCampaigns';
import ReviewApplications from '../pages/brand/ReviewApplications';
import BrandProfile from '../pages/brand/BrandProfile';
import CampaignDetail from '../pages/brand/CampaignDetail';
import BrowseInfluencers from '../pages/brand/BrowseInfluencers';
import BrandProjectDetail from '../pages/brand/BrandProjectDetail';
import EditCampaign from '../pages/brand/EditCampaign';
import { ROLES } from '../lib/roles';
import InfluencerCampaignDetail from '../pages/influencer/CampaignDetail';
import ProjectSubmission from '../pages/influencer/ProjectSubmission';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function AppRouter() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<PrivateRoute><AppShell /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        
        {user?.role === ROLES.BRAND ? (
          <>
            <Route path="profile" element={<BrandProfile />} />
            <Route path="create-campaign" element={<CreateCampaign />} />
            <Route path="my-campaigns" element={<MyCampaigns />} />
            <Route path="campaign/:campaignId/edit" element={<EditCampaign />} />
            <Route path="campaign/:id" element={<CampaignDetail />} />
            <Route path="campaign/:id/review" element={<ReviewApplications />} />
            <Route path="browse-influencers" element={<BrowseInfluencers />} />
            <Route path="influencers/:id" element={<InfluencerProfile />} />
            <Route path="project/:id" element={<BrandProjectDetail />} />
          </>
        ) : (
          <>
            <Route path="profile" element={<InfluencerProfile />} />
            <Route path="browse-campaigns" element={<BrowseCampaigns />} />
            <Route path="campaign/:campaignId" element={<InfluencerCampaignDetail />} />
            <Route path="my-applications" element={<MyApplications />} />
            <Route path="active-projects" element={<ActiveProjects />} />
            <Route path="project/:id/submit" element={<ProjectSubmission />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="messages" element={<Messages />} />
            <Route path="project/:id" element={<ProjectDetail />} />
          </>
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
