"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VideosList } from "@/components/dashboard/videos-list"
import { AddVideoModal } from "@/components/dashboard/add-video-modal"
import { Plus } from "lucide-react"

interface Video {
  id: string
  title: string
  youtubeUrl: string
  videoId: string
  addedDate: string
  description?: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Growth Strategies for Modern Businesses",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ",
      addedDate: "2024-01-15",
      description: "Learn effective growth strategies for scaling your business in today's market.",
    },
    {
      id: "2",
      title: "Digital Marketing Fundamentals",
      youtubeUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      videoId: "oHg5SJYRHA0",
      addedDate: "2024-01-20",
      description: "Master the basics of digital marketing and online presence.",
    },
    {
      id: "3",
      title: "Building Strong Teams",
      youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      videoId: "9bZkp7q19f0",
      addedDate: "2024-02-01",
      description: "Discover how to build and maintain high-performing teams.",
    },
  ])
  const [loading, setLoading] = useState(false) // Set to false since we have data immediately
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleVideoAdded = (newVideo: Video) => {
    setVideos((prev) => [newVideo, ...prev])
    setIsAddModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">YouTube Links</h1>
          <p className="text-muted-foreground">Manage YouTube video links and embeds</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Video
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Collection</CardTitle>
          <CardDescription>Total of {videos.length} videos added</CardDescription>
        </CardHeader>
        <CardContent>
          <VideosList videos={videos} loading={loading} />
        </CardContent>
      </Card>

      <AddVideoModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onVideoAdded={handleVideoAdded} />
    </div>
  )
}
