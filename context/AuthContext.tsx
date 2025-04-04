"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  continueAsGuest: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:8000/auth"; // Update this for production

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Optionally fetch user data here using the token
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      
      const { access_token } = response.data;
      setToken(access_token);
      setIsAuthenticated(true);
      localStorage.setItem("token", access_token);
      
      // Optionally fetch user data here
      const userResponse = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setUser(userResponse.data);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Login failed");
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      const { access_token } = response.data;
      setToken(access_token);
      setIsAuthenticated(true);
      localStorage.setItem("token", access_token);
      setUser({ email: userData.email, name: userData.name });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const continueAsGuest = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, continueAsGuest, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};