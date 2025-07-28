"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

// import data from "./data.json";
import { useMyProfileStore } from "@prexo/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { myProfile } = useMyProfileStore();
  const router = useRouter();

  useEffect(() => {
    if (!myProfile) return;
    if (myProfile.role !== "onboarded") {
      router.replace(`/onboarding/${myProfile.id}`);
    }
  }, [myProfile, router]);

  if (typeof window !== "undefined" && !myProfile) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
}
