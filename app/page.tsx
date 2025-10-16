import JobApplicationForm from "@/components/job-application-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <JobApplicationForm />
      <Footer />
    </main>
  )
}
