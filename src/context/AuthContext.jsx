import { createContext, useContext, useMemo, useState } from 'react'
const AuthContext = createContext(null)
export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('collabsphere_user_v5')
    return raw ? JSON.parse(raw) : null
  })
  const login = (payload)=>{ const u={ id:'u'+Math.random().toString(36).slice(2), ...payload }; setUser(u); localStorage.setItem('collabsphere_user_v5', JSON.stringify(u)) }
  const logout = ()=>{ setUser(null); localStorage.removeItem('collabsphere_user_v5') }
  const updateProfile = (updates)=>{ setUser(prev=>{ const u={...prev, ...updates}; localStorage.setItem('collabsphere_user_v5', JSON.stringify(u)); return u }) }
  const value = useMemo(()=>({ user, login, logout, updateProfile }),[user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuthContext = ()=>useContext(AuthContext)
