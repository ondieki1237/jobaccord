import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    console.log('📝 Credit Control Application received:', {
      fullName: formData.fullName,
      email: formData.email,
      jobId: formData.jobId,
      jobTitle: formData.jobTitle
    })

    // Validate required fields for Credit Control Officer
    const requiredFields = [
      "fullName", 
      "email", 
      "phone", 
      "location",
      "cvLink",
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        console.error(`❌ Missing required field: ${field}`)
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      console.error('❌ Invalid email format:', formData.email)
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate experience requirement (if provided)
    if (formData.yearsExperience === 'less-than-1') {
      console.error('❌ Insufficient experience')
      return NextResponse.json(
        { error: "This position requires at least 1 year of experience" }, 
        { status: 400 }
      )
    }

    // Add eligibleToWork if not present (for compatibility)
    if (!formData.eligibleToWork) {
      formData.eligibleToWork = 'yes'
    }

    // Submit to backend server - use separate credit control endpoint
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.codewithseth.co.ke'
    
    console.log('🚀 Submitting to backend:', `${backendUrl}/api/credit-control-applications/submit`)

    const response = await fetch(`${backendUrl}/api/credit-control-applications/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    console.log('📥 Backend response:', {
      status: response.status,
      ok: response.ok,
      success: result.success,
      message: result.message,
      error: result.error
    })

    if (!response.ok) {
      console.error('❌ Backend error:', result)
      return NextResponse.json(
        { 
          success: false,
          error: result.error || result.details || "Failed to submit application" 
        },
        { status: response.status }
      )
    }

    console.log('✅ Application submitted successfully')
    return NextResponse.json(
      {
        success: true,
        message: result.message || "Application submitted successfully",
        applicationId: result.data?.applicationId,
        emailSent: result.data?.emailSent,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("❌ Error processing credit control application:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Failed to process application. Please try again later." 
      },
      { status: 500 }
    )
  }
}
