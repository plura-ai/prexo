"use client";

import { LoginForm } from "@/components/custom/login-form";
import { useMyProfileStore } from "@prexo/store";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { myProfile } = useMyProfileStore();
  if (myProfile) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
