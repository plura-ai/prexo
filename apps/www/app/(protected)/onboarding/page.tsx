"use client";
import { useAuth } from '@/context/auth.context';
import { redirect } from 'next/navigation';
import React from 'react'

export default function Onboarding() {
  const { user } = useAuth();
  if (user) {
    redirect('/dashboard');
  }
  return (
    <div>
      IDK BRO
    </div>
  )
}
