"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Send, BarChart3 } from "lucide-react"
import { toast } from "sonner"

interface AIResponse {
  success: boolean
  response?: string
  metadata?: {
    totalApplications: number
    salesApplications: number
    creditControlApplications: number
    timestamp: string
  }
  error?: string
}

interface Statistics {
  sales: {
    total: number
    pending: number
    reviewed: number
    shortlisted: number
    rejected: number
    hired: number
    withDegree: number
    withSupervisionExp: number
    averageCRM: number
  }
  creditControl: {
    total: number
    pending: number
    reviewed: number
    shortlisted: number
    rejected: number
    hired: number
    withBachelors: number
    averageExcel: number
  }
  overall: {
    total: number
    pending: number
    reviewed: number
    shortlisted: number
    rejected: number
    hired: number
  }
}

export default function AIAssistant({ token }: { token: string }) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<AIResponse["metadata"] | null>(null)
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [showStats, setShowStats] = useState(false)

  const exampleQuestions = [
    "Who has the best experience for the Sales Supervisor role?",
    "Compare the top 3 candidates for Credit Control Officer",
    "Which candidates have both a degree and supervisory experience?",
    "Who has the highest CRM proficiency?",
    "Which Credit Control candidates have the most debt collection experience?",
    "Recommend the top 5 candidates based on qualifications",
  ]

  const handleAnalyze = async () => {
    if (!query.trim()) {
      toast.error("Please enter a question")
      return
    }

    setIsLoading(true)
    setResponse(null)
    setMetadata(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const res = await fetch(`${apiUrl}/api/ai/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      })

      const data: AIResponse = await res.json()

      if (data.success && data.response) {
        setResponse(data.response)
        setMetadata(data.metadata || null)
        toast.success("Analysis complete")
      } else {
        toast.error(data.error || "Failed to analyze")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to analyze applications")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStatistics = async () => {
    setShowStats(true)
    if (statistics) return // Already loaded

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.codewithseth.co.ke"
      const res = await fetch(`${apiUrl}/api/ai/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (data.success) {
        setStatistics(data.data)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to fetch statistics")
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Application Analyzer
          </CardTitle>
          <CardDescription>
            Ask questions about candidates and get intelligent insights powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Query Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ask a question</label>
            <Textarea
              placeholder="e.g., Who has the best experience for the Sales Supervisor role?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Example Questions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Example questions:</label>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(q)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <Button onClick={handleAnalyze} disabled={isLoading || !query.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Analyze
              </>
            )}
          </Button>

          {/* AI Response */}
          {response && (
            <Alert className="border-purple-200 bg-purple-50">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <AlertDescription className="mt-2">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm">{response}</div>
                </div>
                {metadata && (
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">
                      Total: {metadata.totalApplications}
                    </Badge>
                    <Badge variant="secondary">
                      Sales: {metadata.salesApplications}
                    </Badge>
                    <Badge variant="secondary">
                      Credit Control: {metadata.creditControlApplications}
                    </Badge>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Application Statistics
          </CardTitle>
          <CardDescription>Overview of all applications in the database</CardDescription>
        </CardHeader>
        <CardContent>
          {!showStats ? (
            <Button onClick={fetchStatistics} variant="outline" className="w-full">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Statistics
            </Button>
          ) : statistics ? (
            <div className="space-y-6">
              {/* Overall Stats */}
              <div>
                <h3 className="font-semibold mb-3">Overall</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{statistics.overall.total}</div>
                    <div className="text-xs text-muted-foreground">Total Applications</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">{statistics.overall.pending}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">{statistics.overall.shortlisted}</div>
                    <div className="text-xs text-muted-foreground">Shortlisted</div>
                  </div>
                </div>
              </div>

              {/* Sales Stats */}
              <div>
                <h3 className="font-semibold mb-3">Technical Sales Supervisor</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.sales.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.sales.withDegree}</div>
                    <div className="text-xs text-muted-foreground">With Degree</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.sales.withSupervisionExp}</div>
                    <div className="text-xs text-muted-foreground">Supervision Exp</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.sales.averageCRM.toFixed(1)}/5</div>
                    <div className="text-xs text-muted-foreground">Avg CRM Score</div>
                  </div>
                </div>
              </div>

              {/* Credit Control Stats */}
              <div>
                <h3 className="font-semibold mb-3">Credit Control Officer</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.creditControl.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.creditControl.withBachelors}</div>
                    <div className="text-xs text-muted-foreground">With Bachelors</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.creditControl.averageExcel.toFixed(1)}/5</div>
                    <div className="text-xs text-muted-foreground">Avg Excel Score</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xl font-bold">{statistics.creditControl.shortlisted}</div>
                    <div className="text-xs text-muted-foreground">Shortlisted</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
