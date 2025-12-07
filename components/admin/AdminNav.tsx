"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, LogOut, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminNav() {
  const pathname = usePathname()
  const { admin, logout } = useAuth()

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/applications",
      label: "Applications",
      icon: FileText,
    },
    {
      href: "/admin/ai-assistant",
      label: "AI Assistant",
      icon: Sparkles,
    },
  ]

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Nav Items */}
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard">
              <Image src="/logoaccord.png" alt="Accord Medical" width={150} height={45} className="w-auto h-10" />
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn("gap-2", isActive && "bg-primary text-primary-foreground")}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            {admin && (
              <div className="hidden md:flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{admin.email}</span>
              </div>
            )}
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex gap-2 pb-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn("w-full gap-2", isActive && "bg-primary text-primary-foreground")}
                  size="sm"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
