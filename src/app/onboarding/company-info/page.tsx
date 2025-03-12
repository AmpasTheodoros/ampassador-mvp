// src/app/onboarding/company-info/page.tsx

"use client";

import OnboardingLayout from '@/components/onboarding/onboarding-layout';
import CompanyInfoForm from '@/components/onboarding/company-info-form';

export default function CompanyInfoPage() {
  return (
    <OnboardingLayout requiredStep="company-info">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Company Information</h1>
        <CompanyInfoForm />
      </div>
    </OnboardingLayout>
  );
}
