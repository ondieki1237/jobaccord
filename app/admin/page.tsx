"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminPage() {
  const router = useRouter()
  const { admin, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (admin) {
        router.push("/admin/dashboard")
      } else {
        router.push("/admin/login")
      }
    }
  }, [admin, isLoading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
