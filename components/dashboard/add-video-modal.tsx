"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import axios from "axios"

interface Video {
  id: string
  title: string
  youtubeUrl: string
  videoId: string
  addedDate: string
  description?: string
}

interface AddVideoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVideoAdded: (video: Video) => void
}

export function AddVideoModal({ open, onOpenChange, onVideoAdded }: AddVideoModalProps) {
  const [title, setTitle] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [description, setDescription] = useState("")
  const [adding, setAdding] = useState(false)

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !youtubeUrl.trim()) {
      alert("Please fill in the required fields")
      return
    }

    const videoId = extractVideoId(youtubeUrl.trim())
    if (!videoId) {
      alert("Please enter a valid YouTube URL")
      return
    }

    try {
      setAdding(true)

      const response = await axios.post("/api/videos", {
        title: title.trim(),
        youtubeUrl: youtubeUrl.trim(),
        description: description.trim() || undefined,
      })

      onVideoAdded(response.data)

      // Reset form
      setTitle("")
      setYoutubeUrl("")
      setDescription("")
    } catch (error) {
      console.error("Error adding video:", error)

      // Mock success for demo
      const newVideo: Video = {
        id: Date.now().toString(),
        title: title.trim(),
        youtubeUrl: youtubeUrl.trim(),
        videoId,
        addedDate: new Date().toISOString().split("T")[0],
        description: description.trim() || undefined,
      }

      onVideoAdded(newVideo)

      // Reset form
      setTitle("")
      setYoutubeUrl("")
      setDescription("")
    } finally {
      setAdding(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Video</DialogTitle>
          <DialogDescription>Add a YouTube video link to the collection.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Video Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="youtubeUrl">YouTube URL *</Label>
              <Input
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the video content"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={adding}>
              <Plus className="mr-2 h-4 w-4" />
              {adding ? "Adding..." : "Add Video"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
