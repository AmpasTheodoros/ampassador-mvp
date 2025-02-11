// app/reports/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function ReportsPage() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        setError(`Error ${res.status}: ${errorText}`);
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compliance-report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      console.error("Error generating report:", err);
      setError("Error generating report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Generate Report</h1>
      <button
        onClick={generateReport}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
