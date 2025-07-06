import {
  Home,
  Wallet,
  Settings,
  BarChart2,
  CreditCard,
  Tag,
} from "lucide-react";

export const COLORS: Record<string, string> = {
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

export const CATEGORY_TAG_COLORS: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border border-blue-300",
  green: "bg-green-100 text-green-800 border border-green-300",
  red: "bg-red-100 text-red-800 border border-red-300",
  purple: "bg-purple-100 text-purple-800 border border-purple-300",
  yellow: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  indigo: "bg-indigo-100 text-indigo-800 border border-indigo-300",
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
