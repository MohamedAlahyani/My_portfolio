"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, User, FolderDot, Info, ImageIcon, Code, Briefcase, TestTube, Sparkles } from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "About Me", href: "/dashboard/about", icon: User },
    { title: "Projects", href: "/dashboard/projects", icon: FolderDot },
    { title: "Skills", href: "/dashboard/skills", icon: Code },
    { title: "Experience", href: "/dashboard/experience", icon: Briefcase },
    { title: "Hero Section", href: "/dashboard/hero", icon: Sparkles },
    { title: "Contact Info", href: "/dashboard/contact", icon: Info },
    { title: "Media Gallery", href: "/dashboard/images", icon: ImageIcon },
    { title: "Test Suite", href: "/dashboard/test", icon: TestTube },
  ]

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
