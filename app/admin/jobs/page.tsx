"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, XCircle, CheckCircle, Calendar, MapPin, Briefcase } from "lucide-react"

interface Job {
  _id: string
  title: string
  department: string
  location: string
  deadline: string
  status: "open" | "closed" | "draft"
  employmentType: string
  applicationCount: number
  createdAt: string
}

export default function JobsAdminPage() {
  const { admin, token, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0, draft: 0 })

  useEffect(() => {
    if (!authLoading && !admin) {
      router.push("/admin/login")
    }
  }, [admin, authLoading, router])

  useEffect(() => {
    if (token) {
      fetchJobs()
      fetchStatistics()
    }
  }, [token])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const response = await fetch(`${apiUrl}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch jobs")

      const data = await response.json()
      setJobs(data.data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const response = await fetch(`${apiUrl}/api/jobs/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      }
    } catch (error) {
      console.error("Error fetching statistics:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const response = await fetch(`${apiUrl}/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchJobs()
        fetchStatistics()
      }
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const handleClose = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const response = await fetch(`${apiUrl}/api/jobs/${id}/close`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchJobs()
        fetchStatistics()
      }
    } catch (error) {
      console.error("Error closing job:", error)
    }
  }

  const handleReopen = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const response = await fetch(`${apiUrl}/api/jobs/${id}/reopen`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchJobs()
        fetchStatistics()
      }
    } catch (error) {
      console.error("Error reopening job:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500">Open</Badge>
      case "closed":
        return <Badge className="bg-red-500">Closed</Badge>
      case "draft":
        return <Badge className="bg-gray-500">Draft</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#00abec' }}></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
              <p className="text-gray-600 mt-1">Manage all your job postings</p>
            </div>
            <Link href="/admin/jobs/new">
              <Button className="hover:opacity-90" style={{ backgroundColor: '#00abec' }}>
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Jobs</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <Briefcase className="h-4 w-4 text-gray-400" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open Positions</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.open}</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Closed</CardDescription>
              <CardTitle className="text-3xl text-red-600">{stats.closed}</CardTitle>
            </CardHeader>
            <CardContent>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Drafts</CardDescription>
              <CardTitle className="text-3xl text-gray-600">{stats.draft}</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Job Postings</CardTitle>
            <CardDescription>
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"} in total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                <p className="text-gray-600 mb-6">Get started by creating your first job posting</p>
                <Link href="/admin/jobs/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Post Your First Job
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job._id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(job.deadline).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(job.status)}</TableCell>
                        <TableCell>{job.applicationCount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/jobs/${job._id}/edit`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            
                            {job.status === "open" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleClose(job._id)}
                              >
                                <XCircle className="h-4 w-4 text-orange-500" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReopen(job._id)}
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                            )}

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Job?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the
                                    job posting and all associated applications.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(job._id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
