import LoadingScreen from '../components/molecules/LoadingScreen'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Loading(){ const nav=useNavigate(); useEffect(()=>{ const t=setTimeout(()=>nav('/app'), 1100); return ()=>clearTimeout(t) },[]); return <LoadingScreen /> }
