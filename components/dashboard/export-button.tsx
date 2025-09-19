"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { fetchExportLeads } from "@/lib/actions";

export default function ExportButton() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);

      const blob = await fetchExportLeads();

      // Create a temporary URL and download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leads.xlsx"; // file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting users:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={exporting}>
      <Download className="mr-2 h-4 w-4" />
      {exporting ? "Exporting..." : "Export to Excel"}
    </Button>
  );
}
