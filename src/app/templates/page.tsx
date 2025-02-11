// app/templates/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Template = {
  id: string;
  title: string;
  description: string;
};

export default function TemplatesPage() {
  const { getToken } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const token = await getToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/templates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorText = await res.text();
          setError(`Error ${res.status}: ${errorText}`);
          return;
        }
        const data = await res.json();
        setTemplates(data.templates || []);
      } catch (err: any) {
        console.error("Error fetching templates:", err);
        setError("Error fetching templates");
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, [getToken]);

  if (loading) return <p>Loading templates...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Compliance Templates</h1>
      {templates.length === 0 ? (
        <p>No templates found.</p>
      ) : (
        <ul>
          {templates.map(template => (
            <li key={template.id}>
              <h2>{template.title}</h2>
              <p>{template.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
