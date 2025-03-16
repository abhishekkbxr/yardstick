import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactions } from "@/context/TransactionContext";
import { format, parseISO } from 'date-fns';

export default function MonthlyChart() {
  const { transactions } = useTransactions();

  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = format(parseISO(transaction.date), 'MMM yyyy');
    if (!acc[month]) acc[month] = 0;
    acc[month] += transaction.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}