"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { CreateExpenseInput, expenseSchema } from "@/lib/validationSchemas";

export async function createExpense(formData: CreateExpenseInput) {
  const parsed = expenseSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Invalid expense data");
  }

  const { id: userId } = await getOrCreateTestUser();

  const expense = await db.expense.create({
    data: {
      ...parsed.data,
      userId,
    },
  });

  return expense;
}
