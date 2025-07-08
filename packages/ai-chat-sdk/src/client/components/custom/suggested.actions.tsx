"use client";

import { memo } from "react";
import type { UseChatHelpers } from "@ai-sdk/react";
import { Button } from "../../components/ui/button";
import type { SuggestedActionsT } from "../../../../src/lib/types";
import { motion } from "framer-motion";

interface SuggestedActionsProps {
  append: UseChatHelpers["append"];
  suggestedActions: SuggestedActionsT[];
}

function PureSuggestedActions({ append, suggestedActions }: SuggestedActionsProps) {
  return (
    <div
      data-testid="suggested-actions"
      className="grid grid-cols-3 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.3 * index + 1 }}
          key={`suggested-action-${suggestedAction.label}-${index}`}
          className="block"
        >
          <Button
            variant="secondary"
            onClick={async () => {
              append({
                role: "user",
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-3 py-2 text-sm gap-1 flex flex-col w-auto h-auto justify-start items-start cursor-pointer ml-auto
              "
            style={{
              minHeight: "24px",
              wordBreak: "break-word",
            }}
          >
            <span className="suggested-action-label">{suggestedAction.label}</span>
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
