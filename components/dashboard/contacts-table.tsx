"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { MoreHorizontal, Eye, Reply, Check } from "lucide-react"
import { useState } from "react"
import { ContactMessageModal } from "./contact-message-modal"

interface Contact {
  id: string
  name: string
  email: string
  message: string
  submittedDate: string
  status: "new" | "read" | "replied"
}

interface ContactsTableProps {
  contacts: Contact[]
  loading: boolean
  onStatusUpdate: (contactId: string, newStatus: Contact["status"]) => void
}

export function ContactsTable({ contacts, loading, onStatusUpdate }: ContactsTableProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: Contact["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">New</Badge>
      case "read":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Read</Badge>
      case "replied":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Replied</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleViewMessage = (contact: Contact) => {
    setSelectedContact(contact)
    if (contact.status === "new") {
      onStatusUpdate(contact.id, "read")
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message Preview</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No contact messages found
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={contact.id} className={contact.status === "new" ? "bg-blue-50/50" : ""}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate text-sm text-muted-foreground">{contact.message}</p>
                  </TableCell>
                  <TableCell className="text-sm">{formatDate(contact.submittedDate)}</TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewMessage(contact)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Message
                        </DropdownMenuItem>
                        {contact.status !== "replied" && (
                          <DropdownMenuItem onClick={() => onStatusUpdate(contact.id, "replied")}>
                            <Reply className="mr-2 h-4 w-4" />
                            Mark as Replied
                          </DropdownMenuItem>
                        )}
                        {contact.status === "new" && (
                          <DropdownMenuItem onClick={() => onStatusUpdate(contact.id, "read")}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ContactMessageModal
        contact={selectedContact}
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
        onStatusUpdate={onStatusUpdate}
      />
    </>
  )
}
