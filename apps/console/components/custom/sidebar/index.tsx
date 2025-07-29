"use client";
import {
  Layers2,
  Settings,
  BrainCircuit,
  FlaskConical,
  BookMarked,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { NavUser } from "./nav.user";
import Logo from "../logo";
import QuickActionButton from "./quick.actions";
import Link from "next/link";
import { useAuth } from "@/context/auth.context";
import { NavSecondary } from "./nav.secondary";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Layers2,
  },
];

const navSecondary = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Documentation",
    url: "https://docs.prexoai.xyz",
    icon: BookMarked,
  },
];
// Playground items.
const IntelItems = [
  {
    title: "Memory",
    url: "/memory",
    icon: BrainCircuit,
  },
  {
    title: "Playground",
    url: "/playground",
    icon: FlaskConical,
  },
];

export function AppSidebar() {
  const path = usePathname();
  const { state } = useSidebar();
  const { user, loading } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo isCollapsed={state === "collapsed"} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={path.includes(item.url)}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {IntelItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={path.includes(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <QuickActionButton collapse={state} />
        {user && !loading && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
