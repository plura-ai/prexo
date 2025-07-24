"use client";
import NotFound from "@/app/not-found";
import OnboardingChat from "@/components/custom/onboarding/chat/chat";
import { useMyProfileStore } from "@prexo/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Onboarding() {
  const { myProfile } = useMyProfileStore();
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect')
  const pathname = usePathname();
  const uID = pathname?.split("/onboarding/")[1] || null;
  const router = useRouter();

  useEffect(() => {
    if (
      myProfile &&
      myProfile?.role !== "onboarded" &&
      myProfile?.role === "user"
    ) {
      router.replace(`/onboarding/${myProfile.id}`);
    } else {
      if (redirectUrl && redirectUrl.startsWith('/')) {
        router.push(redirectUrl)
      } else {
        router.push('/dashboard')
      }
    }
  }, [myProfile, router, redirectUrl]);

  if (!myProfile || myProfile.id !== uID) {
    return NotFound();
  }
  return <OnboardingChat chatId={uID} />;
}
