"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import type { UseChatHelpers } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";

interface SuggestedActionsProps {
  append: UseChatHelpers["append"];
}

function PureSuggestedActions({ append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "Start onboarding",
      label: "Guide me through the onboarding process",
      action:
        "I would like to start the onboarding process. Can you guide me through the steps?",
    },
    {
      title: "Hii, Prexo Ai. Lets start onboarding",
      label: "Initiate the onboarding process",
      action: "Hii, Prexo Ai. Lets start onboarding",
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5 }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className="block"
        >
          <Button
            variant="ghost"
            onClick={async () => {
              append({
                role: "user",
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 flex flex-col w-full h-auto justify-start items-start cursor-pointer
              sm:flex-col
              "
            style={{
              minHeight: "64px",
              wordBreak: "break-word",
            }}
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

// Only re-render if the append prop changes (reference equality)
export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => prevProps.append === nextProps.append,
);
