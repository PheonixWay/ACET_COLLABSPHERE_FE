import { useState } from 'react'
import { useUI } from '../../context/UIContext'
import { useAuth } from '../../hooks/useAuth'

export default function Settings() {
  const { theme, setTheme } = useUI()
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState('general')
  
  // Mock Toggle States
  const [notif, setNotif] = useState({ email: true, push: false, marketing: false })
  const [security, setSecurity] = useState({ twoFA: false, loginAlerts: true })

  // Tab Configuration
  const tabs = [
    { id: 'general', icon: '⚙️', label: 'General' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'security', icon: '🔐', label: 'Security' },
    { id: 'billing', icon: '💳', label: 'Billing & Payouts' },
  ]

  const handleSave = () => {
    alert('Settings saved successfully! ✅')
  }

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn pb-10">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
        
        {/* --- Left Sidebar Navigation --- */}
        <div className="card p-2 space-y-1 sticky top-24">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeTab === tab.id 
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                    <span>{tab.icon}</span>
                    {tab.label}
                </button>
            ))}
            <div className="border-t border-gray-100 dark:border-gray-800 my-2 pt-2">
                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
                    <span>🚪</span> Logout
                </button>
            </div>
        </div>

        {/* --- Right Content Area --- */}
        <div className="space-y-6">
            
            {/* 1. GENERAL SETTINGS */}
            {activeTab === 'general' && (
                <div className="card p-8 space-y-8 animate-fadeIn">
                    <div>
                        <h3 className="text-lg font-bold mb-4">🎨 Appearance</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <button 
                                onClick={() => setTheme('light')}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${theme === 'light' ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                            >
                                <span className="text-2xl">☀️</span>
                                <span className="text-sm font-medium">Light</span>
                            </button>
                            <button 
                                onClick={() => setTheme('dark')}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${theme === 'dark' ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                            >
                                <span className="text-2xl">🌙</span>
                                <span className="text-sm font-medium">Dark</span>
                            </button>
                            <button className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
                                <span className="text-2xl">💻</span>
                                <span className="text-sm font-medium">System</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-5 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold">🌍 Regional</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Language</label>
                                <select className="select mt-1"><option>English (US)</option><option>Hindi</option><option>Spanish</option></select>
                            </div>
                            <div>
                                <label className="label">Timezone</label>
                                <select className="select mt-1"><option>(GMT+05:30) Mumbai, Kolkata</option><option>(GMT+00:00) London</option></select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. NOTIFICATIONS */}
            {activeTab === 'notifications' && (
                <div className="card p-8 space-y-6 animate-fadeIn">
                    <h3 className="text-lg font-bold border-b pb-4 border-gray-100 dark:border-gray-700">🔔 Notification Preferences</h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div>
                                <div className="font-medium">Email Notifications</div>
                                <div className="text-xs text-gray-500">Get emails about new campaigns and payouts.</div>
                            </div>
                            <input type="checkbox" className="w-6 h-6 accent-sky-600" checked={notif.email} onChange={() => setNotif({...notif, email: !notif.email})} />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div>
                                <div className="font-medium">Push Notifications</div>
                                <div className="text-xs text-gray-500">Real-time alerts on your device.</div>
                            </div>
                            <input type="checkbox" className="w-6 h-6 accent-sky-600" checked={notif.push} onChange={() => setNotif({...notif, push: !notif.push})} />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                            <div>
                                <div className="font-medium">Marketing & Tips</div>
                                <div className="text-xs text-gray-500">Receive weekly newsletters and growth tips.</div>
                            </div>
                            <input type="checkbox" className="w-6 h-6 accent-sky-600" checked={notif.marketing} onChange={() => setNotif({...notif, marketing: !notif.marketing})} />
                        </div>
                    </div>
                </div>
            )}

            {/* 3. SECURITY */}
            {activeTab === 'security' && (
                <div className="card p-8 space-y-8 animate-fadeIn">
                    <div>
                        <h3 className="text-lg font-bold mb-4">🔑 Password & Authentication</h3>
                        <div className="space-y-4">
                            <button className="btn bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 w-full sm:w-auto">Change Password</button>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <div className="font-medium">Two-Factor Authentication (2FA)</div>
                                    <div className="text-xs text-gray-500">Adds an extra layer of security to your account.</div>
                                </div>
                                <div 
                                    onClick={() => setSecurity({...security, twoFA: !security.twoFA})}
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${security.twoFA ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${security.twoFA ? 'translate-x-6' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold mb-4">📱 Active Sessions</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="text-xl">💻</div>
                                    <div>
                                        <div className="text-sm font-bold text-green-800 dark:text-green-200">Windows PC (Chrome)</div>
                                        <div className="text-xs text-green-600 dark:text-green-400">Nagpur, India • Current Session</div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded shadow-sm">Active</span>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="text-xl">📱</div>
                                    <div>
                                        <div className="text-sm font-medium">iPhone 13 (Safari)</div>
                                        <div className="text-xs text-gray-500">Mumbai, India • 2 days ago</div>
                                    </div>
                                </div>
                                <button className="text-xs text-red-500 hover:underline">Revoke</button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Danger Zone */}
                    <div className="pt-6 border-t border-red-100">
                        <h3 className="text-red-600 font-bold mb-2">🚫 Danger Zone</h3>
                        <div className="flex justify-between items-center p-4 border border-red-200 bg-red-50 dark:bg-red-900/10 rounded-xl">
                            <div className="text-sm text-red-700 dark:text-red-300">Permanently delete your account and all data.</div>
                            <button className="btn bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition text-sm">Delete Account</button>
                        </div>
                    </div>
                </div>
            )}

             {/* 4. BILLING */}
             {activeTab === 'billing' && (
                <div className="card p-8 space-y-6 animate-fadeIn">
                     <h3 className="text-lg font-bold">💳 Saved Payment Methods</h3>
                     <div className="p-4 border rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white w-full max-w-sm shadow-xl">
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs opacity-70">Credit Card</span>
                            <span className="font-bold italic">VISA</span>
                        </div>
                        <div className="text-xl font-mono tracking-widest mb-4">**** **** **** 4242</div>
                        <div className="flex justify-between text-xs opacity-70">
                            <span>Card Holder</span>
                            <span>Expires</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                            <span>John Doe</span>
                            <span>12/25</span>
                        </div>
                     </div>
                     <button className="btn btn-ghost border border-gray-300 border-dashed w-full max-w-sm py-3 text-gray-500">
                        + Add New Card
                     </button>
                </div>
             )}

            {/* Save Action Footer */}
            <div className="flex justify-end pt-4">
                <button onClick={handleSave} className="btn btn-primary px-8 shadow-lg shadow-sky-200 dark:shadow-none">
                    Save Changes
                </button>
            </div>

        </div>
      </div>
    </div>
  )
}