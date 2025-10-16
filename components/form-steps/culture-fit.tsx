"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { FormData } from "../job-application-form"

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function CultureFit({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="difficultClients">How do you handle difficult clients or service complaints? *</Label>
        <Textarea
          id="difficultClients"
          value={formData.difficultClients}
          onChange={(e) => updateFormData({ difficultClients: e.target.value })}
          placeholder="Describe your approach to challenging situations..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="crossDepartment">
          Describe a time you worked across departments (e.g., with logistics, service, or finance) to close a deal or
          solve a problem *
        </Label>
        <Textarea
          id="crossDepartment"
          value={formData.crossDepartment}
          onChange={(e) => updateFormData({ crossDepartment: e.target.value })}
          placeholder="Share your cross-functional collaboration experience..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whyJoin">
          Why do you want to join our company, and what do you think you can contribute? *
        </Label>
        <Textarea
          id="whyJoin"
          value={formData.whyJoin}
          onChange={(e) => updateFormData({ whyJoin: e.target.value })}
          placeholder="Tell us why you're interested in Accord Medical..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="availableStart">When are you available to start if selected? *</Label>
        <Input
          id="availableStart"
          type="date"
          value={formData.availableStart}
          onChange={(e) => updateFormData({ availableStart: e.target.value })}
        />
      </div>
    </div>
  )
}
