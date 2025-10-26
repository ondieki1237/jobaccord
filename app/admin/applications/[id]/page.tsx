"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import AdminNav from "@/components/admin/AdminNav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Save,
  DollarSign,
  Shield,
} from "lucide-react"
import { toast } from "sonner"

// Universal Application interface
interface Application {
  _id: string
  applicationId: string
  jobTitle?: string
  department?: string
  employmentType?: string
  fullName: string
  email: string
  phone: string
  location: string
  yearsExperience: string
  cvLink: string
  status: string
  submittedAt: string
  notes?: string
  // Sales Supervisor specific
  eligibleToWork?: string
  hasDegree?: string
  degreeDetails?: string
  hasSupervised?: string
  leadershipDescription?: string
  equipmentExperience?: string
  majorSaleDescription?: string
  strengths?: string[]
  crmProficiency?: string
  trainingExample?: string
  motivation?: string
  hadSalesTarget?: string
  targetPerformance?: string
  teamMotivation?: string
  leadershipStyle?: string
  challenges?: string
  difficultClients?: string
  crossDepartment?: string
  whyJoin?: string
  availableStart?: string
  achievementsLink?: string
  additionalDetails?: string
  additionalDocuments?: Array<{ label: string; url: string }>
  // Credit Control specific
  highestQualification?: string
  fieldOfStudy?: string
  experienceDescription?: string
  debtCollected?: string
  collectionStrategies?: string
  financeSystems?: string
  excelProficiency?: string
  comfortableWithCalls?: string
  willingToReport?: string
  currentSalary?: string
  expectedSalary?: string
  availableImmediately?: string
  earliestStartDate?: string
  coverLetterLink?: string
  credentialsLink?: string
  confirmAccuracy?: boolean
  understandContractTerms?: boolean
  noConflictOfInterest?: boolean
}

export default function ApplicationDetailPage() {
  const { admin, token, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [notes, setNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && !admin) {
      router.push("/admin/login")
    }
  }, [admin, authLoading, router])

  useEffect(() => {
    if (token && id) {
      fetchApplication()
    }
  }, [token, id])

  const fetchApplication = async () => {
    try {
      setIsLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      
      // Determine which endpoint to use based on application ID prefix
      const endpoint = id.startsWith('CCO-') 
        ? `/api/credit-control-applications/${id}`
        : `/api/applications/${id}`
      
      const response = await fetch(`${apiUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (!response.ok) throw new Error("Failed to fetch application")

      const data = await response.json()
      setApplication(data.data)
      setStatus(data.data.status)
      setNotes(data.data.notes || "")
    } catch (error) {
      console.error("Error fetching application:", error)
      toast.error("Failed to load application")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setIsSaving(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      
      // Determine which endpoint to use based on application ID prefix
      const endpoint = id.startsWith('CCO-') 
        ? `/api/credit-control-applications/${id}`
        : `/api/applications/${id}`
      
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, notes }),
      })

      if (!response.ok) throw new Error("Failed to update application")

      toast.success("Application updated successfully")
      fetchApplication()
    } catch (error) {
      console.error("Error updating application:", error)
      toast.error("Failed to update application")
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
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
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (authLoading || !admin) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
        <AdminNav />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>Application not found</AlertDescription>
          </Alert>
          <Link href="/admin/applications">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Detect application type based on ID prefix or available fields
  const isCreditControl = application.applicationId.startsWith('CCO-') || 
    (!!application.highestQualification && !!application.debtCollected)
  const isSalesSupervisor = application.applicationId.startsWith('APP-') || 
    (!!application.strengths && !!application.leadershipStyle)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <AdminNav />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/applications">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{application.fullName}</h1>
              <p className="text-muted-foreground text-sm mb-1">
                {application.jobTitle || (isCreditControl ? "Credit Control Officer" : "Technical Sales Supervisor")}
                {application.department && ` • ${application.department}`}
              </p>
              <p className="text-muted-foreground font-mono text-xs">{application.applicationId}</p>
            </div>
            <Badge className={getStatusColor(application.status)} style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
              {application.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href={`mailto:${application.email}`} className="text-sm text-blue-600 hover:underline">
                      {application.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a href={`tel:${application.phone}`} className="text-sm text-blue-600 hover:underline">
                      {application.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm">{application.location}</p>
                  </div>
                </div>
                {application.eligibleToWork && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Eligible to Work in Kenya</p>
                      <p className="text-sm">{application.eligibleToWork === "yes" ? "✅ Yes" : "❌ No"}</p>
                    </div>
                  </div>
                )}
                {application.availableStart && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Available to Start</p>
                      <p className="text-sm">{application.availableStart}</p>
                    </div>
                  </div>
                )}
                {application.availableImmediately && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Available Immediately</p>
                      <p className="text-sm">{application.availableImmediately === "yes" ? "✅ Yes" : `❌ No - Start Date: ${application.earliestStartDate || "Not specified"}`}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Education & Experience - Dynamic based on job type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education & Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Credit Control - Qualification */}
                {isCreditControl && application.highestQualification && (
                  <>
                    <div>
                      <Label className="font-semibold">Highest Qualification</Label>
                      <p className="text-sm mt-1 capitalize">
                        {application.highestQualification.replace("-", " ")}
                        {application.fieldOfStudy && ` - ${application.fieldOfStudy}`}
                      </p>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Sales Supervisor - Degree */}
                {isSalesSupervisor && application.hasDegree && (
                  <>
                    <div>
                      <Label className="font-semibold">Education</Label>
                      <p className="text-sm mt-1">
                        {application.hasDegree === "yes" ? "✅ Has Degree" : "❌ No Degree"}
                      </p>
                      {application.degreeDetails && (
                        <p className="text-sm text-muted-foreground mt-2">{application.degreeDetails}</p>
                      )}
                    </div>
                    <Separator />
                  </>
                )}

                {/* Years of Experience - Common */}
                <div>
                  <Label className="font-semibold">Years of Experience</Label>
                  <p className="text-sm mt-1 capitalize">{application.yearsExperience?.replace("-", " to ") || "Not specified"}</p>
                </div>

                {/* Credit Control - Experience Description */}
                {isCreditControl && application.experienceDescription && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Experience Description</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.experienceDescription}</p>
                    </div>
                  </>
                )}

                {/* Sales Supervisor - Leadership */}
                {isSalesSupervisor && (
                  <>
                    {application.hasSupervised && (
                      <>
                        <Separator />
                        <div>
                          <Label className="font-semibold">Leadership Experience</Label>
                          <p className="text-sm mt-1">
                            {application.hasSupervised === "yes" ? "✅ Has supervised teams" : "❌ No supervisory experience"}
                          </p>
                          {application.leadershipDescription && (
                            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.leadershipDescription}</p>
                          )}
                        </div>
                      </>
                    )}

                    {application.equipmentExperience && (
                      <>
                        <Separator />
                        <div>
                          <Label className="font-semibold">Equipment Experience</Label>
                          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.equipmentExperience}</p>
                        </div>
                      </>
                    )}

                    {application.majorSaleDescription && (
                      <>
                        <Separator />
                        <div>
                          <Label className="font-semibold">Major Sale Achievement</Label>
                          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.majorSaleDescription}</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Credit Control Competence - Only for Credit Control */}
            {isCreditControl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Credit Control Competence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.debtCollected && (
                    <div>
                      <Label className="font-semibold">Debt Collection Experience</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.debtCollected}</p>
                    </div>
                  )}

                  {application.collectionStrategies && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Collection Strategies</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.collectionStrategies}</p>
                      </div>
                    </>
                  )}

                  {application.financeSystems && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Finance Systems Experience</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.financeSystems}</p>
                      </div>
                    </>
                  )}

                  {application.excelProficiency && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Excel Proficiency</Label>
                        <p className="text-sm mt-1">
                          {application.excelProficiency}/5 - {parseInt(application.excelProficiency) >= 4 ? "Expert" : parseInt(application.excelProficiency) >= 3 ? "Intermediate" : "Beginner"}
                        </p>
                      </div>
                    </>
                  )}

                  {application.comfortableWithCalls && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Comfortable with Phone Calls</Label>
                        <p className="text-sm mt-1">{application.comfortableWithCalls === "yes" ? "✅ Yes" : "❌ No"}</p>
                      </div>
                    </>
                  )}

                  {application.willingToReport && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Willing to Report Weekly</Label>
                        <p className="text-sm mt-1">{application.willingToReport === "yes" ? "✅ Yes" : "❌ No"}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Skills & Competencies - Only for Sales Supervisor */}
            {isSalesSupervisor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Skills & Competencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.strengths && application.strengths.length > 0 && (
                    <div>
                      <Label className="font-semibold">Key Strengths</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {application.strengths.map((strength, index) => (
                          <Badge key={index} variant="secondary">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {application.crmProficiency && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">CRM Proficiency</Label>
                        <p className="text-sm mt-1">
                          {application.crmProficiency}/5 - {parseInt(application.crmProficiency) >= 4 ? "Expert" : parseInt(application.crmProficiency) >= 3 ? "Intermediate" : "Beginner"}
                        </p>
                      </div>
                    </>
                  )}

                  {application.trainingExample && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Training Experience</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.trainingExample}</p>
                      </div>
                    </>
                  )}

                  {application.motivation && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Motivation</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.motivation}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Results & Leadership - Only for Sales Supervisor */}
            {isSalesSupervisor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Results & Leadership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.hadSalesTarget && (
                    <div>
                      <Label className="font-semibold">Sales Target Experience</Label>
                      <p className="text-sm mt-1">
                        {application.hadSalesTarget === "yes" ? "✅ Yes" : "❌ No"}
                      </p>
                      {application.targetPerformance && (
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.targetPerformance}</p>
                      )}
                    </div>
                  )}

                  {application.teamMotivation && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Team Motivation</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.teamMotivation}</p>
                      </div>
                    </>
                  )}

                  {application.leadershipStyle && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Leadership Style</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.leadershipStyle}</p>
                      </div>
                    </>
                  )}

                  {application.challenges && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Handling Challenges</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.challenges}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Culture & Fit - Only for Sales Supervisor */}
            {isSalesSupervisor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Culture & Fit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.difficultClients && (
                    <div>
                      <Label className="font-semibold">Handling Difficult Clients</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.difficultClients}</p>
                    </div>
                  )}

                  {application.crossDepartment && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Cross-Department Collaboration</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.crossDepartment}</p>
                      </div>
                    </>
                  )}

                  {application.whyJoin && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Why Join Accord Medical</Label>
                        <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.whyJoin}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Compensation - Only for Credit Control */}
            {isCreditControl && (application.currentSalary || application.expectedSalary) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Compensation Expectations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {application.currentSalary && (
                    <div>
                      <Label className="font-semibold">Current Salary</Label>
                      <p className="text-sm mt-1">KSh {application.currentSalary}</p>
                    </div>
                  )}

                  {application.expectedSalary && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Expected Salary</Label>
                        <p className="text-sm mt-1">KSh {application.expectedSalary}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Declarations - Only for Credit Control */}
            {isCreditControl && (application.confirmAccuracy !== undefined || application.understandContractTerms !== undefined || application.noConflictOfInterest !== undefined) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Declarations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {application.confirmAccuracy !== undefined && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${application.confirmAccuracy ? "text-green-600" : "text-red-600"}`} />
                      <p className="text-sm">Information accuracy confirmed</p>
                    </div>
                  )}
                  {application.understandContractTerms !== undefined && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${application.understandContractTerms ? "text-green-600" : "text-red-600"}`} />
                      <p className="text-sm">Contract terms understood</p>
                    </div>
                  )}
                  {application.noConflictOfInterest !== undefined && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${application.noConflictOfInterest ? "text-green-600" : "text-red-600"}`} />
                      <p className="text-sm">No conflict of interest</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Attachments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">CV/Resume</Label>
                  <a
                    href={application.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-1"
                  >
                    <FileText className="h-4 w-4" />
                    View CV
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {application.coverLetterLink && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Cover Letter</Label>
                      <a
                        href={application.coverLetterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-1"
                      >
                        <FileText className="h-4 w-4" />
                        View Cover Letter
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </>
                )}

                {application.credentialsLink && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Academic Credentials</Label>
                      <a
                        href={application.credentialsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-1"
                      >
                        <FileText className="h-4 w-4" />
                        View Credentials
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </>
                )}

                {application.achievementsLink && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Achievements/Awards</Label>
                      <a
                        href={application.achievementsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mt-1"
                      >
                        <Award className="h-4 w-4" />
                        View Achievements
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </>
                )}

                {application.additionalDocuments &&
                  Array.isArray(application.additionalDocuments) &&
                  application.additionalDocuments.filter((doc) => doc.label && doc.url).length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <Label className="font-semibold">Additional Documents</Label>
                        <div className="space-y-2 mt-2">
                          {application.additionalDocuments
                            .filter((doc) => doc.label && doc.url)
                            .map((doc, index) => (
                              <a
                                key={index}
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                              >
                                <FileText className="h-4 w-4" />
                                {doc.label}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                        </div>
                      </div>
                    </>
                  )}

                {application.additionalDetails && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Additional Details</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.additionalDetails}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium">{formatDate(application.submittedAt)}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Application ID</p>
                  <p className="font-mono text-xs">{application.applicationId}</p>
                </div>
              </CardContent>
            </Card>

            {/* Update Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Update Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add internal notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button onClick={handleUpdate} disabled={isSaving} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
