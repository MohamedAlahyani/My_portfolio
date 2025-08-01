"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-semibold text-xl text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Portfolio Management</p>
        </div>

        <nav className="flex-1 py-6 px-4">
          <SidebarNav />
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">SA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">admin@example.com</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-gray-900">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h1 className="font-semibold text-xl text-gray-900">Admin Panel</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="text-slate-600 hover:text-slate-800 hover:bg-white/20 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 py-6 px-4">
                <SidebarNav />
              </nav>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">SA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">Admin User</div>
                    <div className="text-xs text-gray-500">admin@example.com</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-gray-900">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
              <p className="text-gray-600 text-sm mt-1">Manage your portfolio content</p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
