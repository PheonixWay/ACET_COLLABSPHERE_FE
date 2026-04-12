import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import StatCard from '../../components/molecules/StatCard';

export default function Dashboard() {
  const { user } = useAuth()
  const isBrand = user?.role === 'brand';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isBrand ? 'Brand Control Center 🏢' : `Welcome back, ${user?.name?.split(' ')[0]} 👋`}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isBrand 
              ? 'Monitor campaigns, approve applications, and manage payouts.'
              : 'Track your earnings, deadlines, and profile growth.'}
          </p>
        </div>
      </div>

      {/* Render Dashboard based on Role */}
      {isBrand ? <BrandDashboard /> : <InfluencerDashboard user={user} />}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* INFLUENCER DASHBOARD                              */
/* -------------------------------------------------------------------------- */
function InfluencerDashboard({ user }) {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    submittedProjects: 0,
    activeProjects: 0,
    applications: 0,
    rejected: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/influencer/dashboard-stats/${user._id}`);
      console.log("Dashboard stats response:", data);
        if (data.success) {
          setStats(data.data.stats);
          setRecentApplications(data.data.recentApplications);
        }
      } catch (error) {
        console.error("Failed to fetch influencer dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* 1. Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Earnings" value={`₹${stats.totalEarnings.toLocaleString('en-IN')}`} icon="💰" />
        <StatCard title="Submitted Projects" value={stats.submittedProjects} icon="✅" />
        <StatCard title="Active Projects" value={stats.activeProjects} icon="🚀" />
        <StatCard title="Total Applications" value={stats.applications} icon="📄" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Applications */}
          <div className="card bg-base-100 shadow-lg">
          </div>
        </div>

      </div>
    </div>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'accepted': return 'info';
    case 'submitted': return 'success';
    case 'rejected': return 'error';
    default: return 'ghost';
  }
}

const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="h-24 bg-base-300 rounded-lg"></div>
      <div className="h-24 bg-base-300 rounded-lg"></div>
      <div className="h-24 bg-base-300 rounded-lg"></div>
      <div className="h-24 bg-base-300 rounded-lg"></div>
    </div>
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 h-64 bg-base-300 rounded-lg"></div>
      <div className="lg:col-span-1 h-64 bg-base-300 rounded-lg"></div>
    </div>
  </div>
);
        
/* -------------------------------------------------------------------------- */
/* BRAND DASHBOARD                                */
/* -------------------------------------------------------------------------- */
function BrandDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAmountPaid: 0,
    activeProjects: 0,
    submittedProjects: 0,
    completedProjects: 0,
    totalApplications: 0,
  });
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandData = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/profile/brand/dashboard-stats/${user._id}`);
        consol.log("Brand dashboard stats response:", data);
        if (data.success) {
          setStats(data.data.stats);
          setRecentCampaigns(data.data.recentCampaigns);
          setRecentApplicants(data.data.recentApplicants);
        }
      } catch (error) {
        console.error("Failed to fetch brand dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [user]);

  if (loading) {
    return <DashboardSkeleton />;
  }


  return (
    <div className="space-y-6">
      {/* 1. Key Brand Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Payout" value={`₹${stats.totalAmountPaid.toLocaleString('en-IN')}`} hint="Completed Projects" icon="💰" />
        <StatCard title="Active Projects" value={stats.activeProjects} hint="Accepted by Influencers" icon="🚀" />
        <StatCard title="Submitted Projects" value={stats.submittedProjects} hint="Awaiting Review" icon="✅" />
        <StatCard title="Completed Projects" value={stats.completedProjects} hint="Finished & Paid" icon="🏆" />
        <StatCard title="Total Applications" value={stats.totalApplications} hint="Across all campaigns" icon="👥" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* --- Left Column --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Campaigns Table */}
          <div className="card p-6 bg-base-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">📢 Recent Campaigns</h2>
              <Link to="/app/my-campaigns" className="text-sm text-sky-600 hover:underline">Manage All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b dark:border-gray-700">
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Platform</th>
                    <th className="pb-2">Budget</th>
                    <th className="pb-2">Applications</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {recentCampaigns.map(c => (
                    <tr key={c._id}>
                      <td className="py-3 font-medium text-gray-900 dark:text-white">{c.title}</td>
                      <td className="py-3">{c.platforms?.join(', ') || 'N/A'}</td>
                      <td className="py-3">₹{c.budget.toLocaleString()}</td>
                      <td className="py-3 text-center font-medium">{c.applicants?.length || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recentCampaigns.length === 0 && !loading && (
                <div className="text-center py-10 text-gray-500">
                  <p>No campaigns created yet.</p>
                  <Link to="/app/create-campaign" className="btn btn-sm btn-primary mt-4">Create Your First Campaign</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Right Column --- */}
        <div className="space-y-6">
          {/* 💡 Quick Actions */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-3">⚡ Quick Actions</h2>
            <ul className="space-y-2">
              <li><Link to="/app/create-campaign" className="btn btn-ghost w-full justify-start">✨ Create New Campaign</Link></li>
              <li><Link to="/app/applicants" className="btn btn-ghost w-full justify-start">👥 Review Applicants</Link></li>
              <li><Link to="/app/settings" className="btn btn-ghost w-full justify-start">⚙️ Brand Settings</Link></li>
            </ul>
          </div>

          {/* 👥 Recent Applicants */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">👋 New Applicants</h2>
            <div className="space-y-3">
              {recentApplicants.map(applicant => (
                <div key={applicant._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <img src={applicant.influencer.profileImage || 'https://via.placeholder.com/40'} alt={applicant.influencer.name} className="rounded-full" />
                    </div>
                    <div>
                      <div className="font-medium">{applicant.influencer.name}</div>
                      <div className="text-xs text-gray-500">Applied to "{applicant.campaign.title}"</div>
                    </div>
                  </div>
                  <Link to={`/app/applicants/${applicant._id}`} className="text-xs text-blue-600 hover:underline">View</Link>
                </div>
              ))}
              {recentApplicants.length === 0 && !loading && (
                <div className="text-center py-6 text-gray-500">
                  <p>No new applicants yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}