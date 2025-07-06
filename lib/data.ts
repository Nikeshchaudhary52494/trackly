import {
  Home,
  Wallet,
  Settings,
  BarChart2,
  CreditCard,
  Tag,
} from "lucide-react";

export type ColorKey = "indigo" | "red" | "purple" | "yellow" | "green";

export const COLORS: Record<ColorKey, string> = {
  indigo: "#6366f1",
  red: "#ef4444",
  purple: "#a855f7",
  yellow: "#eab308",
  green: "#22c55e",
};

export const COLORS2 = [
  "#34d399",
  "#fbbf24",
  "#60a5fa",
  "#f472b6",
  "#f87171",
  "#a78bfa",
];

export const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800",
  Utilities: "bg-blue-100 text-blue-800",
  Transport: "bg-yellow-100 text-yellow-800",
  Shopping: "bg-purple-100 text-purple-800",
  Other: "bg-gray-100 text-gray-800",
};

export const COLOR_CLASSES: Record<string, string> = {
  blue: "border-blue-500",
  green: "border-green-500",
  red: "border-red-500",
  purple: "border-purple-500",
  yellow: "border-yellow-500",
  indigo: "border-indigo-500",
};

export const navOptions = {
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
