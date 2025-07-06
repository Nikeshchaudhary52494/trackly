"use server";

import { db } from "@/lib/db";
import { getOrCreateTestUser } from "@/lib/getTestUser";

export async function deleteCategory(id: string) {
  const user = await getOrCreateTestUser();

  const existingCategory = await db.category.findUnique({
    where: { id },
  });

  if (!existingCategory || existingCategory.userId !== user.id) {
    throw new Error("Category not found or permission denied");
  }

  await db.category.delete({
    where: { id },
  });

  return { success: true, message: "Category deleted successfully" };
}
