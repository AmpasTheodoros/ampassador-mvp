// src/components/onboarding/onboarding-layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";

interface OnboardingStatus {
  hasCompanyInfo: boolean;
  isComplete: boolean;
}

interface OnboardingLayoutProps {
  children: React.ReactNode;
  requiredStep: "company-info" | "integrations";
}

export default function OnboardingLayout({
  children,
  requiredStep,
}: OnboardingLayoutProps) {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  // Always call hooks at the top level (unconditionally)
const [, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the async function (do not call hooks inside a condition)
    const fetchOnboardingStatus = async () => {
      // If user is not available, we finish loading
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const token = await getToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/onboarding-status`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch onboarding status");
        }
        const data = await res.json();
        setStatus(data);
        // Handle redirection based on the fetched status:
        // For example, if the required step is integrations but the user hasn't provided company info:
        if (requiredStep === "integrations" && !data.hasCompanyInfo) {
          router.push("/onboarding/company-info");
        } else if (data.isComplete) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function only after Clerk has loaded the user info.
    if (isLoaded) {
      fetchOnboardingStatus();
    }
  }, [user, isLoaded, router, requiredStep, getToken]);

  if (loading) return <div>Loading...</div>;

  // Render children regardless of status;
  // the page-specific logic should also check the status if needed.
  return <>{children}</>;
}
