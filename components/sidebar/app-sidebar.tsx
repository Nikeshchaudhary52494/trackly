"use client";

import * as React from "react";
import {
  Home,
  Wallet,
  Settings,
  BarChart2,
  CreditCard,
  Tag,
  PieChart,
} from "lucide-react";

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

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: CreditCard,
      items: [
        {
          title: "All Transactions",
          url: "/transactions",
        },
        {
          title: "Add Transaction",
          url: "/transactions/add",
        },
        {
          title: "Edit Transaction",
          url: "/transactions/edit",
        },
      ],
    },
    {
      title: "Budgets",
      url: "/budgets",
      icon: Wallet,
      items: [
        {
          title: "View Budgets",
          url: "/budgets",
        },
        {
          title: "Create Budget",
          url: "/budgets/create",
        },
        {
          title: "Edit Budget",
          url: "/budgets/edit",
        },
      ],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: Tag,
      items: [
        {
          title: "Manage Categories",
          url: "/categories/manage",
        },
        {
          title: "Add Category",
          url: "/categories/add",
        },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart2,
      items: [
        {
          title: "Monthly Summary",
          url: "/reports/monthly",
        },
        {
          title: "Category Analysis",
          url: "/reports/categories",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
