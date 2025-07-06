"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import EditTransactionDialog from "./Edit-transaction-dialog";
import { deleteTransaction } from "@/app/actions/transaction/delete-transaction";
import clsx from "clsx";
import { CATEGORY_TAG_COLORS } from "@/lib/data";

interface TransactionTableProps {
  transactionsData: {
    id: string;
    amount: number;
    date: string;
    description: string;
    categoryId: string;
    category: {
      name: string;
      id: string;
      color: string;
    };
  }[];
  categoriesList: {
    name: string;
    id: string;
  }[];
}

export default function TransactionTable({
  transactionsData,
  categoriesList,
}: TransactionTableProps) {
  const handleDelete = async (TransactionId: string) => {
    await deleteTransaction(TransactionId);
  };

  return (
    <div id="transactions" className="tab-content">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transaction Management</h2>
        <Link
          href="/transactions/add"
          data-tab="add-transaction"
          className="tab-link"
        >
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            + Add Transaction
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Transactions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Date</TableHead>
                <TableHead className="text-left">Description</TableHead>
                <TableHead className="text-left">Category</TableHead>
                <TableHead className="text-left">Amount</TableHead>
                <TableHead className="text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionsData.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-muted-foreground">
                    {tx.date}
                  </TableCell>
                  <TableCell className="font-medium">
                    {tx.description}
                  </TableCell>
                  <TableCell>
                    <span
                      className={clsx(
                        "px-2 py-1 inline-flex text-xs font-semibold rounded-full",
                        CATEGORY_TAG_COLORS[tx.category.color] || "bg-gray-300"
                      )}
                    >
                      {tx.category.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    ${tx.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <EditTransactionDialog
                      categoriesList={categoriesList}
                      transactionsData={tx}
                    />
                    <Button
                      onClick={() => handleDelete(tx.id)}
                      variant="ghost"
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
