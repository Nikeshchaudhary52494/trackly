import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { format } from "date-fns";

export default async function RecentTransactions() {
  const user = await getOrCreateTestUser();

  const recentTransactions = await db.expense.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: { date: "desc" },
    take: 5,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Recent Transactions
        </CardTitle>
        <Link
          href="/transactions"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </CardHeader>

      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.length > 0 ? (
              recentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{format(new Date(txn.date), "PP")}</TableCell>
                  <TableCell>{txn.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-${txn.category.color}-700 border-${txn.category.color}-300`}
                    >
                      {txn.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${txn.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
