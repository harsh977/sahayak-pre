"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

// Define user type
export interface User {
  id: string
  name: string
  email: string
  age?: number
  religion?: string
  emergencyContact?: {
    name: string
    phone: string
  }
}

// Define signup data type
export interface SignupData {
  name: string
  email: string
  password: string
  age?: number
  religion?: string
  emergencyContact?: {
    name: string
    phone: string
  }
}

// Create auth context
const AuthContext = createContext<{
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  continueAsGuest: () => void
}>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  continueAsGuest: () => {},
})

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    password: "password123",
    age: 65,
    religion: "Hindu",
    emergencyContact: {
      name: "Rahul Kumar",
      phone: "+91 98765 43210",
    },
  },
]

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      setIsLoading(false)
      throw new Error("Invalid credentials")
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = foundUser

    // Set user and store in localStorage
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)
  }

  // Signup function
  const signup = async (data: SignupData) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
      age: data.age,
      religion: data.religion,
      emergencyContact: data.emergencyContact,
    }

    // Set user and store in localStorage
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Continue as guest
  const continueAsGuest = () => {
    const guestUser: User = {
      id: "guest",
      name: "Guest User",
      email: "guest@example.com",
      emergencyContact: {
        name: "Emergency Services",
        phone: "108",
      },
    }

    setUser(guestUser)
    localStorage.setItem("user", JSON.stringify(guestUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

// Default export for direct import
export default useAuth

