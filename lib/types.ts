export enum Category {
  FOOD = "Food & Dining",
  TRANSPORTATION = "Transportation",
  HOUSING = "Housing",
  UTILITIES = "Utilities",
  ENTERTAINMENT = "Entertainment",
  HEALTHCARE = "Healthcare",
  SHOPPING = "Shopping",
  OTHER = "Other"
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: Category;
}

export interface Budget {
  category: Category;
  amount: number;
}

export interface CategorySummary {
  category: Category;
  spent: number;
  budget: number;
  percentage: number;
}