"use client";

import { Card } from "@/components/ui/card";
import { IndianRupee, PieChart, Clock, TrendingUp } from "lucide-react";
import TransactionList from "@/components/TransactionList";
import TransactionForm from "@/components/TransactionForm";
import { ExpenseChart } from "@/components/ExpenseChart";
import { CategoryChart } from "@/components/CategoryChart";
import { useState } from "react";
import { Transaction, Category } from "@/lib/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([
      ...transactions,
      { ...transaction, id: Date.now().toString() },
    ]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
  };

  const totalExpenses = transactions.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-card border-r p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          Finance Dashboard
        </h1>

        <div className="space-y-6">
          <div className="stat-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <IndianRupee className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </h3>
                <p className="text-2xl font-bold text-foreground">
                ₹{totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <PieChart className="h-6 w-6 text-green-600 dark:text-green-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Categories
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  {Object.keys(Category).length}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Recent Activity
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  {transactions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Monthly Budget
                </h3>
                <p className="text-2xl font-bold text-foreground">₹3,000.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-80 p-8">
  <div className="max-w-6xl mx-auto space-y-12">
    
    {/* Charts & Transactions Section */}
    <div className="flex flex-col xl:flex-row gap-8">
      
      {/* Left Column (Monthly Expenses, Add Transaction, Recent Transactions) */}
      <div className="flex flex-col w-full xl:w-auto">
        
        {/* Monthly Expenses */}
        <div className="chart-container min-h-[400px]">
          <h2 className="text-xl font-semibold mb-6">Monthly Expenses</h2>
          <div className="h-[300px]">
            <ExpenseChart transactions={transactions} />
          </div>
        </div>

        {/* Transactions Section */}
        <div className="flex flex-col space-y-8 my-8">
          {/* Add Transaction */}
          <div className="form-card min-h-[350px]">
            <h2 className="text-xl font-semibold mb-6">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} />
          </div>

          {/* Recent Transactions */}
          <div className="form-card min-h-[350px]">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              onEdit={editTransaction}
            />
          </div>
        </div>
      </div>

      {/* Right Column (Category Breakdown) */}
      <div className="chart-container min-h-[400px] w-full xl:w-auto">
        <h2 className="text-xl font-semibold mb-6">Category Breakdown</h2>
        <CategoryChart transactions={transactions} />
      </div>

    </div>
  </div>
</div>

    </div>
  );
}
