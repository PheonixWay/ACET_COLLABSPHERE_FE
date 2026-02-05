import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('personal')
  
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    niche: user?.niche || '',
    bio: user?.bio || '',
    instagram: user?.instagram || '',
    youtube: user?.youtube || '',
    languages: user?.languages || 'English, Hindi',
    rate_reel: user?.rate_reel || '5000',
    rate_story: user?.rate_story || '1000',
    rate_post: user?.rate_post || '3000',
    portfolio_1: user?.portfolio_1 || '',
    portfolio_2: user?.portfolio_2 || '',
    gender: user?.gender || 'Female',
    dob: user?.dob || ''
  })

  const save = (e) => {
    e.preventDefault()
    updateProfile(form)
    alert('Profile updated successfully! ✅')
  }

  const Tabs = ['personal', 'socials', 'rates', 'portfolio']

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* --- Header / Banner Section --- */}
      <div className="relative mb-20">
        {/* Banner Image */}
        <div className="h-48 w-full rounded-t-2xl bg-gradient-to-r from-sky-400 to-indigo-500 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80" 
            alt="Banner" 
            className="w-full h-full object-cover opacity-50" 
          />
        </div>
        
        {/* Profile Card Overlay */}
        <div className="absolute -bottom-16 left-6 flex items-end gap-4">
          <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
             <img 
               src={`https://ui-avatars.com/api/?name=${form.name}&background=0ea5e9&color=fff&size=128`} 
               alt="Profile" 
               className="h-full w-full object-cover"
             />
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white drop-shadow-sm md:text-3xl bg-white/80 dark:bg-gray-900/80 px-3 rounded-lg backdrop-blur-sm">
              {form.name} {user?.role === 'influencer' && '✨'}
            </h1>
            <div className="text-gray-700 dark:text-gray-200 font-medium bg-white/80 dark:bg-gray-900/80 px-2 rounded-md mt-1 inline-block text-sm">
              {form.niche} • {form.location}
            </div>
          </div>
        </div>
        
        {/* Save Button Top Right */}
        <div className="absolute bottom-4 right-6">
             <button onClick={save} className="btn btn-primary shadow-lg">
               💾 Save Changes
             </button>
        </div>
      </div>

      {/* --- Navigation Tabs --- */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {Tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
              activeTab === tab 
                ? 'border-b-2 border-sky-600 text-sky-600 bg-sky-50 dark:bg-sky-900/20' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {tab} Info
          </button>
        ))}
      </div>

      {/* --- Form Sections --- */}
      <form onSubmit={save} className="card p-8 min-h-[400px]">
        
        {/* 1. PERSONAL INFO TAB */}
        {activeTab === 'personal' && (
          <div className="grid gap-6 sm:grid-cols-2 animate-fadeIn">
            <h3 className="sm:col-span-2 text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">👤 Basic Details</h3>
            
            <div><label className="label">Full Name</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
            <div><label className="label">Email Address</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} disabled /></div>
            
            <div><label className="label">Phone Number</label><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
            <div><label className="label">Date of Birth</label><input type="date" className="input" value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} /></div>
            
            <div><label className="label">City / Location</label><input className="input" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} /></div>
            <div>
                <label className="label">Languages Spoken</label>
                <input className="input" placeholder="e.g. English, Hindi, Marathi" value={form.languages} onChange={e=>setForm({...form,languages:e.target.value})} />
            </div>

            <div className="sm:col-span-2">
                <label className="label">Bio / About Me</label>
                <textarea className="input min-h-[120px]" placeholder="Tell brands about your style and audience..." value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} />
            </div>
          </div>
        )}

        {/* 2. SOCIALS & NICHE TAB */}
        {activeTab === 'socials' && (
          <div className="grid gap-6 sm:grid-cols-2 animate-fadeIn">
            <h3 className="sm:col-span-2 text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">📱 Social Presence</h3>
            
            <div className="sm:col-span-2">
                <label className="label">Primary Niche</label>
                <select className="select" value={form.niche} onChange={e=>setForm({...form,niche:e.target.value})}>
                    <option>Lifestyle</option><option>Fashion</option><option>Tech</option><option>Food</option><option>Travel</option><option>Beauty</option><option>Fitness</option><option>Gaming</option>
                </select>
            </div>

            <div className="p-4 border rounded-xl bg-pink-50 dark:bg-pink-900/10 border-pink-100 dark:border-pink-900">
                <label className="label flex items-center gap-2 text-pink-700 dark:text-pink-300">📸 Instagram Handle</label>
                <div className="flex mt-2">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">@</span>
                    <input className="input rounded-l-none" placeholder="username" value={form.instagram} onChange={e=>setForm({...form,instagram:e.target.value})} />
                </div>
                <div className="mt-2 text-xs text-gray-500">Estimated Reach: <b>High</b> (Based on mock data)</div>
            </div>

            <div className="p-4 border rounded-xl bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900">
                <label className="label flex items-center gap-2 text-red-700 dark:text-red-300">▶️ YouTube Channel</label>
                <input className="input mt-2" placeholder="Channel Name or URL" value={form.youtube} onChange={e=>setForm({...form,youtube:e.target.value})} />
                <div className="mt-2 text-xs text-gray-500">Video Content: <b>Enabled</b></div>
            </div>
          </div>
        )}

        {/* 3. RATE CARD TAB (Crucial for brands) */}
        {activeTab === 'rates' && (
          <div className="grid gap-6 sm:grid-cols-3 animate-fadeIn">
            <h3 className="sm:col-span-3 text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">💰 Commercials (Rate Card)</h3>
            <p className="sm:col-span-3 text-sm text-gray-500 mb-2">Set your standard pricing for collaborations. This helps brands gauge if you fit their budget.</p>

            <div>
                <label className="label">Cost per Instagram Reel</label>
                <div className="relative mt-1"><span className="absolute left-3 top-3 text-gray-500">₹</span><input type="number" className="input pl-8" value={form.rate_reel} onChange={e=>setForm({...form,rate_reel:e.target.value})} /></div>
            </div>
            <div>
                <label className="label">Cost per Static Post</label>
                <div className="relative mt-1"><span className="absolute left-3 top-3 text-gray-500">₹</span><input type="number" className="input pl-8" value={form.rate_post} onChange={e=>setForm({...form,rate_post:e.target.value})} /></div>
            </div>
            <div>
                <label className="label">Cost per Story (24h)</label>
                <div className="relative mt-1"><span className="absolute left-3 top-3 text-gray-500">₹</span><input type="number" className="input pl-8" value={form.rate_story} onChange={e=>setForm({...form,rate_story:e.target.value})} /></div>
            </div>
            
            <div className="sm:col-span-3 mt-4 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl text-sm text-sky-800 dark:text-sky-200 flex items-start gap-2">
                <span>💡</span>
                <p><b>Pro Tip:</b> Brands often negotiate. Set these as your "base" rates. You can create custom offers for specific campaigns later.</p>
            </div>
          </div>
        )}

        {/* 4. PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className="grid gap-6 animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">🎨 Portfolio & Best Work</h3>
            
            <div>
                <label className="label">Portfolio Link 1 (Best Performing Reel)</label>
                <input className="input" placeholder="https://instagram.com/reel/..." value={form.portfolio_1} onChange={e=>setForm({...form,portfolio_1:e.target.value})} />
            </div>
            <div>
                <label className="label">Portfolio Link 2 (Brand Collaboration)</label>
                <input className="input" placeholder="https://..." value={form.portfolio_2} onChange={e=>setForm({...form,portfolio_2:e.target.value})} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
                 {/* Mock Portfolio Grid for Visuals */}
                 <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    Upload Image 1
                 </div>
                 <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    Upload Image 2
                 </div>
                 <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    Upload Image 3
                 </div>
            </div>
          </div>
        )}

      </form>
    </div>
  )
}