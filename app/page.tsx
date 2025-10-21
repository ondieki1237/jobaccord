"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Calendar, Clock, Building2, ArrowRight } from "lucide-react"
import Footer from "@/components/footer"

interface Job {
  _id: string
  title: string
  department: string
  description: string
  location: string
  employmentType: string
  deadline: string
  salary?: string
  applicationCount: number
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/jobs/open`)
      
      if (!response.ok) throw new Error("Failed to fetch jobs")
      
      const data = await response.json()
      setJobs(data.data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      setJobs([])
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
    
    if (diffDays < 0) return "Expired"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "1 day left"
    return `${diffDays} days left`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto" style={{ borderColor: '#00abec' }}></div>
          <p className="mt-4 text-gray-600 text-lg">Loading available positions...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center mb-6">
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
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
              Career Opportunities
            </h1>
            <p className="text-gray-600 text-center mt-2 max-w-2xl">
              Join our team and make a difference in healthcare. Explore our current openings below.
            </p>
          </div>
        </div>
      </div>

      {/* Jobs Listing */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {jobs.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Open Positions
              </h2>
              <p className="text-gray-600 mb-6">
                We don't have any open positions at the moment. Please check back later or follow us on social media for updates.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">{jobs.length}</span> {jobs.length === 1 ? "Position" : "Positions"} Available
              </p>
            </div>

            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card key={job._id} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-[#00abec]/30">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 text-gray-900">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="text-base flex flex-wrap gap-3 mt-2">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge 
                        className={getEmploymentTypeBadge(job.employmentType)}
                        style={job.employmentType === 'full-time' ? { backgroundColor: '#00abec' } : {}}
                      >
                        {formatEmploymentType(job.employmentType)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="font-medium text-orange-600">
                          {getDaysRemaining(job.deadline)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end items-center">
                      <Link href={`/jobs/${job._id}`}>
                        <Button className="hover:opacity-90" style={{ backgroundColor: '#00abec' }}>
                          View Details & Apply
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
