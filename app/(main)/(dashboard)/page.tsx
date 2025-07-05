import CategoryChart from "@/components/dashboard/category-chart";
import MonthlyExpensesChart from "@/components/dashboard/monthly-expense-chart";
import RecentTransations from "@/components/dashboard/recent-transations";
import SummaryCard from "@/components/dashboard/summary-card";
import { summaryCards } from "@/lib/data";

export default function Page() {
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
        <MonthlyExpensesChart />
        <CategoryChart />
      </div>
      <RecentTransations />
    </div>
  );
}
