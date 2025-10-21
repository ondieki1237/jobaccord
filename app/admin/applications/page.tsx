"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import AdminNav from "@/components/admin/AdminNav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, Eye, Calendar, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

interface Application {
  _id: string
  applicationId: string
  fullName: string
  email: string
  phone: string
  location: string
  status: string
  submittedAt: string
  yearsExperience?: string
  hasDegree?: string
}

export default function ApplicationsListPage() {
  const { admin, token, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!authLoading && !admin) {
      router.push("/admin/login")
    }
  }, [admin, authLoading, router])

  useEffect(() => {
    if (token) {
      fetchApplications()
    }
  }, [token, statusFilter, currentPage])

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      })

      if (statusFilter !== "all") {
        params.append("status", statusFilter)
      }

      const response = await fetch(`${apiUrl}/api/applications?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch applications")

      const data = await response.json()
      setApplications(data.data)
      setTotalPages(data.totalPages)
      setTotal(data.total)
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "text-white"
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
    })
  }

  const filteredApplications = applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (authLoading || !admin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <AdminNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Applications</h1>
          <p className="text-muted-foreground">Manage job applications for Technical Sales Supervisor position</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredApplications.length} of {total} applications
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Application List</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">No applications found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Application ID</TableHead>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell className="font-mono text-xs">{app.applicationId}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{app.fullName}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {app.location}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {app.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {app.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {app.yearsExperience || "N/A"}
                              {app.hasDegree === "yes" && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  Degree
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {formatDate(app.submittedAt)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={getStatusColor(app.status)}
                              style={app.status === 'reviewed' ? { backgroundColor: '#00abec' } : {}}
                            >
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/admin/applications/${app._id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {filteredApplications.map((app) => (
                    <Card key={app._id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{app.fullName}</h3>
                            <p className="text-xs text-muted-foreground font-mono mt-1">{app.applicationId}</p>
                          </div>
                          <Badge 
                            className={getStatusColor(app.status)}
                            style={app.status === 'reviewed' ? { backgroundColor: '#00abec' } : {}}
                          >
                            {app.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {app.email}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {app.phone}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {formatDate(app.submittedAt)}
                          </div>
                        </div>

                        <Link href={`/admin/applications/${app._id}`}>
                          <Button size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
