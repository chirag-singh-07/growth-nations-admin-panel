import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersTable } from "@/components/dashboard/users-table";
import { fetchAllyUsers } from "@/lib/actions";
import ExportButton from "@/components/dashboard/export-button";

export default async function UsersPage() {
  const users = await fetchAllyUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Users Management</h1>
          <p className="text-muted-foreground">
            View and manage registered users
          </p>
        </div>
        {/* Export button (client component) */}
        <ExportButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
          <CardDescription>
            Total of {users.length} registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} loading={false} />
        </CardContent>
      </Card>
    </div>
  );
}
