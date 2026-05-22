import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logout as logoutApi } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      getMe(token).then(setUser).catch(() => localStorage.removeItem('admin_token')).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => { logoutApi(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
