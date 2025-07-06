import { CheckCircle, AlertTriangle, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "../ui/card";

type BudgetData = {
  category: string;
  planned: number;
  actual: number;
};

export function BudgetStatusList({ data }: { data: BudgetData[] }) {
  return (
    <div className="grid gap-3 mt-6">
      {data.map((item) => {
        const diff = item.actual - item.planned;

        let status = "On Budget";
        let icon = <CheckCircle className="text-green-600 w-4 h-4" />;
        let badgeColor = "bg-green-100 text-green-800";

        if (diff > 0) {
          status = "Over Budget";
          icon = <AlertTriangle className="text-red-600 w-4 h-4" />;
          badgeColor = "bg-red-100 text-red-800";
        } else if (diff < 0) {
          status = "Under Budget";
          icon = <Circle className="text-yellow-500 w-4 h-4" />;
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
