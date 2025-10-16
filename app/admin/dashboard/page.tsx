"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import AdminNav from "@/components/admin/AdminNav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  FileText,
  Clock,
  CheckCircle,
  Users,
  XCircle,
  Briefcase,
  ExternalLink,
  Calendar,
} from "lucide-react"
import Link from "next/link"

interface Statistics {
  total: number
  pending: number
  reviewed: number
  shortlisted: number
  rejected: number
  hired: number
}

interface RecentApplication {
  _id: string
  fullName: string
  email: string
  submittedAt: string
  status: string
  applicationId: string
}

export default function AdminDashboard() {
  const { admin, token, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !admin) {
      router.push("/admin/login")
    }
  }, [admin, authLoading, router])

  useEffect(() => {
    if (token) {
      fetchStatistics()
    }
  }, [token])

  const fetchStatistics = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://jobaccord.onrender.com"
      const response = await fetch(`${apiUrl}/api/applications/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch statistics")

      const data = await response.json()
      setStatistics(data.data.statistics)
      setRecentApplications(data.data.recentApplications)
    } catch (error) {
      console.error("Error fetching statistics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "hired":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (authLoading || !admin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <AdminNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Technical Sales Supervisor - Job Applications Overview</p>
        </div>

        {/* Statistics Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics?.total || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">All submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{statistics?.pending || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{statistics?.reviewed || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Initial review done</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{statistics?.shortlisted || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Ready for interview</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{statistics?.rejected || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Not proceeding</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hired</CardTitle>
                <Briefcase className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{statistics?.hired || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Successfully hired</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest 5 submissions</p>
            </div>
            <Link href="/admin/applications">
              <Button variant="outline" size="sm">
                View All
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : recentApplications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No applications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <Link key={app._id} href={`/admin/applications/${app._id}`}>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{app.fullName}</h4>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{app.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {app.applicationId}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(app.submittedAt)}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
