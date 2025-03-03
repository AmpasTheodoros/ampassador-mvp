"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface Integration {
  id: string;
  name: string;
  description: string;
}

export default function IntegrationsPage() {
  const { getToken } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIntegrations = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/integrations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
      const data = await res.json();
      setIntegrations(data.integrations || []);
    } catch (err: any) {
      console.error("Error fetching integrations:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, [getToken]);

  if (loading) return <p>Loading integrations...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (integrations.length === 0)
    return <p>No integrations available at this time.</p>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Pre-Built Integrations</h1>
      <p className="mb-6">
        Select and authorize the integrations you use. Start with common tools like AWS and Google Workspace.
      </p>
      <ul className="space-y-4">
        {integrations.map((integration) => (
          <li key={integration.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{integration.name}</h2>
            <p>{integration.description}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
              Connect
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
