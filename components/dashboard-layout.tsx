"use client"

import type React from "react"

import { useState } from "react"
import { DashboardNav } from "./dashboard-nav"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform border-r border-slate-800 bg-slate-900 transition-transform duration-200 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CMS</span>
              </div>
              <h2 className="text-lg font-semibold text-white">Portfolio CMS</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <DashboardNav />
          </div>

          {/* Footer */}
          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Portfolio CMS Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Mobile header */}
        <header className="flex h-16 items-center border-b border-slate-800 bg-slate-900 px-4 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold text-white">Portfolio CMS</h1>
        </header>

        {/* Page content */}
        <main className="p-6 text-white">{children}</main>
      </div>
    </div>
  )
}
