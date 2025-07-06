"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { EditBudgetInput, editBudgetSchema } from "@/lib/validationSchemas";

export async function editBudget(id: string, input: EditBudgetInput) {
  const parsed = editBudgetSchema.safeParse(input);
  console.log({
    id,
    input,
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const user = await getOrCreateTestUser();

  const existingBudget = await db.budget.findUnique({
    where: { id },
  });

  if (!existingBudget || existingBudget.userId !== user.id) {
    return { error: "Budget not found or unauthorized." };
  }

  try {
    const updatedBudget = await db.budget.update({
      where: { id },
      data: {
        amount: parsed.data.amount,
      },
    });

    return { success: true, budget: updatedBudget };
  } catch (err) {
    console.error("Failed to update budget:", err);
    return { error: "Something went wrong while updating the budget." };
  }
}
