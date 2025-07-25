import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CookiesConsent() {
  return (
    // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
    <div className="fixed bottom-4 right-4 z-[9999] bg-background max-w-[400px] rounded-md border p-4 shadow-lg">
      <div className="flex gap-2">
        <div className="flex grow flex-col gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">We Value Your Privacy 🍪</p>
            <p className="text-muted-foreground text-sm">
              We use cookies to improve your experience, and show personalized
              content.
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Accept</Button>
            <Button size="sm" variant="outline">
              Decline
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          aria-label="Close notification"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}
