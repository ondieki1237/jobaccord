"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BasicInformation from "./form-steps/basic-information"
import ExperienceBackground from "./form-steps/experience-background"
import SkillsCompetencies from "./form-steps/skills-competencies"
import ResultsLeadership from "./form-steps/results-leadership"
import CultureFit from "./form-steps/culture-fit"
import Attachments from "./form-steps/attachments"
import SuccessModal from "./success-modal"

export interface FormData {
  // Basic Information
  fullName: string
  email: string
  phone: string
  location: string
  eligibleToWork: string

  // Experience & Background
  hasDegree: string
  degreeDetails: string
  yearsExperience: string
  hasSupervised: string
  leadershipDescription: string
  equipmentExperience: string
  majorSaleDescription: string

  // Skills & Competencies
  strengths: string[]
  crmProficiency: string
  trainingExample: string
  motivation: string

  // Results & Leadership
  hadSalesTarget: string
  targetPerformance: string
  teamMotivation: string
  leadershipStyle: string
  challenges: string

  // Culture & Fit
  difficultClients: string
  crossDepartment: string
  whyJoin: string
  availableStart: string

  // Attachments
  cvLink: string
  achievementsLink: string

  // Additional Details and Dynamic Document Links
  additionalDetails: string
  additionalDocuments: Array<{ label: string; url: string }>
}

const STEPS = [
  { id: 1, title: "Basic Information", description: "Personal details and eligibility" },
  { id: 2, title: "Experience & Background", description: "Education and work history" },
  { id: 3, title: "Skills & Competencies", description: "Your professional strengths" },
  { id: 4, title: "Results & Leadership", description: "Achievements and management style" },
  { id: 5, title: "Culture & Fit", description: "Values and motivation" },
  { id: 6, title: "Attachments", description: "Documents and proof of achievements" },
]

interface JobApplicationFormProps {
  jobId?: string
  jobTitle?: string
}

export default function JobApplicationForm({ jobId, jobTitle }: JobApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    eligibleToWork: "",
    hasDegree: "",
    degreeDetails: "",
    yearsExperience: "",
    hasSupervised: "",
    leadershipDescription: "",
    equipmentExperience: "",
    majorSaleDescription: "",
    strengths: [],
    crmProficiency: "3",
    trainingExample: "",
    motivation: "",
    hadSalesTarget: "",
    targetPerformance: "",
    teamMotivation: "",
    leadershipStyle: "",
    challenges: "",
    difficultClients: "",
    crossDepartment: "",
    whyJoin: "",
    availableStart: "",
    cvLink: "",
    achievementsLink: "",
    additionalDetails: "",
    additionalDocuments: [
      { label: "", url: "" },
      { label: "", url: "" },
      { label: "", url: "" },
    ],
  })

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Add jobId and jobTitle to the submission data
      const submissionData = {
        ...formData,
        jobId: jobId || "",
        jobTitle: jobTitle || "Technical Sales Supervisor"
      }

      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setShowSuccess(true)
      } else {
        alert("There was an error submitting your application. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6">
            <Image
              src="/logoaccord.png"
              alt="Accord Medical Supplies Ltd"
              width={400}
              height={120}
              priority
              className="w-auto h-24"
            />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 text-balance">Technical Sales Supervisor Application</h1>
          <p className="text-muted-foreground text-center text-balance">Biomedical Division - Nairobi</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{STEPS[currentStep - 1].title}</CardTitle>
              <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Form Steps */}
        <Card>
          <CardContent className="pt-6">
            {currentStep === 1 && <BasicInformation formData={formData} updateFormData={updateFormData} />}
            {currentStep === 2 && <ExperienceBackground formData={formData} updateFormData={updateFormData} />}
            {currentStep === 3 && <SkillsCompetencies formData={formData} updateFormData={updateFormData} />}
            {currentStep === 4 && <ResultsLeadership formData={formData} updateFormData={updateFormData} />}
            {currentStep === 5 && <CultureFit formData={formData} updateFormData={updateFormData} />}
            {currentStep === 6 && <Attachments formData={formData} updateFormData={updateFormData} />}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < STEPS.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessModal open={showSuccess} onOpenChange={setShowSuccess} />
    </>
  )
}
