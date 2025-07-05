import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be at least $0.01"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Please select a category"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: z.string().min(1, "Color is required"),
});

export const budgetSchema = z.object({
  category: z.string().min(1, "Select a category"),
  amount: z.coerce.number().min(0.01, "Amount must be at least $0.01"),
});

export type CreateExpenseInput = z.infer<typeof expenseSchema>;
export type CreateCategoryInput = z.infer<typeof categorySchema>;
export type CreateBudgetInput = z.infer<typeof budgetSchema>;
