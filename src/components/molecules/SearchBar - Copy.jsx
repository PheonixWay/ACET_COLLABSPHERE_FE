import { useState } from 'react'
export default function SearchBar({ placeholder='Search...', onSearch }){ const [q,setQ]=useState(''); return (<div className="flex gap-3"><input className="input" placeholder={placeholder} value={q} onChange={e=>setQ(e.target.value)} /><button className="btn btn-primary" onClick={()=>onSearch?.(q)}>Search</button></div>) }
