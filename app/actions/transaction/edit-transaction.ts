"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { CreateExpenseInput, expenseSchema } from "@/lib/validationSchemas";

export async function editTransaction(id: string, input: CreateExpenseInput) {
  const parsed = expenseSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid expense data");
  }

  const { id: userId } = await getOrCreateTestUser();

  const existing = await db.expense.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Expense not found or unauthorized");
  }

  const updated = await db.expense.update({
    where: { id },
    data: {
      ...parsed.data,
    },
  });

  return updated;
}
