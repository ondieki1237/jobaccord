"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "../job-application-form"

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function ResultsLeadership({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Have you ever been assigned a sales target? *</Label>
        <RadioGroup
          value={formData.hadSalesTarget}
          onValueChange={(value) => updateFormData({ hadSalesTarget: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="target-yes" />
            <Label htmlFor="target-yes" className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="target-no" />
            <Label htmlFor="target-no" className="font-normal cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetPerformance">
          If yes, what was your annual or quarterly target, and how did you perform against it?
        </Label>
        <Textarea
          id="targetPerformance"
          value={formData.targetPerformance}
          onChange={(e) => updateFormData({ targetPerformance: e.target.value })}
          placeholder="Describe your targets and achievements..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teamMotivation">
          How do you ensure your team stays motivated and aligned with company goals? *
        </Label>
        <Textarea
          id="teamMotivation"
          value={formData.teamMotivation}
          onChange={(e) => updateFormData({ teamMotivation: e.target.value })}
          placeholder="Share your team motivation strategies..."
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="leadershipStyle">Describe your leadership style in three words *</Label>
        <Input
          id="leadershipStyle"
          value={formData.leadershipStyle}
          onChange={(e) => updateFormData({ leadershipStyle: e.target.value })}
          placeholder="e.g., Collaborative, Results-driven, Supportive"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges">
          What do you believe are the biggest challenges facing biomedical sales in Kenya today? *
        </Label>
        <Textarea
          id="challenges"
          value={formData.challenges}
          onChange={(e) => updateFormData({ challenges: e.target.value })}
          placeholder="Share your industry insights..."
          rows={5}
        />
      </div>
    </div>
  )
}
