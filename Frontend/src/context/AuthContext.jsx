// src/context/AuthContext.js
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
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);


  const login = async (userData) => {

    try {
      const response = await axios.post(`${import.meta.env.SERVER}/users/login`, userData, { withCredentials: true });
      if (response) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response;
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return false;
    }
  };
  const signup = async (userData) => {

    try {
      const response = await axios.post(`${import.meta.env.SERVER}/users/signup`, userData, { withCredentials: true });
      if (response) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        return response;
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return false;
    }
  };





  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
