"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, { ...transaction, id: Date.now() }];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const deleteTransaction = (id) => {
    const filtered = transactions.filter(t => t.id !== id);
    setTransactions(filtered);
    localStorage.setItem('transactions', JSON.stringify(filtered));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}