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
import EditBudgetForm from "./edit-budget";

interface EditBudgetDialogProps {
  budgetData: {
    id: string;
    amount: number;
    spent: number;
    category: {
      name: string;
      id: string;
      color: string;
    };
  };
}

export default function EditBudgetDialog({
  budgetData,
}: EditBudgetDialogProps) {
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
        <EditBudgetForm budgetData={budgetData} onSuccess={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
