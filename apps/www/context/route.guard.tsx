"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./auth.context";

interface RouteGuardProps {
  children: React.ReactNode;
  publicRoutes?: string[];
  privateRoutes?: string[];
}

// Default public and private routes if not provided
const DEFAULT_PUBLIC_ROUTES = ["/auth", "/"];
const DEFAULT_PRIVATE_ROUTES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/onboarding",
];

export function RouteGuard({
  children,
  publicRoutes = DEFAULT_PUBLIC_ROUTES,
  privateRoutes = DEFAULT_PRIVATE_ROUTES,
}: RouteGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isRouteMatch = (routes: string[], path: string) => {
    return routes.some(
      (route) =>
        route === path ||
        (route.endsWith("/*") && path.startsWith(route.replace("/*", "")))
    );
  };

  useEffect(() => {
    if (loading) return;

    const isPublic = isRouteMatch(publicRoutes, pathname);
    const isPrivate = isRouteMatch(privateRoutes, pathname);

    if (isPrivate && !user) {
      router.replace("/auth");
    } else if (isPublic && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, pathname, router, publicRoutes, privateRoutes]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black" />
    );
  }

  const isPublic = isRouteMatch(publicRoutes, pathname);
  const isPrivate = isRouteMatch(privateRoutes, pathname);

  if ((isPrivate && !user) || (isPublic && user)) {
    return null;
  }

  return <>{children}</>;
}
