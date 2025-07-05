"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface BudgetManagementProps {
  budgetsData: {
    id: string;
    amount: number;
    spent: number;
    category: {
      name: string;
      id: string;
      color: string;
    };
  }[];
}

export default function BudgetManagement({
  budgetsData,
}: BudgetManagementProps) {
  return (
    <div id="budgets" className="tab-content space-y-8">
      <h2 className="text-xl font-semibold">Budget Management</h2>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Budgets</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budget Amount</TableHead>
                <TableHead>Amount Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {budgetsData.map((b, index) => {
                const remaining = b.amount - b.spent;
                const isOver = b.spent > b.amount;

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {b.category.name}
                    </TableCell>
                    <TableCell>${b.amount.toFixed(2)}</TableCell>
                    <TableCell>${b.spent.toFixed(2)}</TableCell>
                    <TableCell
                      className={
                        isOver
                          ? "text-red-600 font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      ${remaining.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Link
                        href="#edit-budget"
                        data-tab="edit-budget"
                        className="tab-link text-indigo-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
