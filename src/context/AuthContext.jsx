import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("collabsphere_user_v5");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (user) => {
    setUser(user);
    localStorage.setItem("collabsphere_user_v5", JSON.stringify(user));
  };

  const loginWithCredentials = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    const { user } = data.data;
    login(user);
  };

  const register = async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    const { user } = data.data;
    setUser(user);
    localStorage.setItem("collabsphere_user_v5", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("collabsphere_user_v5");
  };
  
  const updateProfile = (updates) => {
    setUser((prev) => {
      const u = { ...prev, ...updates };
      localStorage.setItem("collabsphere_user_v5", JSON.stringify(u));
      return u;
    });
  };

  const value = useMemo(
    () => ({ user, login, logout, register, updateProfile, loginWithCredentials }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
