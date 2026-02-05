import { createContext, useContext, useMemo, useState, useEffect } from 'react'
const UIContext = createContext(null)
export function UIProvider({ children }){
  const [theme, setTheme] = useState(()=>localStorage.getItem('cs_theme') || 'light')
  useEffect(()=>{ document.documentElement.classList.toggle('dark', theme==='dark'); localStorage.setItem('cs_theme', theme) },[theme])
  const value = useMemo(()=>({ theme, setTheme }),[theme])
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
export const useUI = ()=>useContext(UIContext)
