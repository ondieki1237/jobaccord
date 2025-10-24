"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import SuccessModal from "@/components/success-modal"

interface SpecificField {
  id: string
  label: string
  type: "text" | "textarea" | "url" | "number"
  placeholder?: string
  required?: boolean
  rows?: number
}

interface SimpleApplicationFormProps {
  jobTitle: string
  department: string
  jobId?: string
  specificFields?: SpecificField[]
}

export default function SimpleApplicationForm({ jobTitle, department, jobId, specificFields = [] }: SimpleApplicationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    cvLink: "",
    coverLetter: "",
    experience: "",
    ...specificFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {}),
  })

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Build additional details from specific fields
      const specificFieldsData = specificFields.map(field => 
        `${field.label}: ${formData[field.id]}`
      ).join('\n\n')

      const submissionData = {
        ...formData,
        jobId: jobId || jobTitle.toLowerCase().replace(/\s+/g, '-'),
        jobTitle,
        department,
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
        additionalDetails: `${formData.coverLetter}\n\n${specificFieldsData}`,
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
              onClick={() => router.push("/")}
              className="self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Listings
            </Button>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-gray-900">
              Apply for {jobTitle}
            </CardTitle>
            <CardDescription className="text-base">
              {department} | All fields marked with * are required
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
                  onChange={(e) => handleChange("fullName", e.target.value)}
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
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  onChange={(e) => handleChange("phone", e.target.value)}
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
                  onChange={(e) => handleChange("location", e.target.value)}
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
                  onChange={(e) => handleChange("experience", e.target.value)}
                  placeholder="e.g., 3 years"
                />
              </div>

              {/* Job-Specific Fields */}
              {specificFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label} {field.required && "*"}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.id}
                      required={field.required}
                      value={formData[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={field.rows || 4}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type}
                      required={field.required}
                      value={formData[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              {/* CV Link */}
              <div className="space-y-2">
                <Label htmlFor="cvLink">CV/Resume Link *</Label>
                <Input
                  id="cvLink"
                  type="url"
                  required
                  value={formData.cvLink}
                  onChange={(e) => handleChange("cvLink", e.target.value)}
                  placeholder="https://drive.google.com/... or https://dropbox.com/..."
                />
                <p className="text-sm text-gray-500">
                  Upload your CV to Google Drive or Dropbox and paste the shareable link here
                </p>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Why are you interested in this position? *</Label>
                <Textarea
                  id="coverLetter"
                  required
                  value={formData.coverLetter}
                  onChange={(e) => handleChange("coverLetter", e.target.value)}
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
          if (!open) router.push("/")
        }}
      />
    </main>
  )
}
