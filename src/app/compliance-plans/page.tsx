// app/compliance-plans/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface CompliancePlan {
  id?: string;  // Optional since it might be assigned by the backend
  industry: string;
  tasks: {
    description: string;
    completed: boolean;
  }[];
}

export default function CompliancePlansPage() {
  const { getToken } = useAuth();
  const [plan, setPlan] = useState<CompliancePlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const payload = {
        industry: "AI",
        tasks: [
          { description: "Review AI Act compliance", completed: false },
          { description: "Assess bias in models", completed: false },
        ],
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compliance-plans`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setError(`Error ${res.status}: ${errorText}`);
        return;
      }

      const data = await res.json();
      setPlan(data.compliancePlan);
    } catch (err: unknown) {
      console.error("Error creating compliance plan:", err);
      setError(err instanceof Error ? err.message : "Error creating compliance plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Compliance Plans</h1>
      <button
        onClick={createPlan}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {loading ? "Creating Plan..." : "Create Compliance Plan"}
      </button>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {plan && (
        <div className="mt-4">
          <h2 className="text-xl">Plan Details:</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(plan, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
