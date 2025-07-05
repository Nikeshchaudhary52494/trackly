import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Recent Transactions
        </CardTitle>
        <Link
          href="transactions"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jun 15, 2023</TableCell>
              <TableCell>Grocery Store</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-green-700 border-green-300"
                >
                  Food
                </Badge>
              </TableCell>
              <TableCell className="text-right">$125.50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jun 14, 2023</TableCell>
              <TableCell>Electric Bill</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-blue-700 border-blue-300"
                >
                  Utilities
                </Badge>
              </TableCell>
              <TableCell className="text-right">$85.20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jun 12, 2023</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-green-700 border-green-300"
                >
                  Food
                </Badge>
              </TableCell>
              <TableCell className="text-right">$45.75</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
