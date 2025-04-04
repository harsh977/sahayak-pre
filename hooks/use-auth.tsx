"use client";

import type React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  religion?: string;
  emergency_contact?: {
    name: string;
    phone: string;
  };
}

// Define signup data type
export interface SignupData {
  name: string;
  email: string;
  password: string;
  age?: number;
  religion?: string;
  emergency_contact?: {
    name: string;
    phone: string;
  };
}

// Create auth context
const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  continueAsGuest: () => void;
}>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  continueAsGuest: () => {},
});

// API base URL from environment variable or default to localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/auth";

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Fetch user data using the token
      axios
        .get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser({
            id: response.data.email, // Using email as ID since backend doesn't provide a separate ID
            name: response.data.name,
            email: response.data.email,
            age: response.data.age,
            religion: response.data.religion,
            emergency_contact: response.data.emergency_contact,
          });
        })
        .catch(() => {
          localStorage.removeItem("token"); // Clear invalid token
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { access_token } = response.data;

      // Fetch user data after login
      const userResponse = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const userData: User = {
        id: userResponse.data.email, // Using email as ID
        name: userResponse.data.name,
        email: userResponse.data.email,
        age: userResponse.data.age,
        religion: userResponse.data.religion,
        emergency_contact: userResponse.data.emergency_contact,
      };

      setUser(userData);
      localStorage.setItem("token", access_token);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signup`, data);
      const { access_token } = response.data;

      // Set user data from signup data (since /me endpoint can be used too)
      const userData: User = {
        id: data.email, // Using email as ID
        name: data.name,
        email: data.email,
        age: data.age,
        religion: data.religion,
        emergency_contact: data.emergency_contact,
      };

      setUser(userData);
      localStorage.setItem("token", access_token);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Continue as guest
  const continueAsGuest = () => {
    const guestUser: User = {
      id: "guest",
      name: "Guest User",
      email: "guest@example.com",
      emergency_contact: {
        name: "Emergency Services",
        phone: "108",
      },
    };
    setUser(guestUser);
    localStorage.removeItem("token"); // Ensure no token for guest
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.id !== "guest", // Guest is not truly authenticated
        isLoading,
        login,
        signup,
        logout,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Default export for direct import
export default useAuth;