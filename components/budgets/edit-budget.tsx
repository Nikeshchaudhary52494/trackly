"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SetStateAction } from "react";
import { editBudget } from "@/app/actions/budget/edit-budget";
import { EditBudgetInput, editBudgetSchema } from "@/lib/validationSchemas";
import { BudgetData } from "@/lib/types";

interface EditBudgetFormProps {
  onSuccess: (value: SetStateAction<boolean>) => void;
  budgetData: BudgetData;
}

export default function EditBudgetForm({
  onSuccess,
  budgetData,
}: EditBudgetFormProps) {
  const router = useRouter();

  const form = useForm<EditBudgetInput>({
    resolver: zodResolver(editBudgetSchema),
    defaultValues: {
      amount: budgetData.amount,
    },
  });

  const onSubmit = async (data: EditBudgetInput) => {
    console.log("Updated Budget:", {
      category: "Food & Dining",
      ...data,
    });
    await editBudget(budgetData.id, data);
    onSuccess(false);
    router.push("budgets");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Read-only Category */}
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Input
            value={budgetData.category.name}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </FormItem>

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

        <div className="flex justify-end gap-2 pt-4">
          <Link href="/budgets">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
