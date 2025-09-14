"use client"

import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main> {/* responsive padding */}
        </div>
      </div>
    </AuthGuard>
  )
}
