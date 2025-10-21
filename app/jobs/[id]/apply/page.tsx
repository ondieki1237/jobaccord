"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import JobApplicationForm from "@/components/job-application-form"
import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Job {
  _id: string
  title: string
  department: string
}

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchJobDetails()
    }
  }, [params.id])

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/jobs/${params.id}/public`)
      
      if (!response.ok) {
        throw new Error("Job not found")
      }
      
      const data = await response.json()
      setJob(data.data)
    } catch (error: any) {
      console.error("Error fetching job details:", error)
      setError(error.message || "Failed to load job details")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto" style={{ borderColor: '#00abec' }}></div>
          <p className="mt-4 text-gray-600 text-lg">Loading application form...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Card className="text-center py-16 border-red-200">
            <CardContent>
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Job Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                {error || "The job posting you're looking for doesn't exist or has been removed."}
              </p>
              <Button onClick={() => router.push("/")} className="hover:opacity-90" style={{ backgroundColor: '#00abec' }}>
                Back to Job Listings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <JobApplicationForm jobId={job._id} jobTitle={job.title} />
    </main>
  )
}
