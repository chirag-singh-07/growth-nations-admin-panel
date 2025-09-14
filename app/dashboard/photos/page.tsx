"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhotosGrid } from "@/components/dashboard/photos-grid"
import { UploadPhotoModal } from "@/components/dashboard/upload-photo-modal"
import { Plus } from "lucide-react"

interface Photo {
  id: string
  url: string
  title: string
  uploadDate: string
  cloudinaryUrl: string
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "/serene-mountain-lake.png",
      title: "Beautiful Landscape",
      uploadDate: "2024-01-15",
      cloudinaryUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    },
    {
      id: "2",
      url: "/vibrant-city-skyline.png",
      title: "City Skyline",
      uploadDate: "2024-01-20",
      cloudinaryUrl: "https://res.cloudinary.com/demo/image/upload/sample2.jpg",
    },
    {
      id: "3",
      url: "/scenic-mountain-vista.png",
      title: "Mountain View",
      uploadDate: "2024-02-01",
      cloudinaryUrl: "https://res.cloudinary.com/demo/image/upload/sample3.jpg",
    },
    {
      id: "4",
      url: "/ocean-waves.png",
      title: "Ocean Waves",
      uploadDate: "2024-02-05",
      cloudinaryUrl: "https://res.cloudinary.com/demo/image/upload/sample4.jpg",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const handlePhotoUploaded = (newPhoto: Photo) => {
    setPhotos((prev) => [newPhoto, ...prev])
    setIsUploadModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Photos Gallery</h1>
          <p className="text-muted-foreground">Manage uploaded photos and images</p>
        </div>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload New Photo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
          <CardDescription>Total of {photos.length} photos uploaded</CardDescription>
        </CardHeader>
        <CardContent>
          <PhotosGrid photos={photos} loading={loading} />
        </CardContent>
      </Card>

      <UploadPhotoModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        onPhotoUploaded={handlePhotoUploaded}
      />
    </div>
  )
}
