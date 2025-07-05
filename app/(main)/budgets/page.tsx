import { getBudgetsWithSpent } from "@/app/actions/get-budgets-with-spent";
import BudgetManagement from "@/components/budgets/budget-management";

export default async function Page() {
  const budgets = await getBudgetsWithSpent();

  return <BudgetManagement budgetsData={budgets} />;
}
