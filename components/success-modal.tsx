"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Globe, Facebook } from "lucide-react"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SuccessModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">Application Submitted Successfully!</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Thank you for applying to Accord Medical Supplies Ltd. We have received your application and will review it
            carefully. Our team will be in touch soon.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="text-center">
            <p className="text-sm font-medium mb-3">Stay connected with us:</p>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a href="https://accordmedical.co.ke/" target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Visit Our Website
              </a>
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a href="https://www.facebook.com/AccordMedKe" target="_blank" rel="noopener noreferrer">
                <Facebook className="mr-2 h-4 w-4" />
                Follow us on Facebook
              </a>
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a
                href="https://www.tiktok.com/@accordmedicalke?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                Follow us on TikTok
              </a>
            </Button>

            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <a href="https://x.com/AccordMedKe" target="_blank" rel="noopener noreferrer">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow us on X (Twitter)
              </a>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
