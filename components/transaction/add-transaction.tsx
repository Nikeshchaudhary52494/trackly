"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be at least $0.01"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Please select a category"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddTransactionForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      date: "",
      description: "",
      category: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Transaction submitted:", data);
    // You can POST this to your backend here
    router.push("#transactions");
  }

  return (
    <div id="add-transaction" className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="flex justify-between items-center border-b p-4">
          <CardTitle className="text-xl">Add New Transaction</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
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
                          {...field}
                          type="number"
                          step="0.01"
                          min="0"
                          className="pl-7"
                          placeholder="0.00"
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food">Food & Dining</SelectItem>
                          <SelectItem value="transport">
                            Transportation
                          </SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="entertainment">
                            Entertainment
                          </SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                <Button type="submit">Add Transaction</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
