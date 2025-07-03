"use client"

import { TriangleAlert } from "lucide-react"

export default function AiBanner() {
  return (
    <div className="bg-muted px-4 py-2 rounded-lg border border-border mt-2 mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p className="flex text-sm flex-row">
          <TriangleAlert className="size-5"/>
          <span className="text-muted-foreground mx-1"/>
          This agent is currently operating on a free model, so response times may vary.
        </p>
      </div>
    </div>
  )
}
