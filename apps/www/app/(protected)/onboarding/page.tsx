"use client";
import { useMyProfileStore } from "@prexo/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding() {
  const { myProfile } = useMyProfileStore();
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect')

  useEffect(() => {
    if (!myProfile) {
      router.replace("/auth");
      return;
    }
    if (myProfile.role !== "onboarded" && myProfile.role === "user") {
      router.replace(`/onboarding/${myProfile.id}`);
    } else {
      if (redirectUrl && redirectUrl.startsWith('/')) {
        router.push(redirectUrl)
      } else {
        router.push('/dashboard')
      }
    }
  }, [myProfile, router, redirectUrl]);

  return null;
}
