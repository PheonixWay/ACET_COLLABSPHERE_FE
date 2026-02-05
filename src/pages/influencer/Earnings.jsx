import { useState } from 'react'
import { EARNINGS } from '../../data/mockEarnings' // Assuming you have this or use the data below

export default function Earnings() {
  const [filter, setFilter] = useState('All')

  // Mock Expanded Data for "Mega Project" feel
  const transactions = [
    { id: 'TXN-8821', date: '2025-11-01', brand: 'Mamaearth India', campaign: 'Winter Skincare', amount: 60000, tds: 6000, net: 54000, status: 'Paid', type: 'Sponsorship' },
    { id: 'TXN-8822', date: '2025-10-20', brand: 'Flipkart Fashion', campaign: 'Diwali Haul', amount: 35000, tds: 3500, net: 31500, status: 'Pending', type: 'Sponsorship' },
    { id: 'TXN-8823', date: '2025-10-05', brand: 'Zomato', campaign: 'Food Walk', amount: 12000, tds: 1200, net: 10800, status: 'Paid', type: 'Affiliate' },
    { id: 'TXN-8824', date: '2025-09-15', brand: 'Boat Lifestyle', campaign: 'Diwali Sale', amount: 45000, tds: 4500, net: 40500, status: 'Paid', type: 'Sponsorship' },
  ]

  const stats = {
    lifetime: 250000,
    available: 54000,
    pending: 35000,
    thisMonth: 60000
  }

  const downloadInvoice = (id) => {
    alert(`📄 Downloading Tax Invoice for ${id}...`)
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* --- Header & Withdraw Action --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">💰 Wallet & Financials</h1>
            <p className="text-gray-500 text-sm">Manage your payouts, invoices, and tax documents.</p>
        </div>
        <button className="btn btn-primary shadow-lg shadow-green-200 dark:shadow-none flex items-center gap-2" onClick={()=>alert('Withdrawal Request Initiated! 💸')}>
            <span>🏦</span> Withdraw Balance
        </button>
      </div>

      {/* --- 1. Financial Cards (Wallet Style) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Available Balance */}
        <div className="card p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="text-emerald-100 text-sm font-medium mb-1">Available to Withdraw</div>
            <div className="text-3xl font-bold">₹{stats.available.toLocaleString('en-IN')}</div>
            <div className="mt-4 text-xs bg-black/20 inline-block px-2 py-1 rounded text-emerald-50">
                Last payout: 2 days ago
            </div>
        </div>

        {/* Card 2: Pending Clearance */}
        <div className="card p-6 border-l-4 border-l-yellow-400">
            <div className="text-gray-500 text-sm font-medium mb-1">Pending Clearance</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">₹{stats.pending.toLocaleString('en-IN')}</div>
            <div className="mt-4 text-xs text-yellow-600 font-medium flex items-center gap-1">
                <span>⏳</span> Est. credit by Nov 25
            </div>
        </div>

        {/* Card 3: Lifetime Earnings */}
        <div className="card p-6">
            <div className="text-gray-500 text-sm font-medium mb-1">Lifetime Earnings</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">₹{stats.lifetime.toLocaleString('en-IN')}</div>
            <div className="mt-4 text-xs text-green-600 font-medium">
                🚀 Top 5% of creators this month
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 2. Monthly Income Graph (Left 2/3) --- */}
        <div className="lg:col-span-2 card p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">📈 Income Trend (6 Months)</h3>
                <select className="select py-1 px-3 text-sm w-auto">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                </select>
            </div>

            {/* Custom CSS/SVG Bar Chart */}
            <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
                {[
                  {m:'Jun', v:40, amt:'40k'}, 
                  {m:'Jul', v:65, amt:'65k'}, 
                  {m:'Aug', v:30, amt:'30k'}, 
                  {m:'Sep', v:85, amt:'85k'}, 
                  {m:'Oct', v:55, amt:'55k'}, 
                  {m:'Nov', v:90, amt:'90k'} // Current
                ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                        <div className="relative w-full max-w-[40px] bg-gray-100 dark:bg-gray-800 rounded-t-lg h-full flex items-end overflow-hidden">
                            <div 
                                className={`w-full transition-all duration-1000 ${i===5 ? 'bg-emerald-500' : 'bg-indigo-400 group-hover:bg-indigo-500'}`} 
                                style={{ height: `${bar.v}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-2">{bar.m}</span>
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -mt-8 bg-black text-white text-xs px-2 py-1 rounded transition-opacity">
                            ₹{bar.amt}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- 3. Payout Methods (Right 1/3) --- */}
        <div className="card p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">🏦 Payout Method</h3>
                <button className="text-sm text-indigo-600 font-medium hover:underline">Edit</button>
            </div>

            {/* Active Bank Account */}
            <div className="p-4 border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-900 rounded-xl relative">
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">PRIMARY</div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">🏦</div>
                    <div>
                        <div className="font-bold text-emerald-900 dark:text-emerald-100">HDFC Bank</div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-300">**** 8821</div>
                    </div>
                </div>
                <div className="text-xs text-emerald-600">Verified & Active</div>
            </div>

            {/* UPI Option */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl opacity-60 hover:opacity-100 transition">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xl">📱</div>
                    <div>
                        <div className="font-medium">UPI ID</div>
                        <div className="text-xs text-gray-500">Not connected</div>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* --- 4. Transaction History Table --- */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h3 className="text-lg font-bold">📝 Transaction History</h3>
            <div className="flex gap-2">
                {['All', 'Paid', 'Pending'].map(s => (
                    <button 
                        key={s} 
                        onClick={() => setFilter(s)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${
                            filter === s 
                            ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black' 
                            : 'text-gray-500 border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="text-gray-500 border-b dark:border-gray-700">
                        <th className="pb-3 pl-2">Date / ID</th>
                        <th className="pb-3">Brand & Campaign</th>
                        <th className="pb-3 text-right">Amount</th>
                        <th className="pb-3 text-right">TDS (10%)</th>
                        <th className="pb-3 text-right">Net Pay</th>
                        <th className="pb-3 text-center">Status</th>
                        <th className="pb-3 text-center">Invoice</th>
                    </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                    {transactions
                      .filter(t => filter === 'All' || t.status === filter)
                      .map((t) => (
                        <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <td className="py-4 pl-2">
                                <div className="font-medium">{t.date}</div>
                                <div className="text-xs text-gray-500">{t.id}</div>
                            </td>
                            <td className="py-4">
                                <div className="font-bold text-gray-900 dark:text-white">{t.brand}</div>
                                <div className="text-xs text-gray-500">{t.campaign} • <span className="bg-gray-100 dark:bg-gray-700 px-1.5 rounded">{t.type}</span></div>
                            </td>
                            <td className="py-4 text-right font-medium">₹{t.amount.toLocaleString()}</td>
                            <td className="py-4 text-right text-red-500 text-xs">- ₹{t.tds.toLocaleString()}</td>
                            <td className="py-4 text-right font-bold text-emerald-600">₹{t.net.toLocaleString()}</td>
                            <td className="py-4 text-center">
                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                                    t.status === 'Paid' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {t.status}
                                </span>
                            </td>
                            <td className="py-4 text-center">
                                <button onClick={()=>downloadInvoice(t.id)} className="text-gray-400 hover:text-indigo-600 transition" title="Download Invoice">
                                    📄 ⬇
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}