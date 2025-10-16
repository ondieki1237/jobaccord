"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Admin {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  admin: Admin | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem("adminToken")
    const storedAdmin = localStorage.getItem("adminData")

    if (storedToken && storedAdmin) {
      setToken(storedToken)
      setAdmin(JSON.parse(storedAdmin))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store token and admin data
      localStorage.setItem("adminToken", data.data.token)
      localStorage.setItem("adminData", JSON.stringify(data.data.admin))

      setToken(data.data.token)
      setAdmin(data.data.admin)

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminData")
    setToken(null)
    setAdmin(null)
    router.push("/admin/login")
  }

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
