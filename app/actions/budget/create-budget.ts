"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { budgetSchema, CreateBudgetInput } from "@/lib/validationSchemas";

export async function createBudget(input: CreateBudgetInput) {
  const parsed = budgetSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const user = await getOrCreateTestUser();

  try {
    const budget = await db.budget.create({
      data: {
        amount: parsed.data.amount,
        categoryId: parsed.data.category,
        userId: user.id,
      },
    });

    return { success: true, budget };
  } catch (err) {
    console.error("Failed to create budget:", err);
    return { error: "Something went wrong while creating the budget." };
  }
}
