"use client";
import NotFound from "@/app/not-found";
import OnboardingChat from "@/components/custom/onboarding/chat/chat";
import { useMyProfileStore } from "@prexo/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Onboarding() {
  const { myProfile } = useMyProfileStore();
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
      // If the user is already onboarded, redirect to the dashboard or another appropriate page
      router.replace("/dashboard");
    }
  }, [myProfile, router]);

  if (!myProfile || myProfile.id !== uID) {
    return NotFound();
  }
  return <OnboardingChat chatId={uID} />;
}
