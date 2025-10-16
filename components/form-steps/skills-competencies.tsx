"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { FormData } from "../job-application-form"

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

const STRENGTH_OPTIONS = [
  "Sales strategy & negotiation",
  "Product demonstrations",
  "Client relationship management",
  "Team leadership",
  "Market research & competitor analysis",
  "Tender preparation",
]

export default function SkillsCompetencies({ formData, updateFormData }: Props) {
  const handleStrengthToggle = (strength: string) => {
    const current = formData.strengths || []
    const updated = current.includes(strength) ? current.filter((s) => s !== strength) : [...current, strength]
    updateFormData({ strengths: updated })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Which of the following skills best describe your strengths? (Select all that apply) *</Label>
        <div className="space-y-3">
          {STRENGTH_OPTIONS.map((strength) => (
            <div key={strength} className="flex items-center space-x-2">
              <Checkbox
                id={strength}
                checked={formData.strengths.includes(strength)}
                onCheckedChange={() => handleStrengthToggle(strength)}
              />
              <Label htmlFor={strength} className="font-normal cursor-pointer">
                {strength}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="crmProficiency">
          Rate your proficiency in using CRM systems (e.g., Salesforce, HubSpot, Zoho) *
        </Label>
        <div className="space-y-2">
          <Slider
            id="crmProficiency"
            min={1}
            max={5}
            step={1}
            value={[Number.parseInt(formData.crmProficiency) || 3]}
            onValueChange={(value) => updateFormData({ crmProficiency: value[0].toString() })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 - Beginner</span>
            <span className="font-medium text-foreground">{formData.crmProficiency} / 5</span>
            <span>5 - Expert</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingExample">
          Describe a time you trained or motivated a team member to improve their performance *
        </Label>
        <Textarea
          id="trainingExample"
          value={formData.trainingExample}
          onChange={(e) => updateFormData({ trainingExample: e.target.value })}
          placeholder="Share your mentoring experience..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">What motivates you most about working in biomedical sales? *</Label>
        <Textarea
          id="motivation"
          value={formData.motivation}
          onChange={(e) => updateFormData({ motivation: e.target.value })}
          placeholder="Tell us what drives you..."
          rows={5}
        />
      </div>
    </div>
  )
}
