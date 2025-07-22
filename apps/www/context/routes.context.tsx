"use client";
import { useEffect } from "react";
import { useAuth } from "./auth.context";
import { usePathname, useRouter } from "next/navigation";

export const RoutesContext = ({
  children,
  protectedRoutes,
  publicRoutes,
}: {
  children: React.ReactNode;
  protectedRoutes: string[];
  publicRoutes: string[];
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!loading) {
      const handleRedirect = async () => {
        if (user && publicRoutes.includes(path)) {
          router.replace("/dashboard");
        } else if (!user && protectedRoutes.includes(path)) {
          router.replace("/");
        }
      };

      handleRedirect();
    }
  }, [user, loading, path, publicRoutes, protectedRoutes, router]);

  // Show the loading screen if loading and on a protected route
  if (loading && protectedRoutes.includes(path)) {
    return null;
  }

  // Show the redirecting screen while the redirect is in progress
  if (
    (!loading && user && publicRoutes.includes(path)) ||
    (!loading && !user && protectedRoutes.includes(path))
  ) {
    return null;
  }

  return children;
};