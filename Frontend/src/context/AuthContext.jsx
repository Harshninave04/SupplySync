import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../services/api'; // Import api to set headers

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Loaded from localStorage on mount:', storedUser);
    if (storedUser && storedUser.token) {
      setUser(storedUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log('Logging in user:', userData);

    if (!userData || !userData.token) {
      console.error('Error: No token received!');
      return;
    }

    localStorage.setItem('user', JSON.stringify(userData));
    console.log('Immediately after setItem:', localStorage.getItem('user')); // Check if it’s there
    setUser(userData);
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };


  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
