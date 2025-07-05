"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be at least $0.01"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditBudgetForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 600.0,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Updated Budget:", {
      category: "Food & Dining",
      ...data,
    });
    router.push("#budgets");
  };

  return (
    <div id="edit-budget" className="tab-content max-w-2xl mx-auto">
      <Card>
        <CardHeader className="flex justify-between items-center border-b p-4">
          <CardTitle className="text-xl">Edit Budget</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Read-only Category */}
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Input
                  value="Food & Dining"
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
        </CardContent>
      </Card>
    </div>
  );
}
