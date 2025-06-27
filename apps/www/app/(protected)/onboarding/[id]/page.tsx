"use client";
import NotFound from '@/app/not-found';
import OnboardingChat from '@/components/custom/onboarding/chat/chat'
import { useMyProfileStore } from '@prexo/store';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Onboarding() {
  const { myProfile } = useMyProfileStore();
  const pathname = usePathname();
  const uID = pathname?.split('/onboarding/')[1] || null;
  
  if (!myProfile || myProfile.id !== uID) {
    return NotFound();
  }
  return (
    <OnboardingChat />
  )
}
