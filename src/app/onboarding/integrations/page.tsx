"use client";

import OnboardingLayout from '@/components/onboarding/onboarding-layout';
import IntegrationsForm from '@/components/onboarding/integrations-form';

export default function IntegrationsPage() {
  return (
    <OnboardingLayout requiredStep="integrations">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Connect Integrations</h1>
        <IntegrationsForm />
      </div>
    </OnboardingLayout>
  );
}
