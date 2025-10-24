"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  Building2, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import Footer from "@/components/footer"

interface Job {
  _id: string
  title: string
  department: string
  description: string
  qualifications: string | string[]
  responsibilities: string | string[]
  location: string
  employmentType: string
  deadline: string
  salary?: string
  link?: string
  applicationCount: number
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to convert string to array
  const toArray = (data: string | string[]): string[] => {
    if (Array.isArray(data)) return data
    if (!data) return []
    // Split by newlines and filter out empty lines
    return data.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  }

  useEffect(() => {
    if (params.id) {
      fetchJobDetails()
    }
  }, [params.id])

  const fetchJobDetails = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
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

  const getEmploymentTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "full-time": "text-white",
      "part-time": "bg-green-100 text-green-800",
      "contract": "bg-purple-100 text-purple-800",
      "internship": "bg-orange-100 text-orange-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const formatEmploymentType = (type: string) => {
    return type.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("-")
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { text: "Expired", color: "text-red-600" }
    if (diffDays === 0) return { text: "Today", color: "text-orange-600" }
    if (diffDays === 1) return { text: "1 day left", color: "text-orange-600" }
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: "text-orange-600" }
    return { text: `${diffDays} days left`, color: "text-green-600" }
  }

  const handleApply = () => {
    // Create job slug from title
    const jobSlug = job?.title
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') || ''
    
    // Map job titles to their specific application routes
    const jobRoutes: Record<string, string> = {
      'technical-sales-supervisor': '/apply/technical-sales-supervisor',
      'social-media-marketing-intern': '/apply/social-media-intern',
      'customer-service-representative': '/apply/customer-service-representative',
      'accountant': '/apply/accountant',
      'it-support-specialist': '/apply/it-support-specialist',
      'human-resources-officer': '/apply/human-resources-officer',
      'credit-control-officer': '/apply/credit-control-officer',
    }

    // Check if job has a dedicated route, otherwise use dynamic route
    if (jobRoutes[jobSlug]) {
      router.push(jobRoutes[jobSlug])
    } else if (job?.title === "Technical Sales Supervisor") {
      // Fallback: Use the complex multi-step form for Technical Sales
      router.push(`/jobs/${params.id}/apply`)
    } else {
      // Fallback: Use simple form for other jobs
      router.push(`/jobs/${params.id}/apply-simple`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto" style={{ borderColor: '#00abec' }}></div>
          <p className="mt-4 text-gray-600 text-lg">Loading job details...</p>
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
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Job Listings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const deadline = getDaysRemaining(job.deadline)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center mb-4">
            <div className="mb-4">
              <Image
                src="/logoaccord.png"
                alt="Accord Medical Supplies Ltd"
                width={400}
                height={120}
                priority
                className="w-auto h-20"
              />
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Listings
            </Button>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3 text-gray-900">
                  {job.title}
                </CardTitle>
                <CardDescription className="text-base flex flex-wrap gap-4 mt-2">
                  <span className="flex items-center gap-1 text-gray-700">
                    <Building2 className="h-5 w-5" />
                    <span className="font-medium">{job.department}</span>
                  </span>
                  <span className="flex items-center gap-1 text-gray-700">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{job.location}</span>
                  </span>
                </CardDescription>
              </div>
              <Badge 
                className={getEmploymentTypeBadge(job.employmentType) + " text-sm px-3 py-1"}
                style={job.employmentType === 'full-time' ? { backgroundColor: '#00abec' } : {}}
              >
                {formatEmploymentType(job.employmentType)}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm pt-2">
              {job.salary && (
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                  <Briefcase className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-700">{job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#00abec20' }}>
                <Calendar className="h-4 w-4" style={{ color: '#00abec' }} />
                <span style={{ color: '#00abec' }}>
                  Deadline: <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                <Clock className={`h-4 w-4 ${deadline.color}`} />
                <span className={`font-medium ${deadline.color}`}>
                  {deadline.text}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5" style={{ color: '#00abec' }} />
                About the Role
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            <Separator />

            {/* Responsibilities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {toArray(job.responsibilities).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Qualifications */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Required Qualifications
              </h3>
              <ul className="space-y-2">
                {toArray(job.qualifications).map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#00abec' }} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Apply Button */}
            <div className="pt-4">
              <Button 
                onClick={handleApply}
                className="w-full hover:opacity-90 text-lg py-6"
                style={{ backgroundColor: '#00abec' }}
                size="lg"
              >
                Apply for this Position
              </Button>
              {job.link && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Or apply directly at:{" "}
                  <a 
                    href={job.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: '#00abec' }}
                  >
                    {job.link}
                  </a>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
