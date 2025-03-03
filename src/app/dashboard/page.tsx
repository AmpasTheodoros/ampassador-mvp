"use client";

import { useEffect, useState, useCallback  } from "react";
import { useAuth, useUser, SignOutButton } from "@clerk/nextjs";
import { syncUser } from "@/lib/syncUser"; // Adjust path as necessary
import { useOnboardingGuard } from "@/hooks/useOnboardingGuard";

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

interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function Dashboard() {
  useOnboardingGuard(); // This will redirect if onboarding is incomplete

  const { getToken } = useAuth();
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plan, setPlan] = useState<CompliancePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState<boolean>(true);
  const [alertError, setAlertError] = useState<string | null>(null);

  useEffect(() => {
    async function runSync() {
      const result = await syncUser(getToken);
      console.log("Sync result:", result);
    }
    runSync();
  }, [getToken]);

  const fetchTasks = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/tasks`, {
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

  const fetchAlerts = useCallback(async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alerts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch (err: unknown) {
      console.error("Error fetching alerts:", err);
      setAlertError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingAlerts(false);
    }
  }, [getToken]);

    // Optionally, poll for alerts every 5 minutes.
    useEffect(() => {
      fetchAlerts();
      const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }, [fetchAlerts]);

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
      
      {/* Alerts Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Compliance Alerts</h2>
        {loadingAlerts && <p>Loading alerts...</p>}
        {alertError && <p className="text-red-600">{alertError}</p>}
        {alerts.length === 0 ? (
          <p>No new alerts at this time.</p>
        ) : (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li key={alert.id} className="border p-4 rounded shadow">
                <h3 className="font-bold">{alert.title}</h3>
                <p>{alert.description}</p>
                <small>{new Date(alert.date).toLocaleString()}</small>
              </li>
            ))}
          </ul>
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
      
    </div>
  );
}
