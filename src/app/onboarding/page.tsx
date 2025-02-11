// app/onboarding/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Task = {
  id: string;
  description: string;
  completed: boolean;
};

export default function OnboardingPage() {
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = await getToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/tasks`, {
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
        setTasks(data.tasks || []);
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        setError("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [getToken]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Onboarding Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.description} - {task.completed ? "Completed" : "Pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
