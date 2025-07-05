"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data } from "@/lib/data";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryChart() {
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
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-muted-foreground">
                {item.name} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
