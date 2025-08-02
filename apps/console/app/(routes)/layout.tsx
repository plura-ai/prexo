import Infobar from "@/components/custom/infobar";
import { AppSidebar } from "@/components/custom/sidebar";
import { SidebarProvider, SIDEBAR_COOKIE_NAME } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

async function RouteLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="py-2 px-6 w-full">
        <Infobar />
        {children}
      </div>
    </SidebarProvider>
  );
}
export default RouteLayout;
