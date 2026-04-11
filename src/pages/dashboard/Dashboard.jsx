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
    earnings: 0,
    pending: 0,
    active: 0,
    applications: 0,
  });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In a real app, you'd fetch this data from dedicated endpoints
        // For now, we'll fetch all campaigns and derive stats
        const response = await api.get('/campaigns');
        const allCampaigns = response.data.data;
        
        // Mocking stats for now as endpoints don't exist
        setStats({
          earnings: 52500, // Mock
          pending: 12000, // Mock
          active: 2, // Mock
          applications: 5, // Mock
        });
        setCampaigns(allCampaigns.slice(0, 3)); // show 3 latest campaigns
      } catch (error) {
        console.error("Failed to fetch influencer dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);


  // Mock Profile Completeness Calculation
  const profileScore = useMemo(() => {
    let score = 40; // Base score
    if (user?.niche) score += 20;
    if (user?.bio) score += 20;
    if (user?.instagram) score += 10;
    if (user?.youtube) score += 10;
    return Math.min(score, 100);
  }, [user]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 1. Stats Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Earnings" value={`₹${stats.earnings.toLocaleString('en-IN')}`} />
        <StatCard title="Pending Payouts" value={`₹${stats.pending.toLocaleString('en-IN')}`} />
        <StatCard title="Active Projects" value={stats.active} />
        <StatCard title="Applications" value={stats.applications} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recommendations */}
          <div className="card p-6 border-l-4 border-l-sky-400">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">✨ Recommended For You</h2>
              <Link to="/app/browse-campaigns" className="text-sm text-sky-600 hover:underline">View all</Link>
            </div>
            {campaigns.length > 0 ? (
              <div className="space-y-3">
                {campaigns.map(c => (
                  <div key={c._id} className="flex items-center justify-between rounded-xl bg-sky-50 dark:bg-sky-900/20 p-4 border border-sky-100 dark:border-sky-900/30">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{c.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{c.brand.name} • <span className="font-semibold text-green-700 dark:text-green-400">Budget: ₹{c.budget.toLocaleString()}</span></div>
                    </div>
                    <Link to={`/app/campaign/${c._id}`} className="btn bg-white dark:bg-gray-800 text-sm shadow-sm border">View</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">👍 No new recommendations right now.</div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Strength Widget */}
          <div className="card p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">🚀 Profile Strength</h2>
              <span className="font-bold">{profileScore}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2.5 mb-4">
              <div className="bg-white h-2.5 rounded-full transition-all duration-1000" style={{ width: `${profileScore}%` }}></div>
            </div>
            <p className="text-sm text-white/90 mb-3">Complete your bio and link socials to boost visibility by 3x.</p>
            <Link to="/app/profile" className="block text-center bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-medium transition">Edit Profile</Link>
          </div>

          {/* Niche Trends Widget */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-3">🔥 Trending in {user?.niche || 'Lifestyle'}</h2>
            <ul className="space-y-3">
              <li className="text-sm flex items-center gap-2"><span className="text-lg">🎵</span> <span>Reels with "As It Was" audio</span></li>
              <li className="text-sm flex items-center gap-2"><span className="text-lg">☀️</span> <span>Summer Skincare routines</span></li>
              <li className="text-sm flex items-center gap-2"><span className="text-lg">🎒</span> <span>"What's in my bag" 2025</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* BRAND DASHBOARD                                */
/* -------------------------------------------------------------------------- */
function BrandDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    openCampaigns: 0,
    totalApplicants: 0,
  });
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandData = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        const response = await api.get(`/campaigns/by-brand/${user._id}`);
        const campaigns = response.data.data;
        
        const openCampaigns = campaigns.filter(c => c.status === 'open').length;
        const totalApplicants = campaigns.reduce((sum, c) => sum + (c.applicants?.length || 0), 0);

        setStats({
          totalCampaigns: campaigns.length,
          openCampaigns,
          totalApplicants,
        });
        setRecentCampaigns(campaigns.slice(0, 3));

      } catch (error) {
        console.error("Failed to fetch brand dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [user]);

  if (loading) {
    return <div>Loading brand dashboard...</div>;
  }


  return (
    <div className="space-y-6">
      {/* 1. Key Brand Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Campaigns" value={stats.totalCampaigns} hint="All time" />
        <StatCard title="Open for Apps" value={stats.openCampaigns} hint="Actively recruiting" />
        <StatCard title="Total Applicants" value={stats.totalApplicants} hint="Across all campaigns" />
        <StatCard title="Unread Messages" value="2" hint="Influencer queries" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* --- Left Column --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Campaigns Table */}
          <div className="card p-6">
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
                      <td className="py-3">{c.platforms.join(', ')}</td>
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
              {/* This would be dynamic in a real app */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
                  <div>
                    <div className="font-medium">Riya Sharma</div>
                    <div className="text-xs text-gray-500">Applied to "Summer Glow"</div>
                  </div>
                </div>
                <Link to="/app/applicants" className="text-xs text-blue-600 hover:underline">View</Link>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
                  <div>
                    <div className="font-medium">Karan Singh</div>
                    <div className="text-xs text-gray-500">Applied to "Gamer's Delight"</div>
                  </div>
                </div>
                <Link to="/app/applicants" className="text-xs text-blue-600 hover:underline">View</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}