"use client";
import { useEffect, useState } from "react";
import { useAuth, useUser, SignOutButton } from "@clerk/nextjs";
import { syncUser } from "../../lib/syncUser";

export default function Dashboard() {
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      syncUser(getToken)
        .then((data) => setUserData(data))
        .catch((err) => console.error("Sync failed:", err));
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.emailAddresses[0]?.emailAddress}!</p>
      {userData && <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(userData, null, 2)}</pre>}
      <SignOutButton />
    </div>
  );
}
