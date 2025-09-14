"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface Photo {
  id: string
  url: string
  title: string
  uploadDate: string
  cloudinaryUrl: string
}

interface PhotosGridProps {
  photos: Photo[]
  loading: boolean
}

export function PhotosGrid({ photos, loading }: PhotosGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!Array.isArray(photos) || photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No photos uploaded yet</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image src={photo.url || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-2 line-clamp-2">{photo.title}</h3>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {formatDate(photo.uploadDate)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
