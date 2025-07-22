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
const DEFAULT_PRIVATE_ROUTES = ["/dashboard", "/profile", "/settings", "/onboarding"];

export function RouteGuard({
  children,
  publicRoutes = DEFAULT_PUBLIC_ROUTES,
  privateRoutes = DEFAULT_PRIVATE_ROUTES,
}: RouteGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Helper to check if current path matches any route in the array (exact or prefix)
  const isRouteMatch = (routes: string[], path: string) => {
    return routes.some(route =>
      route === path || (route.endsWith("/*") && path.startsWith(route.replace("/*", "")))
    );
  };

  useEffect(() => {
    if (loading) return;

    const isPublic = isRouteMatch(publicRoutes, pathname);
    const isPrivate = isRouteMatch(privateRoutes, pathname);

    // If on a private route and not authenticated, redirect to /auth
    if (isPrivate && !user) {
      router.replace("/auth");
    }
    // If on a public route and authenticated, redirect to a default private page (e.g., /dashboard)
    else if (isPublic && user) {
      router.replace("/dashboard");
    }
    // Otherwise, do nothing and allow rendering
  }, [user, loading, pathname, router, publicRoutes, privateRoutes]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        {/* <span>Loading...</span> */}
      </div>
    );
  }

  // If on a private route, only render children if user exists
  // If on a public route, always render children
  const isPublic = isRouteMatch(publicRoutes, pathname);
  const isPrivate = isRouteMatch(privateRoutes, pathname);

  if (isPrivate && !user) {
    // Prevent flicker after redirect
    return null;
  }
  if (isPublic && user) {
    // Prevent flicker after redirect
    return null;
  }

  return <>{children}</>;
}
