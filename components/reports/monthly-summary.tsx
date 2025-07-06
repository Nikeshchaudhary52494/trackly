"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BudgetStatusList } from "../budgets/budget-status-list";

type BudgetData = {
  category: string;
  planned: number;
  actual: number;
};

interface MonthlySummaryProps {
  data: BudgetData[];
}

export default function MonthlySummary({ data }: MonthlySummaryProps) {
  return (
    <Card className="max-w-5xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Monthly Budget vs Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="planned" fill="#6366f1" name="Planned Budget">
              <LabelList dataKey="planned" position="top" />
            </Bar>
            <Bar dataKey="actual" fill="#f43f5e" name="Actual Spending">
              <LabelList dataKey="actual" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <BudgetStatusList data={data} />
      </CardContent>
    </Card>
  );
}
