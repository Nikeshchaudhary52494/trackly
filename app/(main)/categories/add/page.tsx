"use client";

import AddCategoryForm from "@/components/category/add-category";
import { CategoryFormValues } from "@/lib/types";
import { useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState<CategoryFormValues[]>([]);

  const handleAdd = (newCat: CategoryFormValues) => {
    setCategories((prev) => [...prev, newCat]);
  };
  return <AddCategoryForm onAdd={handleAdd} />;
}
