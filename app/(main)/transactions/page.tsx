import TransactionTable from "@/components/transaction/transactions-table";
import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";

export default async function Page() {
  const user = await getOrCreateTestUser();
  const transaction = await db.expense.findMany({
    where: {
      userId: user.id,
    },
    include: {
      category: true,
    },
  });
  const categories = await db.category.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <TransactionTable
      categoriesList={categories}
      transactionsData={transaction}
    />
  );
}
