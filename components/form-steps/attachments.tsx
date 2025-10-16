"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { FormData } from "../job-application-form"
import { FileText, Award, Plus, X } from "lucide-react"

interface Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function Attachments({ formData, updateFormData }: Props) {
  const handleAddDocumentLink = () => {
    updateFormData({
      additionalDocuments: [...formData.additionalDocuments, { label: "", url: "" }],
    })
  }

  const handleRemoveDocumentLink = (index: number) => {
    const updated = formData.additionalDocuments.filter((_, i) => i !== index)
    updateFormData({ additionalDocuments: updated })
  }

  const handleDocumentLinkChange = (index: number, field: "label" | "url", value: string) => {
    const updated = [...formData.additionalDocuments]
    updated[index][field] = value
    updateFormData({ additionalDocuments: updated })
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900">
          Please provide links to your documents (e.g., Google Drive, Dropbox, OneDrive). Make sure the links are
          publicly accessible or set to "Anyone with the link can view".
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cvLink" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          CV/Resume Link *
        </Label>
        <Input
          id="cvLink"
          type="url"
          value={formData.cvLink}
          onChange={(e) => updateFormData({ cvLink: e.target.value })}
          placeholder="https://drive.google.com/file/..."
          required
        />
        <p className="text-xs text-muted-foreground">
          Upload your CV to a cloud storage service and paste the shareable link here
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="achievementsLink" className="flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" />
          Proof of Leadership or Sales Achievements Link (Optional)
        </Label>
        <Input
          id="achievementsLink"
          type="url"
          value={formData.achievementsLink}
          onChange={(e) => updateFormData({ achievementsLink: e.target.value })}
          placeholder="https://drive.google.com/file/..."
        />
        <p className="text-xs text-muted-foreground">
          Awards, performance certificates, letters of recommendation, or screenshots of achievements
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalDetails">Additional Relevant Details (Optional)</Label>
        <Textarea
          id="additionalDetails"
          value={formData.additionalDetails}
          onChange={(e) => updateFormData({ additionalDetails: e.target.value })}
          placeholder="Share any other relevant information about your qualifications, certifications, or achievements..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          Include any other information that would strengthen your application
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Additional Documents (Optional)</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleAddDocumentLink}>
            <Plus className="h-4 w-4 mr-1" />
            Add Document
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Add links to any other relevant documents (certifications, transcripts, portfolios, etc.)
        </p>

        <div className="space-y-4">
          {formData.additionalDocuments.map((doc, index) => (
            <div key={index} className="flex gap-2 items-start p-4 border rounded-lg bg-muted/30">
              <div className="flex-1 space-y-3">
                <Input
                  type="text"
                  value={doc.label}
                  onChange={(e) => handleDocumentLinkChange(index, "label", e.target.value)}
                  placeholder="Document name (e.g., Bachelor's Degree Certificate)"
                  className="bg-background"
                />
                <Input
                  type="url"
                  value={doc.url}
                  onChange={(e) => handleDocumentLinkChange(index, "url", e.target.value)}
                  placeholder="https://drive.google.com/file/..."
                  className="bg-background"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveDocumentLink(index)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
