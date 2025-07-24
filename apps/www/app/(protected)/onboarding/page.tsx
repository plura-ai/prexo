"use client";
import { useMyProfileStore } from "@prexo/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding() {
  const { myProfile } = useMyProfileStore();
  const router = useRouter();

  useEffect(() => {
    if (!myProfile) {
      router.replace("/auth");
      return;
    }
    if (myProfile.role !== "onboarded" && myProfile.role === "user") {
      router.replace(`/onboarding/${myProfile.id}`);
    } else {
      // If the user is already onboarded, redirect to the dashboard or another appropriate page
      router.replace("/dashboard");
    }
  }, [myProfile, router]);

  return null;
}
