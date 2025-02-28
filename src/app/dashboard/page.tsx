"use client";

import { useEffect, useState, useCallback  } from "react";
import { useAuth, useUser, SignOutButton } from "@clerk/nextjs";

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface CompliancePlan {
  id: string;
  industry: string;
  tasks: Task[]; // adjust based on your data structure
}

export default function Dashboard() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plan, setPlan] = useState<CompliancePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err: unknown) {
      console.error("Error fetching tasks:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [getToken]);

  const fetchCompliancePlan = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compliance-plans`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
      const data = await res.json();
      setPlan(data.compliancePlans && data.compliancePlans[0] ? data.compliancePlans[0] : null);
    } catch (err: unknown) {
      console.error("Error fetching compliance plan:", err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [getToken]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchCompliancePlan()]);
      setLoading(false);
    }
    loadData();
  }, [fetchTasks, fetchCompliancePlan]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SignOutButton />
      </header>

      <section className="mb-8">
      <h2 className="text-2xl font-semibold">Welcome, {user?.fullName || user?.primaryEmailAddress?.emailAddress || "User"}</h2>        
      <p>Your compliance journey for AI startups starts here.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Onboarding Progress</h2>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-500" : ""}>
                  {task.description}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No onboarding tasks found. Please complete your onboarding steps.</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Compliance Plan</h2>
        {plan ? (
          <div className="bg-gray-100 p-4 rounded">
            <p>Industry: {plan.industry}</p>
            <pre>{JSON.stringify(plan.tasks, null, 2)}</pre>
          </div>
        ) : (
          <p>No compliance plan created yet.</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Available Templates &amp; Reports</h2>
        <div className="flex space-x-4">
          <a className="px-4 py-2 bg-blue-600 text-white rounded" href="/templates">
            View Templates
          </a>
          <a className="px-4 py-2 bg-blue-600 text-white rounded" href="/reports">
            Generate Report
          </a>
        </div>
      </section>

      {/* Additional sections like compliance alerts could be added here in the future */}
    </div>
  );
}
