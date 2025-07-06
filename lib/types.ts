export type CategoryFormValues = {
  name: string;
  color: string;
};

export const colorClassMap: Record<string, string> = {
  indigo: "bg-indigo-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
};

export type BudgetData = {
  id: string;
  amount: number;
  spent: number;
  category: {
    name: string;
    id: string;
    color: string;
  };
};

export type Category = {
  color: string;
  name: string;
  id: string;
};

export type Expense = {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: Category;
};
