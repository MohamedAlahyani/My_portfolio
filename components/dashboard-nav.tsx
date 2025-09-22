"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, User, Code, Briefcase, GraduationCap, Mail } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/Dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
  },
  {
    title: "About Me",
    href: "/Dashboard/about",
    icon: User,
    description: "Personal Information",
  },
  {
    title: "My Skills",
    href: "/Dashboard/skills",
    icon: Code,
    description: "Technical Proficiencies",
  },
  {
    title: "Featured Projects",
    href: "/Dashboard/project",
    icon: Briefcase,
    description: "Portfolio Showcase",
  },
  {
    title: "Education",
    href: "/Dashboard/education",
    icon: GraduationCap,
    description: "Academic Timeline",
  },
  {
    title: "Get In Touch",
    href: "/Dashboard/contact",
    icon: Mail,
    description: "Contact Information",
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2 px-3">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex flex-col space-y-1 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-slate-800",
              isActive
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:text-white border border-transparent",
            )}
          >
            <div className="flex items-center space-x-3">
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? "text-purple-400" : "text-slate-500 group-hover:text-slate-300",
                )}
              />
              <span className="font-medium">{item.title}</span>
            </div>
            <span
              className={cn(
                "text-xs ml-7 transition-colors",
                isActive ? "text-purple-300" : "text-slate-500 group-hover:text-slate-400",
              )}
            >
              {item.description}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
