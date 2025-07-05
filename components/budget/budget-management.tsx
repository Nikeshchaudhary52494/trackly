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
import { budgets } from "@/lib/data";
import Link from "next/link";

export default function BudgetManagement() {
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
              {budgets.map((b, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{b.category}</TableCell>
                  <TableCell>${b.budget.toFixed(2)}</TableCell>
                  <TableCell>${b.spent.toFixed(2)}</TableCell>
                  <TableCell
                    className={
                      b.spent > b.budget
                        ? "text-red-600 font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    ${(b.budget - b.spent).toFixed(2)}
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
