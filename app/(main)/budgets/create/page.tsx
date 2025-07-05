import CreateBudget from "@/components/budgets/create-budget";
import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";

export default async function Page() {
  const user = await getOrCreateTestUser();
  const categories = await db.category.findMany({
    where: {
      userId: user.id,
    },
  });
  return <CreateBudget categories={categories} />;
}
