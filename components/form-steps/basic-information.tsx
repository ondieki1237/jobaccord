"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "../job-application-form"

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function BasicInformation({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          placeholder="+254 700 000 000"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Current Location *</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => updateFormData({ location: e.target.value })}
          placeholder="City, Country"
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Are you legally eligible to work in Kenya? *</Label>
        <RadioGroup
          value={formData.eligibleToWork}
          onValueChange={(value) => updateFormData({ eligibleToWork: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="eligible-yes" />
            <Label htmlFor="eligible-yes" className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="eligible-no" />
            <Label htmlFor="eligible-no" className="font-normal cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
