"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function InfobarBreadCrumb() {
  const page = usePathname();

  return (
    <div className="flex flex-col w-full items-start justify-center mt-2 mb-4">
      <div className="flex gap-5 items-center">
        <h2 className="text-2xl md:text-4xl font-uxum font-bold capitalize">
          {page.replace(/^\/+/, "")}
        </h2>
        {/* {page === 'conversation' && chatRoom && (
              <Loader
                loading={loading}
                className="p-0 inline"
              >
                <Switch
                  defaultChecked={realtime}
                  onClick={(e) => onActivateRealtime(e)}
                  className="data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach"
                />
              </Loader>
            )} */}
      </div>
      <p className="text-muted-foreground text-sm md:text-lg font-sans pl-0">
        {page.includes("settings")
          ? "Manage your account settings, preferences and integrations"
          : page.includes("dashboard")
            ? "A detailed overview of your metrics, usage, customers and more"
            : page.includes("integrations")
              ? "View and edit all your integrations"
              : page.includes("mails")
                ? "View and edit all your integrations"
                : page.includes("workflows")
                  ? "View and edit all your integrations"
                  : page.includes("agents")
                    ? "Manage your agents and their settings"
                    : "Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to."}
      </p>
    </div>
  );
}