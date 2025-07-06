"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditTransactionForm from "./edit-transactions";

interface EditTransactionDialogProps {
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

export default function EditTransactionDialog({
  transactionsData,
  categoriesList,
}: EditTransactionDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-indigo-500">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <EditTransactionForm
          categoriesList={categoriesList}
          transactionsData={transactionsData}
          onSuccess={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
