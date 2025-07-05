"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type CategoryData = {
  category: string;
  planned: number;
  actual: number;
};

const COLORS = [
  "#34d399",
  "#fbbf24",
  "#60a5fa",
  "#f472b6",
  "#f87171",
  "#a78bfa",
];

export default function CategoryAnalysis({ data }: { data: CategoryData[] }) {
  const total = data.reduce((acc, item) => acc + item.actual, 0);
  const mostExpensive = data.reduce(
    (prev, curr) => (curr.actual > prev.actual ? curr : prev),
    data[0]
  );

  const overBudget = data.filter((item) => item.actual > item.planned);
  const onBudget = data.filter((item) => item.actual === item.planned);

  return (
    <Card className="max-w-5xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Category Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="actual"
              nameKey="category"
              outerRadius={100}
              fill="#8884d8"
              label={({ category }) => category}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <CategoryInsights
          mostExpensive={mostExpensive}
          overBudget={overBudget}
          onBudget={onBudget}
        />
      </CardContent>
    </Card>
  );
}

import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CategoryInsights({
  mostExpensive,
  overBudget,
  onBudget,
}: {
  mostExpensive: CategoryData;
  overBudget: CategoryData[];
  onBudget: CategoryData[];
}) {
  return (
    <div className="mt-6 space-y-3 text-sm">
      {/* Most Expensive */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <TrendingUp className="w-4 h-4 text-purple-600" />
        <span>
          <strong>Most Expensive:</strong> {mostExpensive.category} ($
          {mostExpensive.actual.toFixed(2)})
        </span>
      </div>

      {/* Over Budget */}
      <div className="flex items-start gap-2 text-red-600">
        <AlertTriangle className="w-4 h-4 mt-0.5" />
        <span>
          <strong>Over Budget:</strong>{" "}
          {overBudget.length > 0 ? (
            <span className="flex flex-wrap gap-1 mt-1">
              {overBudget.map((c) => (
                <Badge key={c.category} className="bg-red-100 text-red-800">
                  {c.category}
                </Badge>
              ))}
            </span>
          ) : (
            "None"
          )}
        </span>
      </div>

      {/* On Budget */}
      <div className="flex items-start gap-2 text-green-600">
        <CheckCircle className="w-4 h-4 mt-0.5" />
        <span>
          <strong>On Budget:</strong>{" "}
          {onBudget.length > 0 ? (
            <span className="flex flex-wrap gap-1 mt-1">
              {onBudget.map((c) => (
                <Badge key={c.category} className="bg-green-100 text-green-800">
                  {c.category}
                </Badge>
              ))}
            </span>
          ) : (
            "None"
          )}
        </span>
      </div>
    </div>
  );
}
