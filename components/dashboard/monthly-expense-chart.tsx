"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";

interface MonthlyExpensesChartProps {
  data: {
    id: string;
    date: string;
    amount: number;
    description: string;
  }[];
}

// Group and sum by month
function prepareMonthlyData(expenses: MonthlyExpensesChartProps["data"]) {
  const map = new Map<string, number>();

  expenses.forEach((expense) => {
    const month = format(parseISO(expense.date), "MMM yyyy"); // e.g. "Jul 2025"
    map.set(month, (map.get(month) || 0) + expense.amount);
  });

  // Sort by date and limit to last 6
  const sorted = Array.from(map.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .slice(-6)
    .map(([name, value]) => ({ name, value }));

  return sorted;
}

export default function MonthlyExpensesChart({
  data,
}: MonthlyExpensesChartProps) {
  const chartData = prepareMonthlyData(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Monthly Expenses (Last 6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
