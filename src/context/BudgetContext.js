import { createContext, useContext, useState, useEffect } from 'react';
import { categories } from '@/lib/schemas';

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useState(() => {
    const defaultBudgets = Object.fromEntries(
      categories.map(cat => [cat, 0])
    );
    return defaultBudgets;
  });

  useEffect(() => {
    const saved = localStorage.getItem('budgets');
    if (saved) setBudgets(JSON.parse(saved));
  }, []);

  const updateBudget = (category, amount) => {
    const newBudgets = { ...budgets, [category]: amount };
    setBudgets(newBudgets);
    localStorage.setItem('budgets', JSON.stringify(newBudgets));
  };

  return (
    <BudgetContext.Provider value={{ budgets, updateBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}