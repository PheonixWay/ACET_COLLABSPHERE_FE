import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useData } from '../../context/DataContext'
import { EARNINGS } from '../../data/mockEarnings'
import { CAMPAIGNS } from '../../data/mockCampaigns'
import { INFLUENCERS } from '../../data/mockInfluencers'
import StatCard from '../../components/molecules/StatCard'

export default function Dashboard() {
  const { user } = useAuth()
  const isBrand = user?.role === 'brand'

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
        {isBrand ? (
          <Link to="/app/create-campaign" className="btn btn-primary shadow-lg shadow-sky-200 dark:shadow-none">
            + Create New Campaign
          </Link>
        ) : (
          <Link to="/app/browse-campaigns" className="btn btn-primary shadow-lg shadow-sky-200 dark:shadow-none">
            🔍 Find New Work
          </Link>
        )}
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
  const { projects, applications } = useData()

  // Stats Calculation
  const earningsStats = useMemo(() => {
    const paid = EARNINGS.filter(e => e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0)
    const pending = EARNINGS.filter(e => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0)
    return { paid, pending }
  }, [])

  const activeDeliverables = useMemo(() => {
    return projects
      .filter(p => p.status === 'in-progress')
      .sort((a, b) => new Date(a.due) - new Date(b.due))
      .slice(0, 3)
  }, [projects])

  const recommendations = useMemo(() => {
    if (!user?.niche) return CAMPAIGNS.slice(0, 2)
    const userNiche = user.niche.toLowerCase()
    return CAMPAIGNS.filter(c => 
      c.niche.some(n => n.toLowerCase().includes(userNiche) || userNiche.includes(n.toLowerCase()))
    ).slice(0, 2)
  }, [user])

  // Mock Profile Completeness Calculation
  const profileScore = useMemo(() => {
    let score = 40; // Base score
    if (user?.niche) score += 20;
    if (user?.bio) score += 20;
    if (user?.instagram) score += 10;
    if (user?.youtube) score += 10;
    return Math.min(score, 100);
  }, [user]);

  return (
    <div className="space-y-6">
      {/* 1. Stats Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Earnings" value={`₹${earningsStats.paid.toLocaleString('en-IN')}`} hint="+ 12% vs last month" />
        <StatCard title="Pending Payouts" value={`₹${earningsStats.pending.toLocaleString('en-IN')}`} hint="Processing..." />
        <StatCard title="Active Projects" value={projects.length} hint={`${activeDeliverables.length} due this week`} />
        <StatCard title="Applications" value={applications.length} hint="1 Under Review" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Urgent Deliverables */}
          <div className="card p-6 border-l-4 border-l-orange-400">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">⚠️ Urgent Deliverables</h2>
              <Link to="/app/active-projects" className="text-sm text-sky-600 hover:underline">View all</Link>
            </div>
            {activeDeliverables.length > 0 ? (
              <div className="space-y-3">
                {activeDeliverables.map(p => (
                  <div key={p.id} className="flex items-center justify-between rounded-xl bg-orange-50 dark:bg-orange-900/20 p-4 border border-orange-100 dark:border-orange-900/30">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{p.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{p.brand} • <span className="font-semibold text-orange-700 dark:text-orange-400">Due: {p.due}</span></div>
                    </div>
                    <Link to={`/app/project/${p.id}`} className="btn bg-white dark:bg-gray-800 text-sm shadow-sm border">📤 Submit</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">🎉 No urgent deadlines!</div>
            )}
          </div>

          {/* Applications Table */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">📄 Recent Applications</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 border-b dark:border-gray-700"><th className="pb-2">Campaign</th><th className="pb-2">Status</th><th className="pb-2 text-right">Date</th></tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {applications.slice(0, 3).map(app => {
                    const camp = CAMPAIGNS.find(c => c.id === app.campaignId)
                    return (
                      <tr key={app.id}>
                        <td className="py-3 font-medium">{camp?.title}</td>
                        <td className="py-3"><span className={`px-2 py-1 rounded-md text-xs font-medium ${app.status==='accepted'?'bg-green-100 text-green-800':'bg-yellow-100 text-yellow-800'}`}>{app.status}</span></td>
                        <td className="py-3 text-right text-gray-500">{app.date}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
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
  // Mock Brand Data Logic
  const activeCount = CAMPAIGNS.length; 
  const totalViews = 125000; // Mock viral analytic
  const pendingApps = 5; 
  const payoutsDue = 3; 

  return (
    <div className="space-y-6">
      {/* 1. Key Brand Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Campaigns" value={activeCount} hint="Across 3 platforms" />
        <StatCard title="Total Reach" value={(totalViews/1000).toFixed(0)+'k'} hint="+ 22% this week" />
        <StatCard title="Pending Apps" value={pendingApps} hint="Needs Review" />
        <StatCard title="Unread Messages" value="2" hint="Influencer queries" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* --- Left Column --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 🔔 Payout Alerts (From Notes) */}
          <div className="card p-6 border-l-4 border-l-red-500">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              💸 Payout Alerts <span className="badge bg-red-100 text-red-800">{payoutsDue} Due</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">📸</div>
                  <div>
                    <div className="font-medium">Diya Mehra</div>
                    <div className="text-xs text-gray-500">Skincare Routine Campaign</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹15,000</div>
                  <button className="text-xs text-blue-600 hover:underline">Pay Now</button>
                </div>
              </div>
              {/* Mock Item 2 */}
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">🎮</div>
                  <div>
                    <div className="font-medium">Aarav Gupta</div>
                    <div className="text-xs text-gray-500">Tech Review Reel</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹20,000</div>
                  <button className="text-xs text-blue-600 hover:underline">Pay Now</button>
                </div>
              </div>
            </div>
          </div>

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
                  {CAMPAIGNS.slice(0,3).map(c => (
                    <tr key={c.id}>
                      <td className="py-3 font-medium">{c.title}</td>
                      <td className="py-3 text-gray-500">{c.niche.join(', ')}</td>
                      <td className="py-3">₹{c.budget.toLocaleString()}</td>
                      <td className="py-3">
                        <Link to={`/app/campaign/${c.id}/review`} className="text-sky-600 hover:underline font-medium">
                          Review Apps →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Right Column --- */}
        <div className="space-y-6">
          
          {/* ⭐ Top Influencers (From Notes: "Suggest/Recommend") */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">💎 Top Talent for You</h2>
            <div className="space-y-4">
              {INFLUENCERS.filter(i => i.engagement > 4.0).slice(0,2).map(inf => (
                <div key={inf.id} className="flex items-start gap-3 pb-3 border-b dark:border-gray-700 last:border-0">
                  <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-lg">
                    {inf.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{inf.name}</div>
                    <div className="text-xs text-gray-500">{inf.niche.join(' • ')}</div>
                    <div className="text-xs mt-1 text-sky-600 font-medium">⭐ {inf.engagement}% Engagement</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/app/browse-influencers" className="block text-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 py-2 rounded-lg text-sm mt-3 transition">
              Browse All Influencers
            </Link>
          </div>

          {/* Viral Analytics (Simple Graph Representation) */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">🚀 Viral Performance</h2>
            <p className="text-xs text-gray-500 mb-4">Top performing campaign this week</p>
            
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white shadow-lg">
              <div className="text-sm opacity-90">Festive Wear Haul</div>
              <div className="text-3xl font-bold mt-1">85.2k <span className="text-sm font-normal opacity-75">Views</span></div>
              <div className="mt-3 flex gap-2 text-xs bg-white/20 p-2 rounded-lg w-fit">
                <span>🔥 12% CTR</span>
                <span>💬 450 Comments</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}