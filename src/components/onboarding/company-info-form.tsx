// src/components/onboarding/company-info-form.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CompanyInfoForm() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [aiProductType, setAiProductType] = useState('');
  const [complianceFrameworks, setComplianceFrameworks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error("No token received");

      // Save company info using the singular "user" route
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/company-info`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          companyName,
          aiProductType,
          complianceFrameworks,
        }),
      });

      // Update onboarding status for company-info
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/onboarding-status`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          step: 'company-info',
          completed: true,
        }),
      });

      // Redirect to integrations step
      router.push('/onboarding/integrations');
    } catch (error) {
      console.error('Error saving company info:', error);
      setError('Failed to save company info.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company-name">Company Name</Label>
        <Input
          id="company-name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ai-product-type">Type of AI Product</Label>
        <Input
          id="ai-product-type"
          value={aiProductType}
          onChange={(e) => setAiProductType(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="compliance-frameworks">
          Main Compliance Frameworks Needed
        </Label>
        <Input
          id="compliance-frameworks"
          placeholder="e.g., GDPR, HIPAA, AI Act"
          value={complianceFrameworks}
          onChange={(e) => setComplianceFrameworks(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Continue to Integrations'}
      </Button>
    </form>
  );
}