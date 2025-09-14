import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "active",
    joinedAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "inactive",
    joinedAt: "2024-01-13",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "active",
    joinedAt: "2024-01-12",
  },
  {
    id: 5,
    name: "Alex Brown",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "pending",
    joinedAt: "2024-01-11",
  },
]

export function RecentUsersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={user.status === "active" ? "default" : user.status === "inactive" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {user.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{user.joinedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
