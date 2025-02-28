"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export default function OnboardingFlow() {
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }
      const data = await res.json();
      setTasks(data.tasks || []);
      setLoading(false);
    } catch (err: unknown) {
      console.error("Error fetching tasks:", err);
      setError(err instanceof Error ? err.message : "Error fetching tasks");
      setLoading(false);
    }
  }, [getToken]);

  const initializeTasks = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/init`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }
      await fetchTasks();
    } catch (err: unknown) {
      console.error("Error initializing tasks:", err);
      setError(err instanceof Error ? err.message : "Error initializing tasks");
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId: string, currentStatus: boolean) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !currentStatus } : task
      )
    );
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !currentStatus }),
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to update task: ${res.status}`);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      fetchTasks();
    }
  };

  const finishOnboarding = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/finish`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Error finishing onboarding: ${res.status}: ${await res.text()}`);
      }
      // Optionally, navigate to the main dashboard or show a success message.
      alert("Onboarding complete! You now have full access.");
    } catch (err: unknown) {
      console.error("Error finishing onboarding:", err);
      setError(err instanceof Error ? err.message : "Error finishing onboarding");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) return <p>Loading onboarding tasks...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (tasks.length === 0)
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">Guided Compliance Onboarding</h1>
        <p>No onboarding tasks available.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={initializeTasks}
        >
          Initialize Default Tasks
        </button>
      </div>
    );

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Guided Compliance Onboarding</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id, task.completed)}
            />
            <span
              className={`ml-2 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.description}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={finishOnboarding}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Finish Onboarding
        </button>
      </div>
    </div>
  );
}
