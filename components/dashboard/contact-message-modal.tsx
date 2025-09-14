"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Reply, Check } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  message: string
  submittedDate: string
  status: "new" | "read" | "replied"
}

interface ContactMessageModalProps {
  contact: Contact | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusUpdate: (contactId: string, newStatus: Contact["status"]) => void
}

export function ContactMessageModal({ contact, open, onOpenChange, onStatusUpdate }: ContactMessageModalProps) {
  if (!contact) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

  const handleReply = () => {
    // Open email client with pre-filled reply
    const subject = `Re: Your message to Growth Nations`
    const body = `Hi ${contact.name},\n\nThank you for your message. \n\n---\nOriginal message:\n${contact.message}`
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl)
    onStatusUpdate(contact.id, "replied")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Contact Message</DialogTitle>
            {getStatusBadge(contact.status)}
          </div>
          <DialogDescription>Message details and actions</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">From</h4>
              <p className="text-sm font-medium">{contact.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
              <p className="text-sm">{contact.email}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Submitted</h4>
            <p className="text-sm">{formatDate(contact.submittedDate)}</p>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Message</h4>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {contact.status !== "replied" && (
            <>
              {contact.status === "new" && (
                <Button variant="outline" onClick={() => onStatusUpdate(contact.id, "read")}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Read
                </Button>
              )}
              <Button onClick={handleReply}>
                <Reply className="mr-2 h-4 w-4" />
                Reply via Email
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
