import { createContext, useContext, useState, useEffect } from 'react';
import { heartbeatapi } from '../apis/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for a user in localStorage on component mount (page load)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      // Call heartbeat API initially
      checkTokenValidity(storedUser.token);
    }
  }, []);

  // Function to check token validity
  const checkTokenValidity = (token) => {
    heartbeatapi(token)
      .then((data) => {
        if (!data || !data.success) {
          setUser(null);
          localStorage.removeItem('user');
        }
      })
      .catch((error) => {
        console.error('Error checking token validity:', error);
      });
  };

  // Set up interval to periodically check token validity
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        checkTokenValidity(storedUser.token);
      }
    }, 60000); // Check every 1 minute

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
