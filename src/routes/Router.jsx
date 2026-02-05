import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Landing from '../pages/Landing'
import Loading from '../pages/Loading'
import AppShell from '../components/templates/AppShell'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import Profile from '../pages/common/Profile'
import Settings from '../pages/common/Settings'
import Notifications from '../pages/common/Notifications'
import ProjectDetail from '../pages/common/ProjectDetail'
import BrowseCampaigns from '../pages/influencer/BrowseCampaigns'
import MyApplications from '../pages/influencer/MyApplications'
import ActiveProjects from '../pages/influencer/ActiveProjects'
import Earnings from '../pages/influencer/Earnings'
import Analytics from '../pages/influencer/Analytics'
import Messages from '../pages/influencer/Messages'
import CreateCampaign from '../pages/brand/CreateCampaign'
import MyCampaigns from '../pages/brand/MyCampaigns'
import BrowseInfluencers from '../pages/brand/BrowseInfluencers'
import InfluencerProfile from '../pages/brand/InfluencerProfile'
import CampaignDetail from '../pages/brand/CampaignDetail'
import ReviewApplications from '../pages/brand/ReviewApplications'
import BrandProjectDetail from '../pages/brand/BrandProjectDetail'

function PrivateRoute({ children }){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  return children
}

export function AppRouter(){
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/app" element={<PrivateRoute><AppShell /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="project/:id" element={<ProjectDetail />} />
        <Route path="browse-campaigns" element={<BrowseCampaigns />} />
        <Route path="my-applications" element={<MyApplications />} />
        <Route path="active-projects" element={<ActiveProjects />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="messages" element={<Messages />} />
        <Route path="create-campaign" element={<CreateCampaign />} />
        <Route path="my-campaigns" element={<MyCampaigns />} />
        <Route path="campaign/:id" element={<CampaignDetail />} />
        <Route path="campaign/:id/review" element={<ReviewApplications />} />
        <Route path="browse-influencers" element={<BrowseInfluencers />} />
        <Route path="influencer/:id" element={<InfluencerProfile />} />
        <Route path="brand-project/:id" element={<BrandProjectDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
