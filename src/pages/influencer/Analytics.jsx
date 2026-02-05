import { useState } from 'react'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock Data for Graphs
  const data = {
    stats: [
      { title: 'Total Views', value: '1,85,000', change: '+12.5%', isPositive: true },
      { title: 'Total Clicks', value: '12,450', change: '+8.2%', isPositive: true },
      { title: 'Conversions', value: '730', change: '-2.4%', isPositive: false },
      { title: 'Avg. CTR', value: '6.73%', change: '+1.1%', isPositive: true },
    ],
    audience: {
      gender: { male: 35, female: 65 },
      age: [
        { group: '18-24', val: 45 },
        { group: '25-34', val: 30 },
        { group: '35-44', val: 15 },
        { group: '45+', val: 10 },
      ],
      cities: [
        { name: 'Mumbai', val: 35 },
        { name: 'Delhi', val: 28 },
        { name: 'Bangalore', val: 18 },
        { name: 'Pune', val: 12 },
      ]
    },
    topContent: [
      { title: 'Summer Skincare Routine', platform: 'Instagram', views: '45K', clicks: '3.2K', engagement: '8.5%' },
      { title: 'Tech Gadget Unboxing', platform: 'YouTube', views: '28K', clicks: '1.5K', engagement: '6.2%' },
      { title: 'Diwali Outfit Ideas', platform: 'Instagram', views: '62K', clicks: '5.1K', engagement: '9.1%' },
    ]
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Performance Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Track your campaign growth and audience insights.</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {['7d', '30d', '3m', '1y'].map(range => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                timeRange === range 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-sky-600' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* --- 1. KPI Cards with Trends --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, i) => (
          <div key={i} className="card p-6 hover:shadow-md transition-shadow">
            <div className="text-gray-500 text-sm font-medium mb-1">{stat.title}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className={`text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- 2. Main Graph (Custom SVG Implementation) --- */}
        <div className="lg:col-span-2 card p-6 min-h-[300px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">📈 Growth Trends (Views)</h3>
            <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-sky-500"></span> Instagram</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500"></span> YouTube</span>
            </div>
          </div>
          
          {/* Simple SVG Line Chart */}
          <div className="flex-1 w-full relative h-64 mt-4">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
               {/* Grid Lines */}
               <line x1="0" y1="150" x2="500" y2="150" stroke="#e5e7eb" strokeWidth="1" />
               <line x1="0" y1="100" x2="500" y2="100" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
               <line x1="0" y1="50"  x2="500" y2="50"  stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
               
               {/* Line 1 (Sky Blue) */}
               <polyline 
                 fill="none" stroke="#0ea5e9" strokeWidth="3" 
                 points="0,120 80,90 160,110 240,60 320,80 400,40 500,20" 
                 className="drop-shadow-lg"
               />
               
               {/* Line 2 (Purple) */}
               <polyline 
                 fill="none" stroke="#a855f7" strokeWidth="3" 
                 points="0,140 80,130 160,90 240,110 320,100 400,80 500,60" 
                 className="drop-shadow-lg opacity-70"
               />
            </svg>
            {/* X-Axis Labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* --- 3. Audience Demographics --- */}
        <div className="card p-6 space-y-6">
           <h3 className="text-lg font-bold">👥 Audience Split</h3>
           
           {/* Gender */}
           <div>
              <div className="flex justify-between text-sm mb-2">
                  <span>Female <b className="text-pink-500">{data.audience.gender.female}%</b></span>
                  <span>Male <b className="text-blue-500">{data.audience.gender.male}%</b></span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
                  <div className="bg-pink-400 h-full" style={{ width: `${data.audience.gender.female}%` }}></div>
                  <div className="bg-blue-400 h-full" style={{ width: `${data.audience.gender.male}%` }}></div>
              </div>
           </div>

           {/* Age Groups */}
           <div>
              <div className="text-sm font-medium mb-3 text-gray-500">Top Age Groups</div>
              <div className="space-y-3">
                 {data.audience.age.map(a => (
                    <div key={a.group} className="flex items-center gap-3 text-sm">
                        <span className="w-10 text-gray-500">{a.group}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${a.val}%` }}></div>
                        </div>
                        <span className="w-8 text-right font-medium">{a.val}%</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* --- 4. Content Performance Table --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Cities (Visual Map Placeholder style) */}
          <div className="card p-6">
             <h3 className="text-lg font-bold mb-4">📍 Top Locations</h3>
             <div className="space-y-4">
                {data.audience.cities.map((city, i) => (
                    <div key={city.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shadow-sm">
                                {i + 1}
                            </div>
                            <span className="font-medium">{city.name}</span>
                        </div>
                        <span className="text-sky-600 font-bold">{city.val}%</span>
                    </div>
                ))}
             </div>
          </div>

          {/* Top Content List */}
          <div className="lg:col-span-2 card p-6">
             <h3 className="text-lg font-bold mb-4">🔥 Top Performing Content</h3>
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b dark:border-gray-700">
                            <th className="pb-3 pl-2">Campaign / Content</th>
                            <th className="pb-3">Platform</th>
                            <th className="pb-3">Views</th>
                            <th className="pb-3">Clicks</th>
                            <th className="pb-3">Eng. Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {data.topContent.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                <td className="py-3 pl-2 font-medium">{row.title}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded text-xs border ${
                                        row.platform === 'Instagram' 
                                        ? 'bg-pink-50 text-pink-700 border-pink-200' 
                                        : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                        {row.platform}
                                    </span>
                                </td>
                                <td className="py-3 font-bold text-gray-700 dark:text-gray-300">{row.views}</td>
                                <td className="py-3 text-gray-600">{row.clicks}</td>
                                <td className="py-3 text-green-600 font-bold">{row.engagement}</td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
             </div>
          </div>

      </div>
    </div>
  )
}