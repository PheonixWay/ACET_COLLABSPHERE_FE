import { useMemo, useState } from 'react'
import { INFLUENCERS } from '../../data/mockInfluencers'
import InfluencerCard from '../../components/molecules/InfluencerCard'
import SearchBar from '../../components/molecules/SearchBar'
import { useNavigate } from 'react-router-dom'
export default function BrowseInfluencers(){ const nav=useNavigate(); const [q,setQ]=useState(''); const list=useMemo(()=>{ const s=q.trim().toLowerCase(); if(!s) return INFLUENCERS; return INFLUENCERS.filter(i=> i.name.toLowerCase().includes(s) || i.niche.join(' ').toLowerCase().includes(s) || String(i.followers).includes(s) ) },[q]); return (<div className="space-y-6"><SearchBar placeholder="Search influencers (name, niche, followers)..." onSearch={setQ} /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{list.map(i=>(<InfluencerCard key={i.id} data={i} onOpen={()=>nav(`/app/influencer/${i.id}`)} />))}</div></div>) }
