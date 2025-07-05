import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";

export async function getBudgetsWithSpent() {
  const user = await getOrCreateTestUser();

  // Get all budgets for the user along with their category
  const budgets = await db.budget.findMany({
    where: { userId: user.id },
    include: {
      category: true,
    },
  });

  // Get all expenses for the user
  const expenses = await db.expense.findMany({
    where: { userId: user.id },
  });

  // Group expenses by categoryId to calculate total spent per category
  const spentMap: Record<string, number> = {};
  for (const expense of expenses) {
    spentMap[expense.categoryId] =
      (spentMap[expense.categoryId] || 0) + expense.amount;
  }

  // Attach spent to each budget
  const budgetsWithSpent = budgets.map((budget) => ({
    ...budget,
    spent: spentMap[budget.categoryId] || 0,
  }));

  return budgetsWithSpent;
}
