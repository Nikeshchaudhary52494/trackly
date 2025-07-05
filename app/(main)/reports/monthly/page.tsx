import MonthlySummary from "@/components/reports/monthly-summary";
import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";

export default async function ReportPage() {
  const user = await getOrCreateTestUser();

  // Get budgets (planned) and group by category
  const budgets = await db.budget.findMany({
    where: { userId: user.id },
    include: {
      category: true,
    },
  });

  // Get expenses and group by category
  const expenses = await db.expense.findMany({
    where: { userId: user.id },
    include: {
      category: true,
    },
  });

  // Build a map of actual spending per category
  const expenseMap: Record<string, number> = {};
  for (const expense of expenses) {
    const catName = expense.category.name;
    expenseMap[catName] = (expenseMap[catName] || 0) + expense.amount;
  }

  // Build the data for the chart using budgets
  const categorySet = new Set([
    ...budgets.map((b) => b.category.name),
    ...expenses.map((e) => e.category.name),
  ]);

  const budgetData = Array.from(categorySet).map((catName) => {
    const planned =
      budgets.find((b) => b.category.name === catName)?.amount || 0;
    const actual = expenseMap[catName] || 0;
    return {
      category: catName,
      planned,
      actual,
    };
  });

  return <MonthlySummary data={budgetData} />;
}
