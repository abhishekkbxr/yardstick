import { z } from "zod";

export const categories = [
  "Food",
  "Housing",
  "Transport",
  "Utilities",
  "Entertainment",
];

export const transactionSchema = z.object({
  id: z.string().optional(),
  amount: z.number().positive(),
  date: z.date(),
  description: z.string().min(2),
  category: z.enum(categories),
});