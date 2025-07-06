"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";

export async function deleteTransaction(id: string) {
  const { id: userId } = await getOrCreateTestUser();

  const existing = await db.expense.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Expense not found or unauthorized");
  }

  await db.expense.delete({
    where: { id },
  });

  return { success: true, message: "Expense deleted successfully" };
}
