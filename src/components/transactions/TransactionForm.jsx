import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/schemas";

export default function TransactionForm({ onSubmit, initialData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData || {
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Amount</label>
        <input 
          type="number" 
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>

      <div>
        <label>Date</label>
        <input 
          type="date" 
          {...register('date', { valueAsDate: true })}
        />
      </div>

      <div>
        <label>Category</label>
        <select {...register('category')}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialData ? 'Update' : 'Add'} Transaction
      </button>
    </form>
  );
}