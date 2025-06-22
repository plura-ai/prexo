import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/custom/dashboard/header";
// import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties}
        >
            <AppSidebar variant="inset" collapsible="icon" />
            <SidebarInset>
                {/* <SiteHeader /> */}
                <DashboardHeader/>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
