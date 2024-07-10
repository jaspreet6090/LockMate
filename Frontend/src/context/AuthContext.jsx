import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    const expirationTime = localStorage.getItem('userExpirationTime');

    if (storedUser && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        // User data has expired
        localStorage.removeItem('user');
        localStorage.removeItem('userExpirationTime');
      } else {
        try {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          // Set timeout to remove user data after the remaining time
          setTimeout(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('userExpirationTime');
            setIsAuthenticated(false);
            setUser(null);
          }, expirationTime - currentTime);
        } catch (error) {
          console.error('Error parsing user data from localStorage', error);
          localStorage.removeItem('user');
          localStorage.removeItem('userExpirationTime');
        }
      }
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/users/login`, userData, { withCredentials: true });
      if (response) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        const expirationTime = new Date().getTime() + 4 * 60 * 60 * 1000; // 4 hours from now
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('userExpirationTime', expirationTime);

        // Set timeout to remove user data after 4 hours
        setTimeout(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('userExpirationTime');
          setIsAuthenticated(false);
          setUser(null);
        }, 4 * 60 * 60 * 1000); // 4 hours

        return response;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/users/signup`, userData, { withCredentials: true });
      if (response) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        const expirationTime = new Date().getTime() + 4 * 60 * 60 * 1000; // 4 hours from now
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('userExpirationTime', expirationTime);

        // Set timeout to remove user data after 4 hours
        setTimeout(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('userExpirationTime');
          setIsAuthenticated(false);
          setUser(null);
        }, 4 * 60 * 60 * 1000); // 4 hours

        return response;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userExpirationTime');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
