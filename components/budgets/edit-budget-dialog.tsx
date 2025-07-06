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
import { BudgetData } from "@/lib/types";

interface EditBudgetDialogProps {
  budgetData: BudgetData;
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
