import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Breadcrumb } from "@/components/custom/breadcrumb";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        enabled: true,
      }}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
