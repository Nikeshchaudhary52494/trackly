import MonthlySummary from "@/components/reports/monthly-summary";
import { reportData } from "@/lib/data";

export default function ReportPage() {
  return <MonthlySummary data={reportData} />;
}
