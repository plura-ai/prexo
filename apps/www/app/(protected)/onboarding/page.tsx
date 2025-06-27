"use client";
import NotFound from '@/app/not-found';
import { useMyProfileStore } from '@prexo/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Onboarding() {
  const { myProfile } = useMyProfileStore();
  const router = useRouter();

  useEffect(() => {
    if (myProfile && myProfile?.role !== 'onboarded' && myProfile?.role === 'user') {
      router.replace(`/onboarding/${myProfile.id}`);
    } else {
      // If the user is already onboarded, redirect to the dashboard or another appropriate page
      router.replace('/dashboard');
    }
  }, [myProfile, router]);

  if (!myProfile) {
    return NotFound();
  }

  return null;
}
