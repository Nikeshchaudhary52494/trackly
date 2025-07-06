"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreateExpenseInput, expenseSchema } from "@/lib/validationSchemas";
import { SetStateAction } from "react";
import { editTransaction } from "@/app/actions/transaction/edit-transaction";

interface EditTransactionFormProps {
  onSuccess: (value: SetStateAction<boolean>) => void;
  transactionsData: {
    id: string;
    amount: number;
    date: string;
    description: string;
    categoryId: string;
    category: {
      name: string;
      id: string;
      color: string;
    };
  };
  categoriesList: {
    name: string;
    id: string;
  }[];
}

export default function EditTransactionForm({
  onSuccess,
  transactionsData,
  categoriesList,
}: EditTransactionFormProps) {
  const router = useRouter();

  const form = useForm<CreateExpenseInput>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: transactionsData.amount,
      date: transactionsData.date,
      description: transactionsData.description,
      categoryId: transactionsData.category.id,
    },
  });

  const onSubmit = async (data: CreateExpenseInput) => {
    console.log("Updated Transaction:", data);
    await editTransaction(transactionsData.id, data);
    onSuccess(false);
    router.push("transactions");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    className="pl-7"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="What was this for?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesList.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Link href="/transactions">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
