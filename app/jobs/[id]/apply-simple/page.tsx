"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import SuccessModal from "@/components/success-modal"

interface Job {
  _id: string
  title: string
  department: string
}

export default function SimpleApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    coverLetter: "",
    cvLink: "",
    experience: "",
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submissionData = {
        ...formData,
        jobId: job?._id || "",
        jobTitle: job?.title || "",
        // Map simple form fields to the expected backend format
        eligibleToWork: "yes",
        hasDegree: "",
        degreeDetails: "",
        yearsExperience: formData.experience,
        hasSupervised: "",
        leadershipDescription: "",
        equipmentExperience: "",
        majorSaleDescription: "",
        strengths: [],
        crmProficiency: "3",
        trainingExample: "",
        motivation: formData.coverLetter,
        hadSalesTarget: "",
        targetPerformance: "",
        teamMotivation: "",
        leadershipStyle: "",
        challenges: "",
        difficultClients: "",
        crossDepartment: "",
        whyJoin: formData.coverLetter,
        availableStart: "",
        achievementsLink: "",
        additionalDetails: formData.coverLetter,
        additionalDocuments: [],
      }

      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setShowSuccess(true)
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    router.push("/")
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center">
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
              onClick={() => router.push(`/jobs/${params.id}`)}
              className="self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Details
            </Button>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-gray-900">
              Apply for {job.title}
            </CardTitle>
            <CardDescription className="text-base">
              Fill out the form below to submit your application. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254 700 000 000"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Nairobi, Kenya"
                />
              </div>

              {/* Years of Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Relevant Experience *</Label>
                <Input
                  id="experience"
                  type="text"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 3 years"
                />
              </div>

              {/* CV Link */}
              <div className="space-y-2">
                <Label htmlFor="cvLink">CV/Resume Link *</Label>
                <Input
                  id="cvLink"
                  type="url"
                  required
                  value={formData.cvLink}
                  onChange={(e) => setFormData({ ...formData, cvLink: e.target.value })}
                  placeholder="https://drive.google.com/... or https://dropbox.com/..."
                />
                <p className="text-sm text-gray-500">
                  Upload your CV to Google Drive or Dropbox and paste the shareable link here
                </p>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter / Why are you interested in this position? *</Label>
                <Textarea
                  id="coverLetter"
                  required
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={6}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full hover:opacity-90 text-lg py-6"
                  style={{ backgroundColor: '#00abec' }}
                  size="lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />

      <SuccessModal
        open={showSuccess}
        onOpenChange={(open) => {
          if (!open) handleSuccessClose()
        }}
      />
    </main>
  )
}
