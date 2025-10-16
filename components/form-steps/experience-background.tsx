"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "../job-application-form"

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function ExperienceBackground({ formData, updateFormData }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Do you hold a degree in Biomedical Engineering or a related field? *</Label>
        <RadioGroup value={formData.hasDegree} onValueChange={(value) => updateFormData({ hasDegree: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="degree-yes" />
            <Label htmlFor="degree-yes" className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="degree-no" />
            <Label htmlFor="degree-no" className="font-normal cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="degreeDetails">Please specify your degree and the institution where you studied *</Label>
        <Textarea
          id="degreeDetails"
          value={formData.degreeDetails}
          onChange={(e) => updateFormData({ degreeDetails: e.target.value })}
          placeholder="e.g., Bachelor of Science in Biomedical Engineering, University of Nairobi"
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <Label>How many years of experience do you have as a Technical Sales Engineer? *</Label>
        <RadioGroup
          value={formData.yearsExperience}
          onValueChange={(value) => updateFormData({ yearsExperience: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="less-than-1" id="exp-1" />
            <Label htmlFor="exp-1" className="font-normal cursor-pointer">
              Less than 1 year
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-2" id="exp-2" />
            <Label htmlFor="exp-2" className="font-normal cursor-pointer">
              1-2 years
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2-3" id="exp-3" />
            <Label htmlFor="exp-3" className="font-normal cursor-pointer">
              2-3 years
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="over-3" id="exp-4" />
            <Label htmlFor="exp-4" className="font-normal cursor-pointer">
              Over 3 years
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Have you ever supervised or led a sales or technical team? *</Label>
        <RadioGroup value={formData.hasSupervised} onValueChange={(value) => updateFormData({ hasSupervised: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="supervised-yes" />
            <Label htmlFor="supervised-yes" className="font-normal cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="supervised-no" />
            <Label htmlFor="supervised-no" className="font-normal cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="leadershipDescription">
          If yes, please describe your leadership responsibilities and team size
        </Label>
        <Textarea
          id="leadershipDescription"
          value={formData.leadershipDescription}
          onChange={(e) => updateFormData({ leadershipDescription: e.target.value })}
          placeholder="Describe your leadership experience..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="equipmentExperience">
          List the types of biomedical or medical equipment you have experience selling *
        </Label>
        <Textarea
          id="equipmentExperience"
          value={formData.equipmentExperience}
          onChange={(e) => updateFormData({ equipmentExperience: e.target.value })}
          placeholder="e.g., Patient monitors, ultrasound machines, laboratory equipment..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="majorSaleDescription">
          Describe one major sale or project you successfully closed — what made it successful? *
        </Label>
        <Textarea
          id="majorSaleDescription"
          value={formData.majorSaleDescription}
          onChange={(e) => updateFormData({ majorSaleDescription: e.target.value })}
          placeholder="Share your success story..."
          rows={5}
        />
      </div>
    </div>
  )
}
