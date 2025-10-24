"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Footer from "@/components/footer"
import SuccessModal from "@/components/success-modal"
import { Alert, AlertDescription } from "@/components/ui/alert"

const STEPS = [
  { id: 1, title: "Personal Information", description: "Basic contact details" },
  { id: 2, title: "Career & Competence", description: "Experience and skills" },
  { id: 3, title: "Final Details", description: "Compensation and declarations" },
]

export default function CreditControlOfficerApplicationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [experienceError, setExperienceError] = useState(false)

  const [formData, setFormData] = useState({
    // Section 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    location: "",
    
    // Section 2: Education and Experience
    highestQualification: "",
    fieldOfStudy: "",
    yearsExperience: "",
    experienceDescription: "",
    
    // Section 3: Credit Control Competence
    debtCollected: "",
    collectionStrategies: "",
    financeSystems: "",
    excelProficiency: "3",
    comfortableWithCalls: "",
    willingToReport: "",
    
    // Section 4: Compensation and Availability
    currentSalary: "",
    expectedSalary: "",
    availableImmediately: "",
    earliestStartDate: "",
    
    // Section 5: Declarations and Attachments
    cvLink: "",
    coverLetterLink: "",
    additionalInfo: "",
    consentVerification: false,
    consentConfidentiality: false,
    noConflictOfInterest: false,
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Check experience requirement
    if (field === "yearsExperience") {
      if (value === "less-than-1") {
        setExperienceError(true)
      } else {
        setExperienceError(false)
      }
    }
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

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (experienceError) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // Add jobId and jobTitle to the submission data
      const submissionData = {
        ...formData,
        jobId: "credit-control-officer",
        jobTitle: "Credit Control Officer",
        department: "Accounts",
        employmentType: "Contract (6 months, renewable)",
      }

      const response = await fetch("/api/submit-credit-control-application", {
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-gray-900">
              Application for Credit Control Officer
            </CardTitle>
            <CardDescription className="text-base">
              6-Month Contract (Renewable Based on Performance) | Accounts Department
            </CardDescription>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                {STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`flex-1 text-center ${
                      step.id < STEPS.length ? "mr-2" : ""
                    }`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        step.id === currentStep
                          ? "text-[#00abec]"
                          : step.id < currentStep
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      Step {step.id}
                    </div>
                    <div
                      className={`text-xs ${
                        step.id === currentStep
                          ? "text-gray-900"
                          : step.id < currentStep
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>
              <Progress value={(currentStep / STEPS.length) * 100} className="h-2" />
            </div>
            
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This is a 6-month contract role, renewable based on performance. Applicants must have at least 1 year of experience and be available to start immediately.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Section 1: Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

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

                  <div className="space-y-2">
                    <Label htmlFor="location">Current City / Location *</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Nairobi"
                    />
                  </div>
                </div>
              </div>
              )}

              {/* Step 2: Career & Competencies */}
              {currentStep === 2 && (
              <>
                <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Section 2: Education and Experience
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="highestQualification">Highest Qualification *</Label>
                  <Select
                    value={formData.highestQualification}
                    onValueChange={(value) => handleChange("highestQualification", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study *</Label>
                  <Input
                    id="fieldOfStudy"
                    required
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
                    placeholder="e.g., Finance, Accounting, Business Administration"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Years of Experience in Credit Control / Receivables / Collections *</Label>
                  <RadioGroup
                    value={formData.yearsExperience}
                    onValueChange={(value) => handleChange("yearsExperience", value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="less-than-1" id="exp-less" />
                      <Label htmlFor="exp-less" className="font-normal cursor-pointer">
                        Less than 1 year
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2-years" id="exp-1-2" />
                      <Label htmlFor="exp-1-2" className="font-normal cursor-pointer">
                        1 – 2 years
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="over-2-years" id="exp-over-2" />
                      <Label htmlFor="exp-over-2" className="font-normal cursor-pointer">
                        Over 2 years
                      </Label>
                    </div>
                  </RadioGroup>
                  {experienceError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        This role requires at least one year of experience. Thank you for your interest.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceDescription">Briefly describe your relevant experience and key duties *</Label>
                  <Textarea
                    id="experienceDescription"
                    required
                    value={formData.experienceDescription}
                    onChange={(e) => handleChange("experienceDescription", e.target.value)}
                    placeholder="Describe your credit control experience, responsibilities, and achievements..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Section 3: Credit Control Competence */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Section 3: Credit Control Competence
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="debtCollected">Approximate value of debt you have successfully collected or managed *</Label>
                  <Input
                    id="debtCollected"
                    required
                    value={formData.debtCollected}
                    onChange={(e) => handleChange("debtCollected", e.target.value)}
                    placeholder="e.g., KES 5M - 10M annually"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collectionStrategies">Methods or strategies you use when following up on overdue accounts *</Label>
                  <Textarea
                    id="collectionStrategies"
                    required
                    value={formData.collectionStrategies}
                    onChange={(e) => handleChange("collectionStrategies", e.target.value)}
                    placeholder="Describe your approach to debt collection, communication strategies, and how you maintain client relationships..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financeSystems">Which finance or accounting systems have you used? *</Label>
                  <Input
                    id="financeSystems"
                    required
                    value={formData.financeSystems}
                    onChange={(e) => handleChange("financeSystems", e.target.value)}
                    placeholder="e.g., QuickBooks, Sage, SAP, MS Excel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excelProficiency">How confident are you with MS Excel? * (1 = Basic, 5 = Expert)</Label>
                  <Select
                    value={formData.excelProficiency}
                    onValueChange={(value) => handleChange("excelProficiency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Basic</SelectItem>
                      <SelectItem value="2">2 - Below Average</SelectItem>
                      <SelectItem value="3">3 - Average</SelectItem>
                      <SelectItem value="4">4 - Good</SelectItem>
                      <SelectItem value="5">5 - Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Are you comfortable making collection calls and client follow-ups? *</Label>
                  <RadioGroup
                    value={formData.comfortableWithCalls}
                    onValueChange={(value) => handleChange("comfortableWithCalls", value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="calls-yes" />
                      <Label htmlFor="calls-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="calls-no" />
                      <Label htmlFor="calls-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Are you willing to prepare weekly reports and show monthly debt collected? *</Label>
                  <RadioGroup
                    value={formData.willingToReport}
                    onValueChange={(value) => handleChange("willingToReport", value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="report-yes" />
                      <Label htmlFor="report-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="report-no" />
                      <Label htmlFor="report-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              </>
              )}

              {/* Step 3: Final Details */}
              {currentStep === 3 && (
              <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Section 4: Compensation and Availability
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentSalary">Current or Most Recent Gross Monthly Salary *</Label>
                    <Input
                      id="currentSalary"
                      required
                      value={formData.currentSalary}
                      onChange={(e) => handleChange("currentSalary", e.target.value)}
                      placeholder="e.g., KES 45,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedSalary">Expected Monthly Salary *</Label>
                    <Input
                      id="expectedSalary"
                      required
                      value={formData.expectedSalary}
                      onChange={(e) => handleChange("expectedSalary", e.target.value)}
                      placeholder="e.g., KES 50,000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Are you available to start immediately? *</Label>
                  <RadioGroup
                    value={formData.availableImmediately}
                    onValueChange={(value) => handleChange("availableImmediately", value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="available-yes" />
                      <Label htmlFor="available-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="available-no" />
                      <Label htmlFor="available-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.availableImmediately === "no" && (
                  <div className="space-y-2">
                    <Label htmlFor="earliestStartDate">Earliest Start Date</Label>
                    <Input
                      id="earliestStartDate"
                      type="date"
                      value={formData.earliestStartDate}
                      onChange={(e) => handleChange("earliestStartDate", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Section 5: Declarations and Attachments
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="cvLink">Upload your CV (Provide shareable link) *</Label>
                  <Input
                    id="cvLink"
                    type="url"
                    required
                    value={formData.cvLink}
                    onChange={(e) => handleChange("cvLink", e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="text-sm text-gray-500">
                    Upload to Google Drive or Dropbox and paste the shareable link
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetterLink">Upload your Cover Letter (Provide shareable link) *</Label>
                  <Input
                    id="coverLetterLink"
                    type="url"
                    required
                    value={formData.coverLetterLink}
                    onChange={(e) => handleChange("coverLetterLink", e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Anything else you would like us to know? (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    placeholder="Any additional information..."
                    rows={3}
                  />
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consentVerification"
                      checked={formData.consentVerification}
                      onCheckedChange={(checked) => handleChange("consentVerification", checked)}
                      required
                    />
                    <Label htmlFor="consentVerification" className="font-normal cursor-pointer text-sm">
                      I consent to employment and reference verification *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consentConfidentiality"
                      checked={formData.consentConfidentiality}
                      onCheckedChange={(checked) => handleChange("consentConfidentiality", checked)}
                      required
                    />
                    <Label htmlFor="consentConfidentiality" className="font-normal cursor-pointer text-sm">
                      I consent to keep company and client data confidential in accordance with Accord's data-protection policy *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="noConflictOfInterest"
                      checked={formData.noConflictOfInterest}
                      onCheckedChange={(checked) => handleChange("noConflictOfInterest", checked)}
                      required
                    />
                    <Label htmlFor="noConflictOfInterest" className="font-normal cursor-pointer text-sm">
                      I declare that I have no conflict of interest that may affect my role at Accord *
                    </Label>
                  </div>
                </div>
              </div>
              </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                )}
                
                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={experienceError}
                    className="ml-auto flex items-center gap-2"
                    style={{ backgroundColor: '#00abec' }}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || experienceError}
                    className="ml-auto text-lg"
                    style={{ backgroundColor: '#00abec' }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
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
