import CategoryChart from "@/components/dashboard/category-chart";
import MonthlyExpensesChart from "@/components/dashboard/monthly-expense-chart";
import RecentTransations from "@/components/dashboard/recent-transations";
import SummaryCard from "@/components/dashboard/summary-card";
import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { formatCurrency } from "@/lib/utils"; // helper for formatting numbers

export default async function Page() {
  const user = await getOrCreateTestUser();

  const [transactions, budgets] = await Promise.all([
    db.expense.findMany({
      where: { userId: user.id },
      include: { category: true },
    }),
    db.budget.findMany({
      where: { userId: user.id },
      include: { category: true },
    }),
  ]);

  // Total Expenses (this month)
  const thisMonth = new Date().getMonth();
  const totalExpenses = transactions
    .filter((tx) => new Date(tx.date).getMonth() === thisMonth)
    .reduce((acc, tx) => acc + tx.amount, 0);

  // Total Budget & Spent
  const totalBudget = budgets.reduce((acc, b) => acc + b.amount, 0);
  const totalSpent = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const budgetRemaining = totalBudget - totalSpent;
  const budgetUsedPercent =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Top Category
  const categoryTotals: Record<string, { name: string; total: number }> = {};
  for (const tx of transactions) {
    const catId = tx.categoryId;
    const catName = tx.category.name;
    categoryTotals[catId] = categoryTotals[catId] || {
      name: catName,
      total: 0,
    };
    categoryTotals[catId].total += tx.amount;
  }

  const topCategory = Object.values(categoryTotals).sort(
    (a, b) => b.total - a.total
  )[0];

  const summaryCards = [
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      note: "This month",
      color: "bg-blue-500",
    },
    {
      title: "Budget Status",
      value:
        budgetRemaining >= 0
          ? `${formatCurrency(budgetRemaining)} remaining`
          : `${formatCurrency(Math.abs(budgetRemaining))} over`,
      note: `${Math.round(budgetUsedPercent)}% of budget used`,
      color: budgetRemaining >= 0 ? "bg-green-500" : "bg-red-500",
    },
    {
      title: "Top Category",
      value: topCategory?.name || "N/A",
      note: topCategory ? `${formatCurrency(topCategory.total)} spent` : "",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-4 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            note={card.note}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MonthlyExpensesChart data={transactions} />
        <CategoryChart data={transactions} />
      </div>

      <RecentTransations />
    </div>
  );
}
