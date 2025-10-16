import Image from "next/image"
import { Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/logoaccord.png" alt="Accord Medical" width={150} height={45} className="w-auto h-10" />
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://accordmedical.co.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              accordmedical.co.ke
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/AccordMedKe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/AccordMedKe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter/X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@accordmedicalke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
