"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorKey, COLORS } from "@/lib/data";
import { Expense } from "@/lib/types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface CategoryChartProps {
  data: Expense[];
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const totalsMap = new Map<
    string,
    { name: string; value: number; color: string }
  >();

  data.forEach((expense) => {
    const category = expense.category;
    if (!totalsMap.has(category.id)) {
      totalsMap.set(category.id, {
        name: category.name,
        value: expense.amount,
        color: category.color,
      });
    } else {
      totalsMap.get(category.id)!.value += expense.amount;
    }
  });

  const chartData = Array.from(totalsMap.values());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.color as ColorKey]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 w-full">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                //@ts-ignore
                style={{ backgroundColor: COLORS[item.color] }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name} (${item.value.toFixed(2)})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
