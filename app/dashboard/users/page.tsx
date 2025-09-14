"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersTable } from "@/components/dashboard/users-table";
import { Download } from "lucide-react";
import { fetchAllyUsers } from "@/lib/actions";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
}

export default async function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      registrationDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1987654321",
      registrationDate: "2024-01-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1122334455",
      registrationDate: "2024-02-01",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1555666777",
      registrationDate: "2024-02-10",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david@example.com",
      phone: "+1888999000",
      registrationDate: "2024-02-15",
    },
  ])
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  // const users = await fetchAllyUsers();

  useEffect(() => {
    // Simulate loading state briefly
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleExport = async () => {
    try {
      setExporting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Export functionality would download Excel file here");
    } catch (error) {
      console.error("Error exporting users:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Users Management</h1>
          <p className="text-muted-foreground">
            View and manage registered users
          </p>
        </div>
        <Button onClick={handleExport} disabled={exporting}>
          <Download className="mr-2 h-4 w-4" />
          {exporting ? "Exporting..." : "Export to Excel"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
          <CardDescription>
            Total of {users.length} registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
