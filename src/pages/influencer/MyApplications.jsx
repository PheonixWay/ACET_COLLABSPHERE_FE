import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { CAMPAIGNS } from '../../data/mockCampaigns'

export default function MyApplications() {
  const { applications } = useData()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Merge Application Data with Campaign Data
  const enrichedApps = useMemo(() => {
    return applications.map(app => {
      const campaign = CAMPAIGNS.find(c => c.id === app.campaignId)
      return { ...app, campaign }
    })
  }, [applications])

  // Filter Logic
  const filteredApps = enrichedApps.filter(app => {
    const matchesSearch = 
      app.campaign?.brand?.toLowerCase().includes(search.toLowerCase()) || 
      app.campaign?.title?.toLowerCase().includes(search.toLowerCase())
    
    const matchesFilter = filter === 'all' ? true : app.status === filter

    return matchesSearch && matchesFilter
  })

  // Helper for Status Colors
  const getStatusStyle = (status) => {
    switch(status) {
      case 'accepted': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* --- Header & Controls --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📨 Application History</h1>
          <p className="text-gray-500 text-sm">Track the status of your pitches and proposals.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            <input 
              className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 ring-sky-500/20 w-full sm:w-64" 
              placeholder="Search by brand or campaign..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          {/* Filter Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {['all', 'pending', 'accepted'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${
                  filter === tab 
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- Applications Table Card --- */}
      <div className="card p-0 overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 font-medium">Brand & Campaign</th>
                <th className="px-6 py-4 font-medium">Applied Date</th>
                <th className="px-6 py-4 font-medium">Bid Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredApps.length > 0 ? filteredApps.map((app) => (
                <tr key={app.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
                  
                  {/* 1. Brand Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Brand Avatar (Initials) */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        {app.campaign?.brand?.[0] || '?'}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                            {app.campaign?.brand || 'Unknown Brand'}
                        </div>
                        <div className="text-xs text-gray-500 group-hover:text-sky-600 transition">
                            {app.campaign?.title}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Date Column */}
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {app.date}
                  </td>

                  {/* 3. Bid Amount (Mock) */}
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {app.campaign?.budget ? `₹${app.campaign.budget.toLocaleString()}` : 'N/A'}
                  </td>

                  {/* 4. Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusStyle(app.status)} capitalize flex items-center gap-1.5 w-fit`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'accepted' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {app.status}
                    </span>
                  </td>

                  {/* 5. Action Button */}
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/app/campaign/${app.campaignId}`} 
                      className="text-gray-400 hover:text-sky-600 font-medium text-xs border border-gray-200 hover:border-sky-200 px-3 py-1.5 rounded-lg transition bg-white dark:bg-gray-800"
                    >
                      View Details
                    </Link>
                  </td>

                </tr>
              )) : (
                /* Empty State */
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl mb-3">📭</div>
                    <h3 className="text-gray-900 dark:text-white font-bold">No applications found</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-4">Try adjusting your search or filters.</p>
                    <Link to="/app/browse-campaigns" className="btn btn-primary btn-sm">Browse New Jobs</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer (Subtle) */}
      <div className="flex justify-end gap-6 text-sm text-gray-500 px-2">
        <div>Total Applied: <span className="font-bold text-gray-900 dark:text-white">{enrichedApps.length}</span></div>
        <div>Pending: <span className="font-bold text-amber-600">{enrichedApps.filter(a=>a.status==='pending').length}</span></div>
        <div>Accepted: <span className="font-bold text-emerald-600">{enrichedApps.filter(a=>a.status==='accepted').length}</span></div>
      </div>

    </div>
  )
}