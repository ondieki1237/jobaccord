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
} from "lucide-react"
import { toast } from "sonner"

interface Application {
  _id: string
  applicationId: string
  fullName: string
  email: string
  phone: string
  location: string
  eligibleToWork: string
  hasDegree: string
  degreeDetails: string
  yearsExperience: string
  hasSupervised: string
  leadershipDescription: string
  equipmentExperience: string
  majorSaleDescription: string
  strengths: string[]
  crmProficiency: string
  trainingExample: string
  motivation: string
  hadSalesTarget: string
  targetPerformance: string
  teamMotivation: string
  leadershipStyle: string
  challenges: string
  difficultClients: string
  crossDepartment: string
  whyJoin: string
  availableStart: string
  cvLink: string
  achievementsLink: string
  additionalDetails: string
  additionalDocuments: Array<{ label: string; url: string }>
  status: string
  submittedAt: string
  notes?: string
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/applications/${id}`, {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/applications/${id}`, {
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
              <p className="text-muted-foreground font-mono text-sm">{application.applicationId}</p>
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
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Eligible to Work in Kenya</p>
                    <p className="text-sm">{application.eligibleToWork === "yes" ? "✅ Yes" : "❌ No"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Available to Start</p>
                    <p className="text-sm">{application.availableStart || "Not specified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience & Background */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Experience & Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div>
                  <Label className="font-semibold">Years of Experience</Label>
                  <p className="text-sm mt-1 capitalize">{application.yearsExperience?.replace("-", " to ") || "Not specified"}</p>
                </div>

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
              </CardContent>
            </Card>

            {/* Skills & Competencies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Skills & Competencies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <Separator />

                <div>
                  <Label className="font-semibold">CRM Proficiency</Label>
                  <p className="text-sm mt-1">
                    {application.crmProficiency}/5 - {parseInt(application.crmProficiency) >= 4 ? "Expert" : parseInt(application.crmProficiency) >= 3 ? "Intermediate" : "Beginner"}
                  </p>
                </div>

                {application.trainingExample && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Training/Mentoring Experience</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.trainingExample}</p>
                    </div>
                  </>
                )}

                {application.motivation && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Motivation for Biomedical Sales</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.motivation}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Results & Leadership */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Results & Leadership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-semibold">Sales Target Experience</Label>
                  <p className="text-sm mt-1">
                    {application.hadSalesTarget === "yes" ? "✅ Has worked with sales targets" : "❌ No sales target experience"}
                  </p>
                  {application.targetPerformance && (
                    <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.targetPerformance}</p>
                  )}
                </div>

                {application.teamMotivation && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Team Motivation Approach</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.teamMotivation}</p>
                    </div>
                  </>
                )}

                {application.leadershipStyle && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Leadership Style</Label>
                      <p className="text-sm mt-1">{application.leadershipStyle}</p>
                    </div>
                  </>
                )}

                {application.challenges && (
                  <>
                    <Separator />
                    <div>
                      <Label className="font-semibold">Industry Challenges Insight</Label>
                      <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{application.challenges}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Culture & Fit */}
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
                      <Label className="font-semibold">Cross-Departmental Collaboration</Label>
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

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents & Attachments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this application..."
                    rows={4}
                  />
                </div>

                <Button onClick={handleUpdate} disabled={isSaving} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href={`mailto:${application.email}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </a>
                <a href={`tel:${application.phone}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Applicant
                  </Button>
                </a>
                <a href={application.cvLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
