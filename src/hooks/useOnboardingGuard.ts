// hooks/useOnboardingGuard.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export function useOnboardingGuard() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // If the user exists but has not completed onboarding (for example, companyName is missing or onboardingCompleted is false)
    if (user && (!user.publicMetadata?.onboardingCompleted || !user.publicMetadata?.companyName)) {
      // Redirect to the company info page
      router.push("/onboarding/company-info");
    }
  }, [user, router]);
}
