"use client";

import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/context/auth.context";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const {user} = useAuth();
  if(user) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
