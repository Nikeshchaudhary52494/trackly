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

type BudgetData = {
  category: string;
  planned: number;
  actual: number;
};

type MonthlySummaryProps = {
  data: BudgetData[];
};

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

import { CheckCircle, AlertTriangle, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BudgetStatusList({ data }: { data: BudgetData[] }) {
  return (
    <div className="grid gap-3 mt-6">
      {data.map((item) => {
        const diff = item.actual - item.planned;

        let status = "On Budget";
        let icon = <CheckCircle className="text-green-600 w-4 h-4" />;
        let badgeVariant: "default" | "destructive" | "outline" = "default";
        let badgeColor = "bg-green-100 text-green-800";

        if (diff > 0) {
          status = "Over Budget";
          icon = <AlertTriangle className="text-red-600 w-4 h-4" />;
          badgeVariant = "destructive";
          badgeColor = "bg-red-100 text-red-800";
        } else if (diff < 0) {
          status = "Under Budget";
          icon = <Circle className="text-yellow-500 w-4 h-4" />;
          badgeVariant = "outline";
          badgeColor = "bg-yellow-100 text-yellow-800";
        }

        return (
          <Card key={item.category} className="border px-4 py-3">
            <CardContent className="p-0 flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-sm">
                {icon}
                <span>{item.category}</span>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                <div>
                  Planned:{" "}
                  <span className="font-medium">
                    ${item.planned.toFixed(2)}
                  </span>
                </div>
                <div>
                  Actual:{" "}
                  <span className="font-medium">${item.actual.toFixed(2)}</span>
                </div>
              </div>
              <Badge className={`ml-4 ${badgeColor}`}>{status}</Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
