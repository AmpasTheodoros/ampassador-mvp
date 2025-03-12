"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth, useUser, SignOutButton } from "@clerk/nextjs";
import { useOnboardingGuard } from "@/hooks/useOnboardingGuard";

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface CompliancePlan {
  id: string;
  industry: string;
  tasks: Task[];
}

interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  date: string;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DASHBOARD_DATA_KEY = "dashboard_data";
const DASHBOARD_TIMESTAMP_KEY = "dashboard_timestamp";

export default function Dashboard() {
  // Always call the hook at the top level.
  const isOnboarding = useOnboardingGuard();

  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [plan, setPlan] = useState<CompliancePlan | null>(null);
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dataLoaded = useRef(false);

  const fetchData = async (url: string) => {
    try {
      const token = await getToken();
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      if (response.status === 429) {
        console.warn(`Rate limit hit for ${url}`);
        return null;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error(`Error fetching ${url}:`, err);
      return null;
    }
  };

  useEffect(() => {
    // Only load data once the user is loaded and not in onboarding
    if (!isLoaded || !user || dataLoaded.current || isOnboarding) {
      setLoading(false);
      return;
    }

    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Attempt to load cached dashboard data.
        const cachedTimestamp = localStorage.getItem(DASHBOARD_TIMESTAMP_KEY);
        const now = Date.now();
        if (cachedTimestamp && now - parseInt(cachedTimestamp) < CACHE_DURATION) {
          const cachedData = localStorage.getItem(DASHBOARD_DATA_KEY);
          if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            setTasks(parsedData.tasks || []);
            setPlan(parsedData.plan || null);
            setAlerts(parsedData.alerts || []);
            dataLoaded.current = true;
            setLoading(false);
            return;
          }
        }

        // Fetch new data sequentially (with delays if needed)
        const tasksResult = await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/onboarding/tasks`
        );
        if (tasksResult) {
          setTasks(tasksResult.tasks || []);
        }

        // (Optional: add a delay if necessary)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const planResult = await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/compliance-plans`
        );
        if (planResult) {
          setPlan(planResult.compliancePlans?.[0] || null);
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const alertsResult = await fetchData(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/alerts`
        );
        if (alertsResult) {
          setAlerts(alertsResult.alerts || []);
        }

        // Cache the fetched dashboard data
        const dataToCache = {
          tasks: tasksResult?.tasks || [],
          plan: planResult?.compliancePlans?.[0] || null,
          alerts: alertsResult?.alerts || [],
        };
        localStorage.setItem(DASHBOARD_DATA_KEY, JSON.stringify(dataToCache));
        localStorage.setItem(DASHBOARD_TIMESTAMP_KEY, now.toString());

        dataLoaded.current = true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [isLoaded, user, getToken, isOnboarding]);

  // Moved the conditional rendering here, after all hooks have been called
  if (isOnboarding) {
    return <p>Checking onboarding status…</p>;
  }

  if (loading) return <p>Loading dashboard…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SignOutButton />
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">
          Welcome, {user?.fullName || user?.primaryEmailAddress?.emailAddress || "User"}
        </h2>
        <p>Your compliance journey for AI startups starts here.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Onboarding Progress</h2>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center">
                <input type="checkbox" checked={task.completed} readOnly className="mr-2" />
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
        <h2 className="text-xl font-semibold mb-2">Compliance Alerts</h2>
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