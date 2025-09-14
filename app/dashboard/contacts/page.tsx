"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactsTable } from "@/components/dashboard/contacts-table"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  message: string
  submittedDate: string
  status: "new" | "read" | "replied"
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      message:
        "Hi, I'm interested in learning more about your growth strategies. Could you please provide more information about your services?",
      submittedDate: "2024-02-15T10:30:00Z",
      status: "new",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      message:
        "We're looking to scale our business and would like to discuss potential partnership opportunities. Please get in touch.",
      submittedDate: "2024-02-14T14:22:00Z",
      status: "read",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@startup.io",
      message:
        "Your recent article on digital transformation was excellent. I'd love to schedule a consultation to discuss how we can implement these strategies.",
      submittedDate: "2024-02-13T09:15:00Z",
      status: "replied",
    },
    {
      id: "4",
      name: "David Thompson",
      email: "d.thompson@business.com",
      message:
        "Can you provide pricing information for your consulting services? We're particularly interested in the team building workshops.",
      submittedDate: "2024-02-12T16:45:00Z",
      status: "new",
    },
    {
      id: "5",
      name: "Lisa Wang",
      email: "lisa.wang@tech.com",
      message:
        "I attended your webinar last week and found it very insightful. I have some follow-up questions about implementing growth metrics.",
      submittedDate: "2024-02-11T11:20:00Z",
      status: "read",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    try {
      setExporting(true)
      // Mock download for demo
      alert("Export functionality would download Excel file here")
    } catch (error) {
      console.error("Error exporting contacts:", error)
    } finally {
      setExporting(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    // Simulate refresh
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleStatusUpdate = (contactId: string, newStatus: Contact["status"]) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, status: newStatus } : contact)),
    )
  }

  const getStatusCounts = () => {
    if (!Array.isArray(contacts)) {
      return { new: 0, read: 0, replied: 0 }
    }

    const counts = contacts.reduce(
      (acc, contact) => {
        acc[contact.status]++
        return acc
      },
      { new: 0, read: 0, replied: 0 },
    )
    return counts
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Contact Forms</h1>
          <p className="text-muted-foreground">Manage submitted contact form messages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={handleExport} disabled={exporting}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <div className="h-2 w-2 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.new}</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Messages</CardTitle>
            <div className="h-2 w-2 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.read}</div>
            <p className="text-xs text-muted-foreground">Read but not replied</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Replied</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.replied}</div>
            <p className="text-xs text-muted-foreground">Completed messages</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>Total of {contacts.length} messages received</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactsTable contacts={contacts} loading={loading} onStatusUpdate={handleStatusUpdate} />
        </CardContent>
      </Card>
    </div>
  )
}
