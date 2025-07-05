"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryFormValues, colorClassMap } from "@/lib/types";
import Link from "next/link";

type Props = {
  initialCategories: CategoryFormValues[];
};

export default function CategoryList({ initialCategories }: Props) {
  const [categories, setCategories] =
    useState<CategoryFormValues[]>(initialCategories);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<CategoryFormValues>({
    name: "",
    color: "",
  });

  const handleEditChange = (field: keyof CategoryFormValues, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditForm(categories[index]);
  };

  const handleUpdate = () => {
    if (editIndex !== null) {
      const updated = [...categories];
      updated[editIndex] = editForm;
      setCategories(updated);
      setEditIndex(null);
      setEditForm({ name: "", color: "" });
    }
  };

  const handleDelete = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditForm({ name: "", color: "" });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Categories</h2>
        <Link
          href="/categories/add"
          data-tab="add-transaction"
          className="tab-link"
        >
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            + Add Category
          </Button>
        </Link>
      </div>
      <Card className="max-w-2xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No categories added yet.
            </p>
          ) : (
            categories.map((cat, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-md px-3 py-2 mb-2"
              >
                {editIndex === index ? (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                    <Input
                      value={editForm.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      placeholder="Category Name"
                    />
                    <Select
                      value={editForm.color}
                      onValueChange={(val) => handleEditChange("color", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indigo">Indigo</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="yellow">Yellow</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        colorClassMap[cat.color] || "bg-gray-500"
                      }`}
                    />
                    <span>{cat.name}</span>
                  </div>
                )}
                <div className="flex gap-2 ml-auto">
                  {editIndex === index ? (
                    <Button size="sm" onClick={handleUpdate}>
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
