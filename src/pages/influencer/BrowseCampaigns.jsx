import { useMemo, useState } from 'react'
import CampaignCard from '../../components/molecules/CampaignCard'
import SearchBar from '../../components/molecules/SearchBar'
import { CAMPAIGNS } from '../../data/mockCampaigns'
import { useData } from '../../context/DataContext'
import Modal from '../../components/molecules/Modal'
export default function BrowseCampaigns(){ const [query,setQuery]=useState(''); const { applyToCampaign }=useData(); const [appliedTo,setAppliedTo]=useState(null); const list=useMemo(()=>{ const q=query.trim().toLowerCase(); if(!q) return CAMPAIGNS; return CAMPAIGNS.filter(c=> c.title.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q) || c.niche.join(' ').toLowerCase().includes(q) ) },[query]); const onApply=(c)=>{ applyToCampaign(c); setAppliedTo(c) }; return (<div className="space-y-6"><SearchBar placeholder="Search campaigns (brand, niche, title)..." onSearch={setQuery} /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{list.map(c=> <CampaignCard key={c.id} data={c} onApply={onApply} />)}</div><Modal open={!!appliedTo} title="Application Submitted 🎉" onClose={()=>setAppliedTo(null)}><p className="text-base">You applied for <b>{appliedTo?.title}</b> by <b>{appliedTo?.brand}</b>. Track it in <b>My Applications</b>.</p></Modal></div>) }
