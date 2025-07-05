"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthData } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MonthlyExpensesChart() {
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
            <BarChart data={monthData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value}`} />
              <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
