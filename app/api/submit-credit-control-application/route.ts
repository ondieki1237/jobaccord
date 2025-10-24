import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

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
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate experience requirement (if provided)
    if (formData.yearsExperience === 'less-than-1') {
      return NextResponse.json(
        { error: "This position requires at least 1 year of experience" }, 
        { status: 400 }
      )
    }

    // Add eligibleToWork if not present (for compatibility)
    if (!formData.eligibleToWork) {
      formData.eligibleToWork = 'yes'
    }

    // Submit to backend server - use the regular applications endpoint
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.codewithseth.co.ke'
    
    const response = await fetch(`${backendUrl}/api/applications/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error || "Failed to submit application" 
        },
        { status: response.status }
      )
    }

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
    console.error("Error processing credit control application:", error)
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to process application. Please try again later." 
      },
      { status: 500 }
    )
  }
}
