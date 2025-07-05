import CategoryAnalysis from "@/components/reports/category-analysis";
import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";

export default async function ReportPage() {
  const user = await getOrCreateTestUser();

  const budgets = await db.budget.findMany({
    where: { userId: user.id },
    include: { category: true },
  });

  const expenses = await db.expense.findMany({
    where: { userId: user.id },
    include: { category: true },
  });

  // Create maps to group planned and actual by category name
  const plannedMap: Record<string, number> = {};
  for (const b of budgets) {
    const name = b.category.name;
    plannedMap[name] = (plannedMap[name] || 0) + b.amount;
  }

  const actualMap: Record<string, number> = {};
  for (const e of expenses) {
    const name = e.category.name;
    actualMap[name] = (actualMap[name] || 0) + e.amount;
  }

  // Combine both maps to build final data
  const allCategories = new Set([
    ...Object.keys(plannedMap),
    ...Object.keys(actualMap),
  ]);

  const reportData = Array.from(allCategories).map((catName) => ({
    category: catName,
    planned: plannedMap[catName] || 0,
    actual: actualMap[catName] || 0,
  }));

  return <CategoryAnalysis data={reportData} />;
}
