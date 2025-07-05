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

type Transaction = {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
};

const transactions: Transaction[] = [
  {
    id: 1,
    date: "Jun 15, 2023",
    description: "Grocery Store",
    category: "Food",
    amount: 125.5,
  },
  {
    id: 2,
    date: "Jun 14, 2023",
    description: "Electric Bill",
    category: "Utilities",
    amount: 85.2,
  },
  {
    id: 3,
    date: "Jun 12, 2023",
    description: "Restaurant",
    category: "Food",
    amount: 45.75,
  },
  {
    id: 4,
    date: "Jun 10, 2023",
    description: "Gas Station",
    category: "Transport",
    amount: 35.4,
  },
];

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800",
  Utilities: "bg-blue-100 text-blue-800",
  Transport: "bg-yellow-100 text-yellow-800",
  Shopping: "bg-purple-100 text-purple-800",
  Other: "bg-gray-100 text-gray-800",
};

export default function TransactionTable() {
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
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-muted-foreground">
                    {tx.date}
                  </TableCell>
                  <TableCell className="font-medium">
                    {tx.description}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        categoryColors[tx.category] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tx.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    ${tx.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Link
                      href="#edit-transaction"
                      data-tab="edit-transaction"
                      className="tab-link text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
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
