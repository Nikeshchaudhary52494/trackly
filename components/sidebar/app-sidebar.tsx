"use client";

import * as React from "react";
import { PieChart } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { navOptions } from "@/lib/data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <div className="bg-indigo-600 hover:bg-indigo-700 text-sidebar-primary-foreground flex size-8 aspect-square items-center justify-center rounded-lg">
            <PieChart className="size-4" />
          </div>
          <span className="truncate font-medium">Trackly</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navOptions.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navOptions.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
