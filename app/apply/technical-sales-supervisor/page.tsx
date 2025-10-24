"use client"

import { useRouter } from "next/navigation"
import JobApplicationForm from "@/components/job-application-form"

export default function TechnicalSalesApplicationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <JobApplicationForm 
        jobId="technical-sales-supervisor" 
        jobTitle="Technical Sales Supervisor" 
      />
    </main>
  )
}
