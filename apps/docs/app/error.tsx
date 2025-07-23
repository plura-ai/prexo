"use client";

import { Button } from "@/components/ui/button";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-4">{error.message}</p>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
