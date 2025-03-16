"use client";

import { Transaction, Category, Budget, CategorySummary } from "@/lib/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CategoryChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const MONTHLY_BUDGETS: Budget[] = [
  { category: Category.FOOD, amount: 500 },
  { category: Category.TRANSPORTATION, amount: 200 },
  { category: Category.HOUSING, amount: 1200 },
  { category: Category.UTILITIES, amount: 300 },
  { category: Category.ENTERTAINMENT, amount: 200 },
  { category: Category.HEALTHCARE, amount: 300 },
  { category: Category.SHOPPING, amount: 200 },
  { category: Category.OTHER, amount: 100 },
];

export function CategoryChart({ transactions }: CategoryChartProps) {
  const getCategorySummaries = (): CategorySummary[] => {
    const summaries = MONTHLY_BUDGETS.map(budget => {
      const spent = transactions
        .filter(t => t.amount < 0 && t.category === budget.category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      return {
        category: budget.category,
        spent,
        budget: budget.amount,
        percentage: (spent / budget.amount) * 100
      };
    });

    return summaries.sort((a, b) => b.spent - a.spent);
  };

  const categorySummaries = getCategorySummaries();
  const chartData = categorySummaries.map(summary => ({
    name: summary.category,
    value: summary.spent,
  }));

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label value="Total Expenses" position="center" />
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Spent"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Budget vs. Actual</h3>
        {categorySummaries.map((summary, index) => (
          <div key={summary.category} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{summary.category}</span>
              <span className="text-muted-foreground">
                ${summary.spent.toFixed(2)} / ${summary.budget.toFixed(2)}
              </span>
            </div>
            <Progress
              value={summary.percentage}
              className="h-2"
              indicatorClassName={`bg-[${COLORS[index % COLORS.length]}]`}
            />
            {summary.percentage > 90 && (
              <p className="text-xs text-red-500">
                Warning: Near or exceeding budget
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Spending Insights</h3>
        <div className="grid gap-4">
          {categorySummaries
            .filter(summary => summary.percentage > 80)
            .map(summary => (
              <Card key={summary.category} className="p-4 bg-red-50 dark:bg-red-900/10">
                <p className="text-sm">
                  ⚠️ High spending in {summary.category}: {summary.percentage.toFixed(1)}% of budget used
                </p>
              </Card>
            ))}
          {categorySummaries
            .filter(summary => summary.percentage < 20)
            .map(summary => (
              <Card key={summary.category} className="p-4 bg-green-50 dark:bg-green-900/10">
                <p className="text-sm">
                  ✅ Good budget management in {summary.category}: Only {summary.percentage.toFixed(1)}% used
                </p>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}