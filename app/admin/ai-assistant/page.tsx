"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import AdminNav from "@/components/admin/AdminNav"
import AIAssistant from "@/components/admin/AIAssistant"
import { Sparkles } from "lucide-react"

export default function AIAssistantPage() {
  const { admin, token, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login")
    }
  }, [admin, isLoading, router])

  if (isLoading || !admin || !token) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <AdminNav />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">AI Assistant</h1>
          </div>
          <p className="text-muted-foreground">
            Use AI to analyze applications, compare candidates, and get intelligent insights
          </p>
        </div>

        <AIAssistant token={token} />
      </div>
    </div>
  )
}
