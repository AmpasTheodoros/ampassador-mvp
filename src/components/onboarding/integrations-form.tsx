"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function IntegrationsForm() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error("No token received");

      // Save integrations selection (dummy example)
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/integrations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          integrations: ['google_workspace', 'aws'],
        }),
      });

      // Update onboarding status for integrations
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/onboarding-status`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          step: 'integrations',
          completed: true,
        }),
      });

      // Redirect to dashboard after completing onboarding
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving integrations:', error);
      setError('Failed to save integrations.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p>Select the integrations you would like to connect. (Dummy example)</p>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Finishing Setup...' : 'Complete Setup & Go to Dashboard'}
      </Button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
