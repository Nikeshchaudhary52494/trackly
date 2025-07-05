import CategoryAnalysis from "@/components/reports/category-analysis";
import { reportData } from "@/lib/data";

export default function ReportPage() {
  return <CategoryAnalysis data={reportData} />;
}
