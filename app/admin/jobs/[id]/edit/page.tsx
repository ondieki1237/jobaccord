"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function EditJobPage() {
  const { admin, token, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const jobId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    employmentType: "full-time",
    description: "",
    qualifications: "",
    responsibilities: "",
    salary: "",
    deadline: "",
    link: "",
    status: "open"
  })

  useEffect(() => {
    if (!authLoading && !admin) {
      router.push("/admin/login")
    }
  }, [admin, authLoading, router])

  useEffect(() => {
    if (token && jobId) {
      fetchJobDetails()
    }
  }, [token, jobId])

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const response = await fetch(`${apiUrl}/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch job details")

      const data = await response.json()
      const job = data.data

      // Convert date to YYYY-MM-DD format for input
      const deadlineDate = new Date(job.deadline)
      const formattedDeadline = deadlineDate.toISOString().split('T')[0]

      setFormData({
        title: job.title || "",
        department: job.department || "",
        location: job.location || "",
        employmentType: job.employmentType || "full-time",
        description: job.description || "",
        qualifications: job.qualifications || "",
        responsibilities: job.responsibilities || "",
        salary: job.salary || "",
        deadline: formattedDeadline,
        link: job.link || "",
        status: job.status || "open"
      })
    } catch (error) {
      console.error("Error fetching job:", error)
      alert("Failed to load job details")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const response = await fetch(`${apiUrl}/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update job")
      }

      alert("Job updated successfully!")
      router.push("/admin/jobs")
    } catch (error) {
      console.error("Error updating job:", error)
      alert("Failed to update job. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#00abec' }}></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/jobs">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Job Posting</h1>
          <p className="text-gray-600 mt-1">Update the job details below</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Update the information for this job posting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Technical Sales Supervisor"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g., Sales - Biomedical"
                />
              </div>

              {/* Location and Employment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Nairobi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role and what the candidate will be doing..."
                  rows={6}
                />
              </div>

              {/* Qualifications */}
              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualifications *</Label>
                <Textarea
                  id="qualifications"
                  required
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  placeholder="Enter each qualification on a new line"
                  rows={6}
                />
                <p className="text-sm text-gray-500">
                  Enter each qualification on a new line. They will be displayed as bullet points.
                </p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Enter each responsibility on a new line"
                  rows={6}
                />
                <p className="text-sm text-gray-500">
                  Enter each responsibility on a new line. They will be displayed as bullet points.
                </p>
              </div>

              {/* Salary and Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range (Optional)</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g., KES 80,000 - 120,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>

              {/* External Link */}
              <div className="space-y-2">
                <Label htmlFor="link">External Application Link (Optional)</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                />
                <p className="text-sm text-gray-500">
                  If provided, candidates can also apply through this external link
                </p>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Job Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 hover:opacity-90"
                  style={{ backgroundColor: '#00abec' }}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Link href="/admin/jobs" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
