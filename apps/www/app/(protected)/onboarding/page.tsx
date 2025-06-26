"use client";
import NotFound from '@/app/not-found';
import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Onboarding() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("User exists, redirecting to onboarding page");
      router.replace(`/onboarding/${user.id}`);
    }
  }, [user, router]);

  if (!user) {
    return NotFound();
  }

  return null;
}
