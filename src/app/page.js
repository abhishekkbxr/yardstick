import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SummaryCards from "@/components/dashboard/SummaryCards";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import RecentTransactions from "@/components/transactions/TransactionTable";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      <SummaryCards />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <CategoryChart />
          </CardContent>
        </Card>
      </div>

      <RecentTransactions />
    </div>
  )
}