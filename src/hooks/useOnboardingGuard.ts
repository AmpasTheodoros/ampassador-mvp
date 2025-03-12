import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const ONBOARDING_COMPLETED_KEY = "onboarding_completed";
const ONBOARDING_FETCH_TIMESTAMP_KEY = "onboarding_fetch_timestamp";
const MIN_FETCH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function useOnboardingGuard() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;

    const checkOnboardingStatus = async () => {
      const savedStatus = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
      if (savedStatus === "true") {
        setIsChecking(false);
        hasChecked.current = true;
        return;
      }

      const lastFetch = parseInt(
        localStorage.getItem(ONBOARDING_FETCH_TIMESTAMP_KEY) || "0",
        10
      );
      const now = Date.now();
      if (now - lastFetch < MIN_FETCH_INTERVAL) {
        setIsChecking(false);
        hasChecked.current = true;
        return;
      }

      try {
        const token = await getToken({ template: "JWT_Token" });
        if (!token) {
          setIsChecking(false);
          hasChecked.current = true;
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/onboarding-status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.setItem(ONBOARDING_FETCH_TIMESTAMP_KEY, now.toString());

        if (response.status === 429) {
          console.warn("Rate limit hit for onboarding status");
          setIsChecking(false);
          hasChecked.current = true;
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch onboarding status");
        }

        const data = await response.json();
        if (data.hasCompanyInfo) {
          localStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
        } else {
          if (window.location.pathname !== "/onboarding/company-info") {
            router.replace("/onboarding/company-info");
          }
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        hasChecked.current = true;
        setIsChecking(false);
      }
    };

    checkOnboardingStatus();
  }, [router, getToken]);

  return isChecking;
}
