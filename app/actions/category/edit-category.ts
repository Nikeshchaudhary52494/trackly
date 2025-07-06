"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";
import { categorySchema, CreateCategoryInput } from "@/lib/validationSchemas";

export async function editCategory(id: string, input: CreateCategoryInput) {
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid category input");
  }

  const user = await getOrCreateTestUser();

  const existingCategory = await db.category.findUnique({
    where: { id },
  });

  if (!existingCategory || existingCategory.userId !== user.id) {
    throw new Error("Category not found or permission denied");
  }

  const updatedCategory = await db.category.update({
    where: { id },
    data: parsed.data,
  });

  return updatedCategory;
}
