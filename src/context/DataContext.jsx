import { createContext, useContext, useMemo, useState } from 'react'
import { APPLICATIONS as seedApps } from '../data/mockApplications'
import { ACTIVE_PROJECTS as seedProjects } from '../data/mockActiveProjects'
const DataContext = createContext(null)
export function DataProvider({ children }){
  const [applications, setApplications] = useState(()=>JSON.parse(localStorage.getItem('cs_apps_v5')||'null')||seedApps)
  const [projects, setProjects] = useState(()=>JSON.parse(localStorage.getItem('cs_projects_v5')||'null')||seedProjects)
  const applyToCampaign = (campaign) => {
    const a = { id: 'a'+Math.random().toString(36).slice(2), campaignId: campaign.id, status:'pending', date: new Date().toISOString().slice(0,10) }
    const next = [a, ...applications]
    setApplications(next)
    localStorage.setItem('cs_apps_v5', JSON.stringify(next))
  }
  const addSubmission = (projectId, payload) => {
    const next = projects.map(p => p.id===projectId ? { ...p, submissions:[...(p.submissions||[]), payload] } : p)
    setProjects(next)
    localStorage.setItem('cs_projects_v5', JSON.stringify(next))
  }
  const value = useMemo(()=>({ applications, setApplications, projects, setProjects, applyToCampaign, addSubmission }),[applications, projects])
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
export const useData = ()=>useContext(DataContext)
