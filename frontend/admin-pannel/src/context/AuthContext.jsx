import { createContext,useState,useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/auth/verify', {
        headers: { 'x-auth-token': token }

      })
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);

        });}
      else {
      setIsAuthenticated(false)
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken)
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null);
    setIsAuthenticated(false)
  };
  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
  );

};