"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function CompanyInfo() {
  const { getToken } = useAuth();
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [aiProductType, setAiProductType] = useState("");
  const [complianceFrameworks, setComplianceFrameworks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/company-info`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, aiProductType, complianceFrameworks }),
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }
      // On success, redirect to the integrations page
      router.push("/integrations");
    } catch (err: unknown) {
      console.error("Error updating company info:", err);
      setError(err instanceof Error ? err.message : "Error creating compliance plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Company Information</h1>
      <p className="mb-4">
        Please provide basic information about your company to help us generate
        a relevant compliance checklist and templates.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Type of AI Product</label>
          <input
            type="text"
            value={aiProductType}
            onChange={(e) => setAiProductType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Main Compliance Frameworks Needed</label>
          <input
            type="text"
            value={complianceFrameworks}
            onChange={(e) => setComplianceFrameworks(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., GDPR, HIPAA, AI Act"
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Next: Set Up Integrations"}
        </button>
      </form>
    </div>
  );
}
